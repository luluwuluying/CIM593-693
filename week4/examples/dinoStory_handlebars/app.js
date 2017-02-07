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
    helpersPath: 'views/helpers'
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
                    {
                        item: 'squirrel'
                    },
                    {
                        item: 'kite'
                    },
                    {
                        item: 'computer'
                    }
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
            path: './',
            listing: true,
            index: false,
            redirectToSlash: true
        }
    }
});


server.route({
    method: 'GET',
    path: '/dynamic',
    handler: {
        view: {
            template: 'dynamic',
            context: {
                title: "Phil's Adventure",
                message: 'On a Spring Morning, Phil the Dino went to the park. Walking, he was startled by a ....',
                nav: [
                    {
                        url: "/page2/squirrel",
                        title: "squirrel"
                    },
                    {
                        url: "/page2/kite",
                        title: "kite"
                    },
                    {
                        url: "/page2/computer",
                        title: "computer"
                    }
                ]
            }

            //
        }
    }
});

server.route({
    method: 'GET',
    path: '/page2/{played*}',
    handler: function (request, reply) {

        var played = encodeURIComponent(request.params.played);
        var message = "with the " + played;


        reply.view('page2', {
            title: "Phil's Adventure",
            message: message,
            pic: played,
            nav: [
                    {
                        url: "/page3/park",
                        title: "park"
                    },
                    {
                        url: "/page3/playground",
                        title: "space"
                    },
                    {
                        url: "/page3/museum",
                        title: "museum"
                    }
                ]

        });
    }
});


server.route({
    method: 'GET',
    path: '/page3/{played*}',
    handler: function (request, reply) {
         var played = encodeURIComponent(request.params.played);
        var message = "at the " + played ;
        reply.view('page2', {
            title: "Phil's Adventure",
            message: message,
            pic: played

        });
    }
});

server.route({
    method: 'GET',
    path: '/basicHandler',
    handler: {
        view:{
            template: 'basic',
            context: {
               title: "Basic Handler",
                message: "More information"
            }

        }
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);

});
