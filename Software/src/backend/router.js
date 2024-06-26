const express = require('express');
const router = express.Router();
const mqttClient = require('./mqttConnection');
const db = require('./connection');

router.get('/api/getLatestData', (req, res) => {
    let sql = 'SELECT * FROM datasensors ORDER BY id DESC LIMIT 1';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing select query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                console.log('Latest data retrieved:', result[0]);
                res.json(result[0]);
            } else {
                console.log('No data found in datasensors table');
                res.status(404).send('Not Found');
            }
        }
    });
});

router.get('/api/getAllData', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || 'id';
    const sortDirection = req.query.sortDirection || 'asc';
    const selectedField = req.query.field || 'all';
    const searchField = req.query.value || '';
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;

    let ok = false;

    let sql = ``;
    let countSql = `SELECT COUNT(*) AS totalCount FROM datasensors`;

    if (selectedField === 'all') {
        sql = `SELECT * FROM datasensors`;
    } else if (selectedField === 'createdAt' || selectedField === 'id') {
        sql = `SELECT id, createdAt FROM datasensors`;
    } else {
        sql = `SELECT id, ${selectedField}, createdAt FROM datasensors`;
    }

    if (!searchField) {
        sql += ` ORDER BY ${sortBy} ${sortDirection} LIMIT ${pageSize} OFFSET ${startIndex}`;
        ok = true;
    } else {
        if (selectedField === 'all') {
            sql += ` WHERE temperature LIKE '%${searchField}%' OR humidity LIKE '%${searchField}%' OR brightness LIKE '%${searchField}%' OR createdAt LIKE '%${searchField}%'`;
            countSql += ` WHERE temperature LIKE '%${searchField}%' OR humidity LIKE '%${searchField}%' OR brightness LIKE '%${searchField}%' OR createdAt LIKE '%${searchField}%'`;
        } else {
            sql += ` WHERE ${selectedField} LIKE '%${searchField}%'`;
            countSql += ` WHERE ${selectedField} LIKE '%${searchField}%'`;
        }
    }

    if (!ok) sql += ` ORDER BY ${sortBy} ${sortDirection} LIMIT ${pageSize} OFFSET ${startIndex}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ err: 'Internal Server Error' });
        } else {
            db.query(countSql, (err, countResult) => {
                if (err) {
                    console.error('Error executing count query: ', err);
                    res.status(500).json({ err: 'Internal Server Error' });
                } else {
                    const totalCount = countResult[0].totalCount;
                    console.log(result);
                    res.status(200).json({ totalCount, data: result });
                }
            });
        }
    });
});

router.get('/api/getAllHistory', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || 'id';
    const sortDirection = req.query.sortDirection || 'asc';
    const selectedField = req.query.field || 'all';
    const searchField = req.query.value || '';
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;

    let ok = false;

    let sql = `SELECT * FROM history`;
    let countSql = `SELECT COUNT(*) AS totalCount FROM history`;

    if (!searchField) {
        sql += ` ORDER BY ${sortBy} ${sortDirection} LIMIT ${pageSize} OFFSET ${startIndex}`;
        ok = true;
    } else {
        if (selectedField === 'all') {
            sql += ` WHERE device_id LIKE '%${searchField}%' OR action LIKE '%${searchField}%' OR time LIKE '%${searchField}%'`;
            countSql += ` WHERE device_id LIKE '%${searchField}%' OR action LIKE '%${searchField}%' OR time LIKE '%${searchField}%'`;
        } else {
            sql += ` WHERE ${selectedField} LIKE '%${searchField}%'`;
            countSql += ` WHERE ${selectedField} LIKE '%${searchField}%'`;
        }
    }

    if (!ok) sql += ` ORDER BY ${sortBy} ${sortDirection} LIMIT ${pageSize} OFFSET ${startIndex}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ err: 'Internal Server Error' });
        } else {
            db.query(countSql, (err, countResult) => {
                if (err) {
                    console.error('Error executing count query: ', err);
                    res.status(500).json({ err: 'Internal Server Error' });
                } else {
                    const totalCount = countResult[0].totalCount;
                    console.log(result);
                    res.status(200).json({ totalCount, data: result });
                }
            });
        }
    });
});

router.post('/api/devices', async (req, res) => {
    const { device, action } = req.body;

    try {
        let isResponseSent = false;
        const topic = device === 'led' ? 'led' : 'fan';
        const action_id = action === true ? "1" : "0";

        mqttClient.publish(topic, action_id.toString(), (error) => {
            if (error) {
                console.error('Error while publishing MQTT message:', error);
                if (!isResponseSent) {
                    isResponseSent = true;
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });

        mqttClient.on('message', (receivedTopic, message) => {
            if ((receivedTopic === 'led_status' || receivedTopic === 'fan_status') && !isResponseSent) {
                const device_id = receivedTopic === 'led_status' ? 'led' : 'fan';
                const data = message.toString();
                const status = data === 'on' ? "1" : "0";

                try {
                    console.log('Device:', device_id);
                    console.log('Action:', data);

                    const sqlInsert = 'INSERT INTO history (device_id, action, time) VALUES (?, ?, NOW())';
                    const valuesInsert = [device_id, status];

                    db.query(sqlInsert, valuesInsert, (insertErr, insertResult) => {
                        if (insertErr) {
                            console.error('Error executing insert query:', insertErr);
                            if (!isResponseSent) {
                                isResponseSent = true;
                                return res.status(500).json({ error: 'Internal Server Error' });
                            }
                        }
                        console.log('New record added to the database');
                        isResponseSent = true;
                        res.status(201).json({ device_id: device_id, status: status });
                    });
                } catch (error) {
                    console.error('Error parsing MQTT message:', error);
                    if (!isResponseSent) {
                        isResponseSent = true;
                        return res.status(400).json({ error: 'Invalid format' });
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error while publishing MQTT message:', error);
        if (!isResponseSent) {
            isResponseSent = true;
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;