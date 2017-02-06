'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

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
            template: 'index',
            context: {
                title: 'Phil at the Park',
                menu: [
                    {item: 'squirrel'},
                    {item: 'kite'},
                    {item: 'computer'}
                ],
                message: 'On a Spring Morning, Phil the Dino went to the park. Walking, he was startled by a ....'
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            listing: false,
            index: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/page2/{played*}',
    handler: function (request, reply) {

        reply.view('page2', {
            title: 'Phil at the Park',
            message: encodeURIComponent(request.params.played)
        });
    }
});



server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
