# Neon

## JavaScript DSL for Classical Inheritance

This files provides a DSL for the following design patterns:

* inheritance
* interface
* module

Neon packs a DSL for Class creation, that helps in making programs following an object oriented design.

The philosophy is that it should not try to emulate other languages, so it preserves the JavaScript good parts,
but with a nicer syntax to create classes that ensure interfaces and include reusable functionality as modules.

## Why another Class System?

As the web applications are getting more complex these times, backend and frontend engineers work has fusioned, and they need to be able to establish a common language. It was created for people coming from OOP languages like Ruby to Javascript.

### Usage

    Interface('Editable')({
        constructor : ['x'],
        prototype   : ['x']
    });

    Module('Composition')({
        y : 5,
        prototype : {
            z : 3
        }
    });

    Module('Other')({
        a : 5,
        prototype : {
            b : 3
        }
    });

    Class('Overlay').inherits(Widget).ensures(Editable).includes(Composition, Other)({
        html : '<div></div>',
        prototype : {
            init : function (element){
                if(!element){
                    element = document.createElement('div');
                    element.innerHTML = 'hello';
                    document.body.appendChild(element);
                }
            },
            b : 5
        }
    });

## Neon´s Standard Library

Having a DSL to make our classes readable and consistent is nice, but having a
set of tools in a standard library is a lot better.

```
   require('neon');
   require('neon/stdlib');
```

### CustomEventSupport

Gives your objects the capability of dispatch events and have such events listened
by other objects.

It is based on the [DOM Standard](https://dom.spec.whatwg.org/#events) and follows the same API.

#### Methods.

**[Class.addEventListener(type {String}, eventHandler {Function})](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)**
    Register an event handler of a specific custom event type on the Class.
**[instance.addEventListener(type {String}, eventHandler {Function})]((https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener))**
    Register an event handler of a specific custom event type on the instanced object.
**[Class.removeEventListener(type {String}, eventHandler {Function})](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)**
    Removes an event listener from the Class.
**[instance.removeEventListener(type {String}, eventHandler {Function})](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)**
    Removes an event listener from the Class.
**[Class.dispatchEvent(type {String}, data {Object})](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)**
    Dispatch a custom even to this Class.
**[instance.dispatchEvent(type {String}, data {Object})](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)**
    Dispatch a custom even to this instanced object.

#### Usage Samples.

```
    require('neon');
    require('neon/stdlib');

    Class('Button').includes(CustomEventSupport)({
        prototype : {
            element : null,
            value   : null,

            init : function(config) {
                this.element = config.element;
                this.value   = config.value;

                this._bindListeners();

                return this;
            },

            pushDown : function() {
                this.dispatch('pushed', {data : {value : this.value}});
            },

            _bindListeners : function() {
                var button = this;

                this.element.addEventListener('click', function () {
                    button.pushDown();
                });
            }
        }
    });

    var myButtonInstance = new Button();

    myButtonInstance.addEventListener('pushed', function(event) {
        console.log("Pushed button´s value is: ", event.data.value);
    });
```

## License

Copyright (c) 2009 Fernando Trasviña

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
