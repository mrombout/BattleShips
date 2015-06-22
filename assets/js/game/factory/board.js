define(['factory/ship', 'entity/Board3D', 'model/Ship'], function(shipFactory, Board3D, Ship) {
    /**
     * Creates Board3D objects based on Board models.
     *
     * @constructor
     */
    var BoardFactory = function() {

    };

    /**
     * Creates an enemy of player board based on the given Board model.
     *
     * @param {Board} board
     * @returns {Board3D}
     */
    BoardFactory.prototype.create = function(board) {
        if(board.ships) {
            return this.createPlayerBoard(board);
        } else {
            return this.createEnemyBoard(board);
        }
    };

    /**
     * Creates a player board based on the given Board model.
     *
     * @param board
     * @returns {Board3D}
     */
    BoardFactory.prototype.createPlayerBoard = function(board) {
        return new Board3D(board);
    };

    /**
     * Creates a enemy board based on the given Board model.
     *
     * @param board
     * @returns {Board3D}
     */
    BoardFactory.prototype.createEnemyBoard = function(board) {
        return new Board3D(board);
    };

    return new BoardFactory();
});