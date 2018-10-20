# elm-system

Elm System helps you compose many Elm programs into a web application.

Associate an Elm program with a route, and all requests to that route
will be handled by that program. You can also use a headless Elm program as
middleware, which could redirect a request as necessary or add flags that
will be passed to the route program.

## Elm Version

- Elm System 2.x requires Elm 0.19
- Elm System 1.x requires Elm 0.18

## Example

```
var System = require("elm-system")
var AuthProgram = require("./elm/Authorization.elm")
var LoginProgram = require("./elm/Login.elm")
var ShowProgram = require("./elm/ShowStuff.elm")

var system = System()

system.useFlags({ baseUrl: "/api" })

system.useProgram(AuthProgram.Elm.Authorization)

system.route("/login").program(LoginProgram.Elm.Login)

system.route("/stuff/:stuffId").program(ShowProgram.Elm.ShowStuff, {}, function(app) {
  app.ports.doSomething.subscribe(function(things) {
    //some javascript
  })
})

system.mount(document.getElementById("main"))
```

## Setup

To facilitate communication between the Elm programs that compose your web application
and Elm System, you'll need to add some ports to your programs.

For the Html program associated with a route, you must add:

```
port request : (a -> msg) -> Sub msg
```

where `a` is the record type you expect. By subscribing to this port, your program
will be notified whenever a new request to the program's associated route is received.
The incoming record is composed of route parameters (see below) and any flags added
by middleware.

For middleware, you must add two ports:

```
port request : (a -> msg) -> Sub msg
port next : b -> Cmd msg
```

where `a` is the record type you expect for each request and `b` is the record type
passed on to the route program. The middleware program is notified via the `request`
subscription on every request. The following flags are passed on each request:

```
{ path: '/the-current-path'
}
```

Once the middleware program has completed any processing,
it must call `next` to send the command that will pass the request to the route program.
The route program will receive any flags passed with this command.

Any type of program may add the following port:

```
port changeLocation : String -> Cmd msg
```

This function creates a command that changes the location to the path provided.
With Elm System, you must use this port command to update the location (instead of,
for example, elm-lang/navigation).

## Configuration

### Global Flags

Specify flags that will be passed to each program upon initialization:

```
system.useFlags({ aFlag: "flag1", bFlag: "flag2" })
```

### Middleware

Specify a headless Elm program that will handle each request:

```
system.useProgram(MyElm.Worker, someProgramFlags, callback)
```

where `someProgramFlags` are the flags to pass to the program upon initialization
and `callback` is a function that takes the initialized program. Use `callback` to
configure the worker once it has been initialized (add any extra ports, etc).

### Routing

Specify a route and associate it with an Elm program like so:

```
system.route("/my/route").program(MyElm.App, someProgramFlags, callback)
```

where `someProgramFlags` are the flags to pass to the program upon initialization
and `callback` is a function that takes the initialized program. Use `callback` to
configure the program once it has been initialized (add any extra ports, etc).

The route may contain wildcards using the `*` character.
The route path may contain parameters. These will be passed to the Elm
program as part of the record sent to the `request` port. So, if you configure
a route like so:

```
system.route("/my/:thing/:id/*").program(MyElm.App)
```

then a request to `/my/books/17/otherStuff` will result in the `request` port being called with a record that looks like:

```
{ thing = "books"
, id = "17"
}
```

Note that all the values are strings.

### Mounting

Once you have configured Elm System, just call `mount` with an Html Element. The
programs will be mounted under this node.

```
system.mount(document.getElementById("main"))
```

## Development

To run the tests:

```
npm test
```
