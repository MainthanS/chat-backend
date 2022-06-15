# chat-backend

This is a persistent chat app that I made while learning about Node and React.

It uses [Socket.IO](https://socket.io/) to send messages between connected clients via a persistent TCP connection to the server.
Messages and users are stored in a [MongoDB](https://www.mongodb.com/) database (user passwords are hashed before being saved).
Token based authentication is used, so it is not possible for a user to see messages addressed to other people or send messages on behalf of another person.

The frontend code for this application is found [here](https://github.com/StereoWonderland/chat-ui).

A working demonstration of this app can be found [here](http://ec2-18-130-114-156.eu-west-2.compute.amazonaws.com).
