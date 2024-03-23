const mqtt = require('mqtt');

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

module.exports = mqttClient;