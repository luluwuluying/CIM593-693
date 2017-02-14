'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

const fs = require("fs");


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
    helpersPath: 'views/helpers',
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
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './',
            listing: false,
            index: false
        }
    }
});

server.route({

    method: 'POST',
    path: '/form',
    handler: function (request, reply) {
        var formresponse = JSON.stringify(request.payload);
        //console.log(formresponse.length);


        reply.view('formresponse', {
            formresponse: formresponse
        });
    }
});

server.route({

    method: 'POST',
    path: '/formJSON',
    handler: function (request, reply) {
        var jsonForm = JSON.stringify(request.payload);
        console.log(jsonForm);
        reply(jsonForm);
    }


});

server.route({
    method: 'GET',
    path: '/savefile',
    handler: {
        view: {
            template: 'savefile'
        }
    }

});


server.route({

    method: 'POST',
    path: '/savefile',
    handler: function (request, reply) {

        var jsonForm = JSON.stringify(request.payload);
        console.log(jsonForm);

        console.log("Going to write into existing file");

        fs.writeFile('savedata.txt', jsonForm, function (err) {
            if (err) {
                return console.error(err);
            }

            console.log("Data written successfully!");
            console.log("Let's read newly written data");
            fs.readFile('savedata.txt', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("Asynchronous read: " + data.toString());
            });
        });

        reply("File Saved");
    }

});

server.route({

    method: 'GET',
    path: '/savedata',
    handler: function (request, reply) {
        console.log("Let's read newly written data");
        var currentData = "";
        fs.readFile('savedata.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            currentData = JSON.parse(data.toString());
            console.log("Asynchronous read: " + currentData);

            reply.view('savedata', {
                formresponse: currentData.monsterName,
            });
        });

    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
