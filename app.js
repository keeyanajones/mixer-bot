'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const logger = require('morgan');
const discord = require('discord.js'); // require the discord.js module
const tmi = require('tmi.js'); // require the tmi.js module
const Mixer = require('@mixer/client-node'); // require the mixer module
const ws = require('ws');

const app = express();
// app.locals properties persist throughout the life of the application
app.locals.title = 'Chibi Elf Bot'; // => 'Chibi Elf Bot'
app.locals.email = 'chibibot@outlook.com'; // => 'chibibot@outlook.com'

//----------------------------------------------------------------- MIXER
    let userInfo;
    
    const channelName = process.argv[2];
    
    const client = new Mixer.Client(new Mixer.DefaultRequestRunner());
    // With OAuth we don't need to log in. The OAuth Provider will attach
    // the required information to all of our requests after this call.
    client.use(new Mixer.OAuthProvider(client, {
        tokens: {
            access: 'xxxxxXXXXXXXXxxx',
            clientId: 'xxxXXXXXXXXxxx',
            expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
        }
    }));

    client.request('GET', `channels/${channelName}`)
    .then(res => {
        const viewers = res.body.viewersTotal;        
        const username = res.body.name;
        const audience = res.body.audience;
        const viewersCurrent = res.body.viewersCurrent;
        const numFollowers = res.body.numFollowers;
        const online = res.body.online;
        const updatedAt = res.body.updatedAt;

        console.log(`You have ${viewers} total views.`);
        console.log(`Welcome ${username} they just arrived.`);
        console.log(`The audience is ${audience}.`);
        console.log(`There are currently ${viewersCurrent} viewers.`);
        console.log(`You have ${numFollowers} followers.`);
        console.log(`Your stream is ${online} online.`);
        console.log(`Your channel was last updated ${updatedAt}.`); 
    });

    // Gets the user that the Access Token we provided above belongs to.
    client.request('GET', 'users/current')
    .then(res => {       
        const id = res.body.id;
        const username = res.body.username;
        const updatedAt = res.body.updatedAt;
        
        console.log(`${id} Welcome `);
        console.log(`${username} back to your channel!`); 
        console.log(`You last updated was ${updatedAt}.`);
        
        console.log(res.body);
        // Store the logged in user's details for later reference
        userInfo = res.body;
        // Returns a promise that resolves with our chat connection details.
        return new Mixer.ChatService(client).join(res.body.channel.id);
    })
    
    .then(response => {
        const body = response.body;
        console.log(body);
        return createChatSocket(userInfo.id, 
                                userInfo.channel.id, 
                                body.endpoints, 
                                body.authkey);
    })
    
    .catch(error => {
        console.error('Something went wrong with Mixer.');
        console.error(error);
    });

