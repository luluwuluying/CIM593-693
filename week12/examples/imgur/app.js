'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

var fs = require('fs');
var imgur = require('imgur');

var secret = require('./secret.js');


imgur.setCredentials(secret["email"], secret['password'], secret['client_id'], secret["client_secret"]);
imgur.setAPIUrl('https://api.imgur.com/3/');


const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({
    port: 3000
});


server.register([Blipp, Inert, Vision], () => {});

server.views({
    engines: {
        html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    //helpersPath: 'views/helpers',
    //partialsPath: 'views/partials'
});


server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index'
        }
    }
});

server.route({

    method: 'POST',
    path: '/imageUpload',
    config: {

        payload: {
            output: 'file',
            parse: true,
            //allow: 'multipart/form-data'
        }
    },
    handler: function (request, reply) {
        var data = request.payload;
        console.log(data);
        if (data["fileUpload"].filename != "") {
            var albumId = 'AQUeT';
            imgur.uploadFile(data["fileUpload"].path, albumId)
                .then(function (json) {
                    console.log(json.data.link);
                    reply.view('imageuploaded', {uploaded: json.data.link})
                })
                .catch(function (err) {
                    console.error(err.message);
                });

        }else{
            reply().redirect("/");
        };
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
