define(function() {
    var api = {
        baseUrl: 'https://zeeslagavans.herokuapp.com/',
        token: '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1jaC5yb21ib3V0QHN0dWRlbnQuYXZhbnMubmwi.3qHsgxYAM7XVklo45370WTfpR5fhi0l97DaHok324wg',

        user: {
            me: {
                games: function() {
                    return $.ajax({
                        url: api.baseUrl + 'users/me/games' + api.token
                    });
                }
            }
        },
        games: function(id) {
            return $.ajax({
                url: api.baseUrl + 'games' + api.token
            });
        },
        ships: function() {
            return $.ajax({
                url: api.baseUrl + 'ships' + api.token
            });
        }
    };

    return api;
});