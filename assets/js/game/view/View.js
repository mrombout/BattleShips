define(function() {

    /**
     * Represents a single screen implementen in HTML. A view should contain
     * methods to manipulate the actual screen and trigger events to notify
     * about user interaction.
     *
     * @constructor
     */
    var View = function() {
        this.$this = $(this);
    };

    /**
     * Adds an event to this object. Events are used to notify a Presenter (e.g.
     * a State) about user interaction such as a button click.
     *
     * @param {string} eventName
     * @param callback
     */
    View.prototype.on = function(eventName, callback) {
        this.$this.on(eventName, callback);
    };

    return View;
});