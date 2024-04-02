# API documentation: 
https://documenter.getpostman.com/view/27112600/2sA35Baj5U

# Introduction
The application is built using ReactJS for the frontend, Node.js with Express.js for the backend, MySQL Workbench 8.0 CE for the database, MQTT Broker for message communication, and Arduino IDE for hardware interaction.

To ensure that the application operates correctly:

- Make sure you have installed the MQTT broker.
- Ensure that both the software and hardware are successfully connected to the MQTT server (IP address, port, username, password).
- Ensure that both the software and hardware subscribe and publish to valid topics.
- You also need to install some libraries to be able to run, such as mysql2, mqtt, express, chartjs, axios... in order to start the application with the command 'npm i'

# Configure connection

  <p align="center">
    <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/86716b8d-d863-46b5-9ff8-350a26c6d14b" alt="Configuration">
</p>

# Configure Arduino

- Before you start, make sure to install some necessary libraries such as <WiFi.h>, <PubSubClient.h>, <Adafruit_Sensor.h>, <DHT.h>, <ArduinoJson.h> in Library Manager to run

  <p align="center">
    <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/c1bd86d8-7472-4562-b8a6-635255938538" alt="Configuration">
</p>

- You need to declare mqtt broker information like port, your username and password used to access to mqtt broker, your WiFi name, password and IP address

  <p align="center">
    <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/7f86d5c9-c91a-4ef0-b361-2b55aa039e9b" alt="Configuration">
</p>

  <p align="center">
    <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/56066f33-43ee-4e46-962b-5c6f01cc1f59" alt="Configuration">
</p>

**Note !!!: The topics you declare in Arduino and in server side must be the same. If one topic is published on one side, the other side will be subscribed and vice versa**

# To run the application:
- Navigate to the software directory and run the project using the command:
  
  ```
  npm start
  ```

- Start the server by running the server.js file:
  
  ```
  node server.js
  ```

- Start the MQTT Broker by executing the command:

  ```
  Windows + R --> cmd
  ```

- Navigate to the directory where Mosquitto is installed.
  
  ```
  cd C:\Program Files\mosquitto
  ```

- Run the following commands:
  
  ```
  "net start mosquitto" hoặc ".\mosquitto.exe -v -c mosquitto.conf"
  ```


A visual representation of a successful MQTT broker startup

<p align="center">
  <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/d78f932c-2733-4e7a-be9f-609b748c6104" alt="MQTT Broker Startup Image">
</p>

# When the application runs successfully, it will include the following interfaces

## DashBoard page:

<p align="center">
  <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/5da6784a-dcac-4b90-aeb6-9bd58e8920c4" alt="Application Image">
</p>

## Data Sensor page:

<p align="center">
  <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/b53fcdb2-cf40-410f-8974-a85bc4cf2ff8" alt="Data sensor Image">
</p>

## Action history page:

<p align="center">
  <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/7cb5e3d8-0212-4cb4-8feb-ea55dffb6b89" alt="Action history Image">
</p>

## Profile page:

<p align="center">
  <img src="https://github.com/vantuan0128/IoT-SmartHome/assets/121681379/2419dd80-24f8-4f9b-a201-858b71aaf17d" alt="Profile Image">
</p>





