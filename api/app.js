const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
'use strict';
const Mixer = require('@mixer/client-node');
const ws = require('ws');
const Carina = require('carina').Carina;

Carina.WebSocket = ws;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mixerAPIRouter = require('./routes/mixerAPI');

const app = express();

let userInfo;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mixerAPI', mixerAPIRouter);

/**
 * connect to Constellation and subscribe to Live Loading updates of channel
 **/
const channelId = 6703403;
const channelName = process.argv[2];

const ca = new Carina({
    queryString: {
        'Client-ID': 'Click here to get your Client ID!',
    },
    isBot: true,
}).open();

ca.subscribe(`channel:${channelId}:update`, data => {
    console.log(data);
});

// Read the host address and the port from the environment
// This is the client ID and client secret that you obtained
// while registering the application
const clientID = CLIENT_ID;
const clientSecret = CLIENT_SECRET;

// Client
const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

    // With OAuth we don't need to log in. The OAuth Provider will attach
    // the required information to all of our requests after this call.
    client.use(new Mixer.OAuthProvider(client, {
        tokens: {
            access: CLIENT_ID,
            expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
        },
    }));

    // Gets the user that the Access Token we provided above belongs to.
    client.request('GET', 'users/current')
    .then(response => {
        userInfo = response.body;
        return new Mixer.ChatService(client).join(response.body.channel.id);
    })
    .then(response => {
        const body = response.body;
        return createChatSocket(userInfo.id, userInfo.channel.id, body.endpoints, body.authkey);
    })
    .catch(error => {
        console.error('Something went wrong.');
        console.error(error);
    });

    /**
    * Creates a Mixer chat socket and sets up listeners to various chat events.
    * @param {number} userId The user to authenticate as
    * @param {number} channelId The channel id to join
    * @param {string[]} endpoints An array of endpoints to connect to
    * @param {string} authkey An authentication key to connect with
    * @returns {Promise.<>}
    **/
    function createChatSocket (userId, channelId, endpoints, authkey) {
        // Chat connection
        const socket = new Mixer.Socket(ws, endpoints).boot();

        // Greet a joined user
        socket.on('UserJoin', data => {
            socket.call('msg', [`Hi ${data.username}! I'm the bot! Write !commands and I will show you!`]);
        });

        // React to !commands
        socket.on('ChatMessage', data => {
            if (data.message.message[0].data.toLowerCase().startsWith('!commands')) {
                socket.call('msg', [`@${data.user_name} COMMMANDS LIST!`]);
                console.log(`Commands List Requested by ${data.user_name}`);
            }
        });

        // Handle errors
        socket.on('error', error => {
            console.error('Socket error');
            console.error(error);
        });

        return socket.auth(channelId, userId, authkey)
        .then(() => {
            console.log('Mixer Login Successful');
            return socket.call('msg', ['Hi! I will show you my Commands list if you !commands.']);
        });
    }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
