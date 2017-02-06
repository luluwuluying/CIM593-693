####Getting started with Hapi.js

Hapi.js is a framework that contains the tools that allows to interface with server-side applications. At its core it allows to create routes and process server/http parameters.

[Hapi.js](https://hapijs.com/)

[Getting Started](https://hapijs.com/tutorials/getting-started?lang=en_US)

* Create a new directory
* npm init
* npm install --save hapi

[Basic Hapi Example](https://github.com/zevenrodriguez/CIM593-693/tree/master/week3/examples/basicHapi)

[Blipp](https://www.npmjs.com/package/blipp) is module that allows you view your applications possible routes.

npm install --save blipp

To your app add at the top:

```
const Blipp = require('blipp');
```

And wrap the server.register around server.start

```
server.register([Blipp], (err) => {
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);

    });
});
```

##Static Files

If you need to serve static files like html documents, images, and other assets you need to use a module called [inert](https://github.com/hapijs/inert). Inert allows you to set a folder on your server to hold your static content. In your project create a public folder that will contain these assets.

npm install --save inert


##Views

npm install --save vision
npm install --save handlebars


###[Handlebars](http://handlebarsjs.com/installation.html)

Handlesbars is a template engine. It allows you to inject variables into your html documents.

Passing a variables

{{variable}}




http://jaskokoyn.com/category/programming/javascript/nodejs/


https://github.com/hyprstack/handlebars-tutorial-hapijs