define(function() {
    var api = {
        baseUrl: 'https://zeeslagavans.herokuapp.com/',
        token: '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1jaC5yb21ib3V0QHN0dWRlbnQuYXZhbnMubmwi.3qHsgxYAM7XVklo45370WTfpR5fhi0l97DaHok324wg',

        user: {
            me: {
                games: {
                    get: function() {
                        return $.ajax({
                            url: api.baseUrl + 'users/me/games' + api.token
                        });
                    }
                }
            }
        },
        games: {
            get: function(id) {
                if(id) {
                    return $.ajax({
                        url: api.baseUrl + 'games/' + id + api.token
                    });
                } else {
                    return $.ajax({
                        url: api.baseUrl + 'games' + api.token
                    })
                }
            },
            ai: {
                get: function() {
                    return $.ajax({
                        url: api.baseUrl + 'games' + api.token
                    });
                }
            },
            id: function(gameId) {
                return {
                    gameboards: {
                        post: function(board) {
                            debugger;
                            return $.ajax({
                                method: 'POST',
                                dataType: 'json',
                                data: JSON.stringify(board),
                                url: api.baseUrl + 'games/' + gameId + '/gameboards' + api.token
                            });
                        }
                    },
                    shots: {
                        post: function(tile) {
                            return $.ajax({
                                method: 'POST',
                                data: $.param(tile),
                                url: api.baseUrl + 'games/' + gameId + '/shots' + api.token
                            });
                        }
                    }
                };
            }
        },
        ships: {
            get: function() {
                return $.ajax({
                    url: api.baseUrl + 'ships' + api.token
                });
            }
        }
    };

    window.api = api;
    return api;
});