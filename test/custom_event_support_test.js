require('../neon.js');
require('../stdlib');
require('tellurium');

// Create Test Class

Class('TestClass').includes(CustomEventSupport)({
    classEvent : function () {
        TestClass.dispatchEvent('classEvent', {data: 'Class event'});
    },

    prototype : {
        name : null,

        init : function (config) {
            this.name = config.name;
            return this;
        },

        setName : function (name) {
            this.name = name;
            this.dispatchEvent('nameChange', {data : {name : name}});
            return this;
        }
    }
});

Tellurium.suite('CustomEventSupport')(function () {
    var noop = function () {
        //noop
    };

    this.describe('Class events')(function () {
        this.specify('should add event handler to class')(function () {
            var spec = this;

            TestClass.addEventListener('fakeEvent', noop);
            spec.assert(Object.keys(TestClass.eventListeners).length).toBeGreaterThan(0);
            spec.completed();
        });

        this.specify('should dispatch event and run event handler')(function (){
            var spec = this,
                eventListener = function (event) {
                    spec.assert(event.data).toEqual('Class event');
                    spec.completed();

                    // Hack to remove all event listers from this event name.
                    TestClass.eventListeners['classEvent'] = [];
                };


            TestClass.addEventListener('classEvent', eventListener);
            TestClass.classEvent();
        });

        this.specify('should remove event listeners')(function () {
            var spec = this;

            if (TestClass.eventListeners['fakeEvent']) {
                TestClass.removeEventListener('fakeEvent', noop);
                spec.assert(TestClass.eventListeners['fakeEvent'].length).toBe(0);
            } else {
                TestClass.addEventListener('fakeEvent', noop);
                spec.assert(TestClass.eventListeners['fakeEvent']).toBeTruthy();
                TestClass.removeEventListener('fakeEvent', noop);
                spec.assert(TestClass.eventListeners['fakeEvent'].length).toBe(0);
            }
            spec.completed();
        });
    });

    this.describe('Instance events')(function () {
        this.specify('should add event handler to instance')(function () {
            var instance = new TestClass({name : 'test instance'});

            instance.addEventListener('firstEvent', noop);
            this.assert(instance.eventListeners['firstEvent'].length).toBe(1);
            this.completed();
        });
    });
});

Tellurium.run();
