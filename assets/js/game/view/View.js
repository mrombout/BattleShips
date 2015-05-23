define(function() {
    var View = function() {
        this.$this = $(this);
    };

    View.prototype.on = function(eventName, callback) {
        this.$this.on(eventName, callback);
    };

    return View;
});