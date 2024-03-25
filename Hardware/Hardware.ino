#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ArduinoJson.h>

#define LED1 4
#define LED2 5
#define DHTPIN 2
#define DHTTYPE DHT11 


const char *ssid = "HotBoyAnDo";
const char *password = "tuan4621"; 

const char *mqtt_broker = "192.168.2.25";
const char *topic1 = "led";
const char *topic2 = "fan"; 
const char *sensor = "sensor_data";
const char *led_status_topic = "led_status";
const char *fan_status_topic = "fan_status";
// const char *brightness_sensor = "light_data";
// const char *temperature_sensor = "temp_data";
// const char *humidity_sensor = "humid_data";
const char *mqtt_username = "tuan";
const char *mqtt_password = "tuan";
const int mqtt_port = 1884;

bool ledState = false;
bool fanState = false;

WiFiClient espClient;
PubSubClient client(espClient);

DHT dht(DHTPIN, DHTTYPE);
unsigned long lastSensorReadTime = 0;
const unsigned long sensorReadInterval = 5000;

void setup() {
    Serial.begin(9600);
    delay(1000);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to the WiFi network");

    pinMode(LED1, OUTPUT);
    digitalWrite(LED1, LOW);

    pinMode(LED2, OUTPUT);
    digitalWrite(LED2, LOW);

    pinMode(14, INPUT);

    dht.begin();

    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public EMQX MQTT broker connected");
        } else {
            Serial.print("Failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }

    client.subscribe(topic1);
    client.subscribe(topic2);
}

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message: ");
    String message;
    for (int i = 0; i < length; i++) {
        message += (char) payload[i];
    }
    Serial.print(message);

    if (strcmp(topic, topic1) == 0) {
        if (message == "1" && !ledState) {
            digitalWrite(LED1, HIGH); 
            ledState = true;
            client.publish(led_status_topic, "on");
        }
        if (message == "0" && ledState) {
            digitalWrite(LED1, LOW);
            ledState = false;
            client.publish(led_status_topic, "off");
        }
    }
    if (strcmp(topic, topic2) == 0) {
        if (message == "1" && !fanState) {
            digitalWrite(LED2, HIGH); 
            fanState = true;
            client.publish(fan_status_topic, "on");
        }
        if (message == "0" && fanState) {
            digitalWrite(LED2, LOW);
            fanState = false;
            client.publish(fan_status_topic, "off");
        }
    }
    Serial.println();
    Serial.println("-----------------------");
}

void loop() {
    client.loop();

    unsigned long currentMillis = millis();
    if(currentMillis - lastSensorReadTime >= sensorReadInterval) {
      readSensors();
      lastSensorReadTime = currentMillis;
    }
    delay(100);
}

void readSensors() {
  int brightness = analogRead(34);
  int temperature = dht.readTemperature();
  int humidity = dht.readHumidity();

  StaticJsonDocument<200> jsonDoc;
  
  char jsonString[200];
  // char tempString[50];
  // char humidString[50];
  // char lightString[50];

  jsonDoc["brightness"] =  brightness;
  jsonDoc["temperature"] = temperature;
  jsonDoc["humidity"] = humidity;
  serializeJson(jsonDoc, jsonString);
  client.publish(sensor, jsonString);

  // jsonDoc.clear();
  // jsonDoc["temperature"] = temperature;
  // serializeJson(jsonDoc, tempString);
  // client.publish(temperature_sensor, tempString);

  // jsonDoc.clear();
  // jsonDoc["humidity"] = humidity;
  // serializeJson(jsonDoc, humidString);
  // client.publish(humidity_sensor, humidString);

  // jsonDoc.clear();
  // jsonDoc["brightness"] = brightness;
  // serializeJson(jsonDoc, lightString);
  // client.publish(brightness_sensor, lightString);

  Serial.print("Brightness: ");
  Serial.print(brightness);
  Serial.print(" Temperature: ");
  Serial.print(temperature);
  Serial.print(" Humidity: ");
  Serial.print(humidity);
  Serial.print("\n");
}



