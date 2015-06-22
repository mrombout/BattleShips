"use strict";

define(function() {
    /**
     * Formats a string with the given data by replacing any {keywords} with
     * the corresponding value in the given data.
     *
     * NOTE: A {keyword} will only be replaced once
     */
    return function(str, data) {
        for(var key in data) {
            if(data.hasOwnProperty(key)) {
                str = str.replace('{' + key + '}', data[key]);
            }
        }

        return str;
    }
});