// Creates a Mixer chat socket and sets up listeners to various chat events
    function createChatSocket (userId, channelId, endpoints, authkey) {
    // Chat connection
        const socket = new Mixer.Socket(ws, endpoints).boot();    
    // Greet a joined user
        socket.on('UserJoin', data => {
            socket.call('msg', 
                [`Hi ${data.username}! I'm Chibi-Elf-Bot! Write !chibielf and I will help!`]);
    });
    
    //------------------------------------------------------- MIXER COMMANDS
    // chibielf, 
    // @whisper, @clear, @timeout, @ban, @unban, @poll, @pollresults, 
    // @giveaway, @commands, @mod, @unmod, @chatterlist, @slow, @slowoff
    
    socket.on('ChatMessage', data => {
    // React to !chibibot command
        if (data.message.message[0].data.toLowerCase().startsWith('!chibielf')) {
            socket.call('msg', [`@${data.user_name} Hi ${data.user_name}, 
                Write !commands and I will show you all my commands!`]);
            console.log(`Welcomed ${data.user_name}`);
        }
    // React to !commands command
        if (data.message.message[0].data.toLowerCase().startsWith('!commands')) {
            socket.call('msg', [`@${data.user_name} COMMANDS @${data.user_name},
                LINK TO COMMANDS LIST`]);
            console.log(`Whispers @${data.user_name}`);        
        }    
    // React to !whisper command
        if (data.message.message[0].data.toLowerCase().startsWith('!whisper')) {
            socket.call('msg', [`@${data.user_name} WHISPERS @${data.user_name},
                are you having fun!`]);
            console.log(`Whispers @${data.user_name}`);
        }
    // React to !clear command    
        if (data.message.message[0].data.toLowerCase().startsWith('!clear')) {
            socket.call('msg', [`@${data.user_name} DELETE COMMENT`]);
            console.log(`DELETED COMMENT`);
        }
    // React to !timeout command    
        if (data.message.message[0].data.toLowerCase().startsWith('!timeout')) {
            socket.call('msg', [`@${data.user_name} Oh no ${data.user_name}! 
                You are on a timeout!`]);
            console.log(`TIMEOUT ${data.user_name}`);
        }
    // React to !ban command
        if (data.message.message[0].data.toLowerCase().startsWith('!ban')) {
            socket.call('msg', [`@${data.user_name} YOU ARE BANNED 
                ${data.user_name}! NOT UP IN HERE!`]);
            console.log(`BANNED ${data.user_name}`);
        }
        // React to !unban command
        if (data.message.message[0].data.toLowerCase().startsWith('!unban')) {
            socket.call('msg', [`@${data.user_name} YOU ARE UNBANNED 
                ${data.user_name}! THIS IS YOUR ONLY WARNING!`]);
            console.log(`UNBANNED ${data.user_name}`);
        }
    // React to !poll command
        if (data.message.message[0].data.toLowerCase().startsWith('!poll')) {
            socket.call('msg', [`@${data.user_name} Take Poll 
                ${data.user_name}, Write !pollresults to see the latest results!`]);
            console.log(`poll for ${data.user_name}`);
        }
    // React to !pollresults command
        if (data.message.message[0].data.toLowerCase().startsWith('!pollresults')) {
            socket.call('msg', [`@${data.user_name}  Poll Results
                ${data.user_name}, the latest results!`]);
            console.log(`poll for ${data.user_name}`);
        }        
    // React to !giveaway command
        if (data.message.message[0].data.toLowerCase().startsWith('!giveaway')) {
            socket.call('msg', [`@${data.user_name} Congradulations 
                ${data.user_name}, You are the winner of our giveaway!`]);
            console.log(`Gave Away to ${data.user_name}`);
        }
     // React to !mod command
        if (data.message.message[0].data.toLowerCase().startsWith('!mod')) {
            socket.call('msg', [`@${data.user_name} Hi ${data.user_name}, 
                You are now a CHAT MODERATER!`]);
            console.log(`Added a mod ${data.user_name}`);
        }
    // React to !unmod command
        if (data.message.message[0].data.toLowerCase().startsWith('!unmod')) {
            socket.call('msg', [`@${data.user_name} Hi ${data.user_name}, 
                You are not a CHAT MODERATER NOW!`]);
            console.log(`Unmoded ${data.user_name}`);
        }
    // React to !chatterlist command
        if (data.message.message[0].data.toLowerCase().startsWith('!chatterlist')) {
            socket.call('msg', [`@${data.user_name} Hi ${data.user_name}, 
                These are the chatters!`]);
            console.log(`Displayed Chatterlist to ${data.user_name}`);
        }
    // React to !slow command
        if (data.message.message[0].data.toLowerCase().startsWith('!slow')) {
            socket.call('msg', [`@${data.user_name} 
                Hi, I Slowed the chat down`]);
            console.log(`Slowed the chat ${data.user_name}`);
        }
    // React to !slowoff command
        if (data.message.message[0].data.toLowerCase().startsWith('!slowoff')) {
            socket.call('msg', [`@${data.user_name} 
                Hi, I turnd the slowed chat off`]);
            console.log(`Tuned Slowed chat off ${data.user_name}`);
        }
    });

    // Handle Mixer errors
    socket.on('error', error => {
        console.log('Mixer Socket error');
        console.log(error);
    });
    
    return socket.auth(channelId, userId, authkey)
    .then(() => {
        console.log('Mixer Login Successful');
        return socket.call('msg', 
            ['I\'m Chibi Elf! Write !chibielf and I will help!']);
    });
}    

// Local variables are available in middleware via req.app.locals 
//

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
//Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GET Respond with Hello World! on the homepage:
// app.mountpath property contains one or more path patterns on which a sub-app 
// was mounted.
const admin = express(); // the sub app

app.get('/', (req, res) => res.send('Hello World!'));

admin.get('/', function (req, res) {
    console.log(admin.mountpath); // /admin
    res.send('Admin Homepage');
});

app.use('/admin', admin); // mount the sub app

// listen
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// If you run the express app from another directory, it’s safer to use 
// the absolute path of the directory that you want to serve:
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // res.locals properties are valid only for the lifetime of the request.    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
