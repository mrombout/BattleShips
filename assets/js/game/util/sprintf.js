"use strict";

define(function() {
    return function(str, data) {
        for(var key in data) {
            str = str.replace('{' + key + '}', data[key]);
        }

        return str;
    }
});