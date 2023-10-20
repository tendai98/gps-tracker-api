# GPS-Tracker-API Node.js Express

The GPS-Tracker-API is an API built on Express.js and is a simple and lightweight backend service designed to receive and process data from hardware trackers, such as the ESP8266, to monitor the location of vehicles and detect potential accidents or fires. This README provides an overview of the API and how to set it up.

## Features

- **GPS Location Tracking**: The API accepts GPS data from hardware trackers and displays the vehicle's location on a map.

- **Accident Detection**: Using accelerometer data, the API can detect sudden impacts (indicating an accident) and send alerts to emergency responders.

- **Fire Detection**: The API can also detect fires using data from an IR flame sensor and send alerts when a fire is detected.

- **Email Notifications**: In case of an accident or fire detection, the API sends email notifications to emergency teams or responders.

## Prerequisites

Before setting up the GPS-Tracker-API, you need to have the following:

- Node.js installed on your server
- Firebase configuration with authentication credentials
- A working email account (e.g., Gmail) for sending notifications


```
Your GPS-Tracker-API will be running on the specified port (default is 5000).

## API Endpoints

- **GPS Data Endpoint**: `/gps`

  You can send GPS data to this endpoint to track the vehicle's location.

- **Hardware Tracker Data Endpoint**: `/api`

  Send data from the hardware tracker, including accelerometer data and fire sensor data. The API will process this data to detect accidents or fires and send email notifications as necessary.

## Notifications

Email notifications are sent to the specified emergency email address when accidents or fires are detected.
