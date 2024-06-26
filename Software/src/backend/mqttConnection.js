const mqtt = require('mqtt');
const db = require('./connection');

const mqttOptions = {
    host: '192.168.2.25',
    port: 1884,
    username: 'tuan',
    password: 'tuan',
};

const mqttClient = mqtt.connect(mqttOptions);
mqttClient.setMaxListeners(50);

const sensor_data = 'sensor_data';
const fan_status = 'fan_status';
const led_status = 'led_status';

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    mqttClient.subscribe(sensor_data, (err) => {
        if (!err) {
            console.log('Subscribed to sensor_data topic');
        } else {
            console.error('Failed to subscribe to sensor_data topic: ', err);
        }
    });

    mqttClient.subscribe(fan_status, (err) => {
        if (!err) {
            console.log('Subscribed to fan_status topic');
        } else {
            console.error('Failed to subscribe to fan_status topic: ', err);
        }
    });

    mqttClient.subscribe(led_status, (err) => {
        if (!err) {
            console.log('Subscribed to led_status topic');
        } else {
            console.error('Failed to subscribe to led_status topic: ', err);
        }
    });

});

mqttClient.on('error', (err) => {
    console.error('MQTT error: ', err);
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'sensor_data') {
        const data = JSON.parse(message.toString());
        console.log('Received sensor data:');
        console.log('Brightness:', data.brightness);
        console.log('Temperature:', data.temperature);
        console.log('Humidity:', data.humidity);

        const { temperature, humidity, brightness } = data;

        if (!temperature || !humidity || !brightness || 
            temperature < 0 || temperature > 100 || 
            humidity < 0 || humidity > 100 || 
            brightness < 0 || brightness > 4095) {
            return;
        }

        const sqlInsert = 'INSERT INTO datasensors (temperature, humidity, brightness, createdAt) VALUES (?, ?, ?, NOW())';
        const valuesInsert = [temperature, humidity, brightness];
    
        db.query(sqlInsert, valuesInsert, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error executing insert query:', insertErr);
            }
            console.log('New record added to the database');
        });
    }
});

module.exports = mqttClient;