'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');
var Fetch = require('node-fetch');
var FormData = require('form-data');



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
    method: 'GET',
    path: '/loadFrom',
    handler: function (request, reply) {
        reply.view('loadfrom', null, {
            layout: 'none'
        });
    }
});


server.route({
    method: 'POST',
    path: '/postTo',
    handler: function (request, reply) {
        console.log(request.payload.name);
        var name = encodeURIComponent(request.payload.name);
        reply.view('postTo', {
            name: name
        }, {
            layout: 'none'
        });
    }
});

server.route({
    method: 'GET',
    path: '/fetchFrom',
    handler: function (request, reply) {

        Fetch('http://localhost:3000/loadFrom').then(function (res) {
            return res.text();
        }).then(function (text) {
            console.log(text);
            reply.view('fetchfrom', {
                text: text
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/fetchPost',
    handler: function (request, reply) {

        var formData = new FormData();
        formData.append("name", "Zeven");

        Fetch("http://localhost:3000/postTo", {
            method: "POST",
            body: formData
        }).then(function (response) {
            //console.log(response);
            return response.text();
        }).then(function (text) {
            console.log(text);
            reply.view('fetchfrom', {text: text});
        });
    }
});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
