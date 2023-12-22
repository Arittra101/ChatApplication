/*
    Author       : Arittra Das
    Project Name : Chat Application
    Description  : Node Sever index file that handle socket.io
    Date         : 12/23/2023

*/

//dependencies 
const io = require('socket.io')(8000);


//user object - module scaffolding
const users = {}  //all connected users object
