##[Finish javascript](https://github.com/zevenrodriguez/CIM593-693/tree/master/week2/examples/basicJavascript)


#Getting started with Node

##Basic Linux Commands

#####In UNIX

Commands
* telnet google.com 80
* Then type GET / HTTP/1.1
* Examin
* Press ESC and Enter to exit

####[Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

#####Typical Status Codes
* 200 - OK
* 302 - Found
 * URL redirection
* 400 - Bad Request
* 401 - Unauthorized
* 403 - Forbidden
* 404 - Not Found
* 500 - Internal Server Error
* 502 - Bad Gateway


Developer Tools
* Network > Headers


##Basic Unix Commands 

* Common commands
 * ls - List directory items
 * pwd - Current directory path
 * cd - Change directory
 * cd . - Goes to root directory
 * cd .. - Move up a directory
 * chmod - Change permission
  * chmod 777 file.txt
 * mkdir <directory name> - Make Directory
 * rm <filename> - Remove file
 * rmdir <directory name> - Remove directory


###About chmod

Every file and directory has nine permissions associated with it Files and directories have three types of permissions (or none): 

_r (read) w (write) x (execute) - (no permission)_

The above permissions occur for each of the following classes or users: 

_u (user/owner) g (group) o (other/world)_

#What is Node

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Most importantly node allows you to run javascript outside of the browser. Node.js acts as a library that interprets javascripts and allows to write scripts that can create servers and interface with OS systems.

## Installing Node

[Install NVM](https://github.com/creationix/nvm)

NVM is a software that lets you to easily

Install script: ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash ```

In terminal type >> ```nvm --version```

Then type >> ```nvm install stable```

Then type >> ```node -v``` If installed correctly, it should display your current node version 7.4.0

By typing ```node```


####To start a node project

* Open terminal
* cd to the desired directory
* Create a directory >> ```mkdir project-name```
* type >> ```npm init```
 * Enter options accordingly
* create an app.js or index.js
* Paste the code below and save
* To run your code type node app.js or node index.js
* Then open your web browser and type ```http://localhost:3000/```
* To exit your code press ctrl - c

###Using Strict

"use strict"

As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.

In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.

In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

*From w3schools*

#####Basic node code

```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

##NPM

Node.js comes with a package manager and installer called npm. To install node packages/software type ```npm install <name of package>``` There are 2 main versions to install a package:

* npm install --save <name of package>
 * This method install the package locally to the project you are working with.
 * Most of the time you will use this method.
 * It also adds the package to the package.json file.
 *
* npm install -g <name of package>
 * Installs the package globally
 * You have to manually add the package to the package.json file

 Using the --save method ensures that your application is using the version of the package that consistenly works with your application

 You should add node_modules to your gitignore

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


http://jaskokoyn.com/category/programming/javascript/nodejs/
