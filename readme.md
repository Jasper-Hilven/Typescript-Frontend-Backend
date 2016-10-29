# Startup Prototype: Backend and Frontend written in Typescript
This is a three month experiment with the following properties:

### Source divided in Frontend, Commonend and backend
Frontend, Commonend, Backend and their test projects are each in separated folders. Frontend and Backend refer both to Commonend. 
**The usage of the Commenend for common things (like logging, asserting and some API interfaces) saved some time.**

### Multiple compilation targets 
Production frontend, Production backend, Dev frontend, Dev backend
This was configured via Grunt.

### No HTML
There is no html in the project (besides the main index.html) Unaware of virtual-dom at the moment of writing, The approach was probably much more verbose than using a virtual-dom like solution, but the **advantages of using typescript instead of html** were already visible
* Typechecking
* Code above html
   * Abstractions
   * Reuse

### Auto formatting of code
This has the advantage that there are no commits which contain format changes (which could annoy your git log). It is important to stick with one version of formatting, to avoid these annoying changes in the middle of the project.

### Poor man's dependency injection
In a very simple small project, not using inversion of control is definitely acceptable.

### Code generation
Code generation for things like http API's is cool and also a time-saver.
