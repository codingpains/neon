Module('CustomEventSupport')({

    eventListeners : null,

    bind : function(type, eventHandler) {
        if (console && console.warn) {
            console.warn('bind is deprecated, use addEventListener instead.');
        }

        return CustomEventSupport.addEventListener(type, eventHandler);
    },

    unbind : function(type, eventHandler) {
        if (console && console.warn) {
            console.warn('unbind is deprecated, use removeEventListener instead.');
        }

        return CustomEventSupport.addEventListener(type, eventHandler);
    },

    dispatch : function(type, eventHandler) {
        if (console && console.warn) {
            console.warn('dispatch is deprecated, use dispatchEvent instead.');
        }

        return CustomEventSupport.dispatchEvent(type, eventHandler);
    },

    addEventListener : function(type, eventHandler) {
        var found, i, listeners;

        if(!this.eventListeners) {
            this.eventListeners = {};
        }

        if(!this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }

        found  = false;

        listeners = this.eventListeners[type];
        for (i = 0; i < listeners.length; i++) {
            if (listeners[i] === eventHandler) {
                found = true;
                break;
            }
        }

        if(!found) {
            this.eventListeners[type].push(eventHandler);
        }

        return this;
    },

    removeEventListener : function(type, eventHandler) {
        var i, found, listeners;

        found  = false;

        if(!this.eventListeners) {
            this.eventListeners = {};
        }

        if(typeof eventHandler == 'undefined') {
            this.eventListeners[type] = [];
        }

        listeners = this.eventListeners[type];
        for (i = 0; i < listeners.length; i++) {
            if(listeners[i] === eventHandler) {
                found = true;
                break;
            }
        }

        if(found) {
            this.eventListeners[type].splice(i, 1);
        }

        return this;
    },

    dispatchEvent : function(type, data) {
            var event, listeners, instance, i;

            if (this.eventListeners === null) {
                this.eventListeners = {};
            }

            if (typeof data === 'undefined') {
                data = {};
            }

            if (data.hasOwnProperty('target') === false) {
                data.target = this;
            }

            event         = new CustomEvent(type, data);
            listeners     = this.eventListeners[type] || [];
            instance      = this;

            for (i = 0; i < listeners.length; i = i + 1) {
                listeners[i].call(instance, event);
                if (event.areImmediateHandlersPrevented === true) {
                    break;
                }
            }

            return event;
    },

    prototype : {

        eventListeners : null,

        bind : function(type, eventHandler) {
            if (console && console.warn) {
                console.warn('bind is deprecated, use addEventListener instead.');
            }

            return this.addEventListener(type, eventHandler);
        },

        unbind : function(type, eventHandler) {
            if (console && console.warn) {
                console.warn('unbind is deprecated, use removeEventListener instead.');
            }

            return this.removeEventListener(type, eventHandler);
        },

        dispatch : function(type, eventHandler) {
            if (console && console.warn) {
                console.warn('dispatch is deprecated, use dispatchEvent instead.');
            }

            return this.dispatchEvent(type, eventHandler);
        },

        addEventListener : function(type, eventHandler) {
            var found, i, listeners;

            if(!this.eventListeners) {
                this.eventListeners = {};
            }

            if(!this.eventListeners[type]) {
                this.eventListeners[type] = [];
            }

            found  = false;

            listeners = this.eventListeners[type];
            for (i = 0; i < listeners.length; i++) {
                if(listeners[i] === eventHandler) {
                    found = true;
                    break;
                }
            }

            if(!found) {
                this.eventListeners[type].push(eventHandler);
            }

            return this;
        },

        removeEventListener : function(type, eventHandler) {
            var i, found, listeners;

            found = false;
            i     = 0;

            if(!this.eventListeners) {
                this.eventListeners = {};
            }

            if(typeof eventHandler == 'undefined') {
                this.eventListeners[type] = [];
            }

            listeners = this.eventListeners[type];
            for (i = 0; i < listeners.length; i++) {
                if(listeners[i] == eventHandler) {
                    found = true;
                    break;
                }
            }

            if(found) {
                this.eventListeners[type].splice(i, 1);
            }

            return this;
        },

        dispatchEvent : function(type, data) {
            var event, listeners, instance, i;

            if (this.eventListeners === null) {
                this.eventListeners = {};
            }

            if (typeof data === 'undefined') {
                data = {};
            }

            if (data.hasOwnProperty('target') === false) {
                data.target = this;
            }

            event         = new CustomEvent(type, data);
            listeners     = this.eventListeners[type] || [];
            instance      = this;

            for (i = 0; i < listeners.length; i = i + 1) {
                listeners[i].call(instance, event);
                if (event.areImmediateHandlersPrevented === true) {
                    break;
                }
            }

            return event;
        }
    }
});
