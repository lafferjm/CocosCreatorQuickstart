cc.Class({
    extends: cc.Component,

    properties: {
        // When the distance between the star and main character is less than this
        // value, collectin of the point will be completed
        pickRadius: 0,
    },

    // use this for initialization
    onLoad: function () {

    },

    getPlayerDistance: function() {
        // judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },
    
    onPicked: function() {
        // when the stars are being collected, invoke the interface in the game
        // script to generate a new star
        this.game.spawnNewStar();
        // invoke the scoring method of the game script
        this.game.gainScore();
        // then destroy the current star's node
        this.node.destroy();
    },
    
    update: function (dt) {
        // judge if the distance between the star and main character is shorter
        // than the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            // invoke collecting behavior
            this.onPicked();
            return;
        }
        
        // update the transparency of the star according to the timer in the
        // game script
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
