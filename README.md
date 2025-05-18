Overview:
---------
This project is a Notification Service that sends notifications to users via Email, SMS, and In-App messages. It supports storing notifications in MongoDB and processing them asynchronously using RabbitMQ.

How I Approached the Assignment:
--------------------------------
API Design:

Created two endpoints:
  POST /notifications to send notifications
  GET /users/:id/notifications to fetch user notifications

Database Setup:
   Used MongoDB to store notification data like userId, ModeType, message, and status.

Message Queue Integration:
  Used RabbitMQ as a message queue to process notifications in the background.
  Created a producer to send notification data to the queue.

Notification Processing:
   Optional consumer can read from queue and simulate delivery (like email sending).

Error Handling and Validation.

How to Run the Project:
-----------------------
->Clone the project.
->Create a .env file with the following:
  MONGODB_URI=your_mongodb_connection_string
  RABBITMQ_URI=amqp://localhost
->Make sure MongoDB is running (local or Atlas).
->Make sure RabbitMQ is running.
->Install dependencies:
  npm install
->Start the server:
  node server.js
->Test with Postman:
  POST /notifications
  Body:
  {
  "userId": "u124",
  "ModeType": "email",
  "message": "Hello from notification service"
  }
->GET /users/u124/notifications

Notes:
-----
RabbitMQ is used to queue notifications. If you want to skip it, you can just save notifications directly.

Error handling and retry logic can be extended for production use.
