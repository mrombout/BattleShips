define(['factory/ship', 'entity/Board3D', 'model/Ship'], function(shipFactory, Board3D, Ship) {
    var BoardFactory = function() {

    };

    BoardFactory.prototype.create = function(board) {
        if(board.ships) {
            return this.createPlayerBoard(board);
        } else {
            return this.createEnemyBoard(board);
        }
    };

    BoardFactory.prototype.createPlayerBoard = function(board) {
        var board3d = new Board3D(board);

        return board3d;
    };

    BoardFactory.prototype.createEnemyBoard = function(board) {
        var board3d = new Board3D(board);

        return board3d;
    };

    return new BoardFactory();
});