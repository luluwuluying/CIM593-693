'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Vision = require('vision');
const Inert = require('inert');
const Path = require('path');
const Handlebars = require('handlebars');

var fs = require('fs');
var imgur = require('imgur');



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
        var name = data["fileUpload"].filename;
        console.log(data);
        if (name != "") {

            fs.readFile(data["fileUpload"].path, function (err, data) {
                var path = __dirname + "/public/uploads/" + name;
                fs.writeFile(path, data, name, function (err) {

                    //need to fix bug
//                    reply.view('imageuploaded', {
//                        uploaded: str(name)
//                    })
                    console.log("Saved");
                });
            });

        } else {
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
