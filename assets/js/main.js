require.config({
    paths: {
        "jquery": ["https://code.jquery.com/jquery-2.1.4", "../bower_components/dist/jquery"]
    }
});

require(['jquery', 'state/Lobby'], function($, LobbyState){
    $(document).ready(function() {

        var $board = $('#board');
        var $top = $('#board .top');
        var $back = $('#board .back');

        $top.hover(function() {
           $board.addClass('zoom-board');
        }, function() {
            $board.removeClass('zoom-board');
        });
        
        $back.hover(function() {
           $board.addClass('zoom-back');
        }, function() {
            $board.removeClass('zoom-back');
        });

        for(var x = 0; x < 10; x++) {
            var rowChar = String.fromCharCode(65 + x);
            var $row = $('<div>', { "data-row": rowChar, "class": "row" });
            for(var y = 0; y < 10; y++) {
                var columnChar = y + 1;
                var $column = $('<div>', { "data-column": columnChar, "class": "field" });

                $row.append($column);
            }

            $top.append($row);
        }
    });
});
