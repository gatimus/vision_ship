/**
 * --
 * @class Engine
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {Object} hud
 * @pram {Number} fps
 */
function Engine(canvas, hud, fps) {
	this.canvas = canvas;
	//hud
	createjs.Ticker.framerate = fps;



	this.next = "./levels/level1.json";
	
	game.loadLevel(this.next, function(data){
		this.next = data.next;
		game.level = new Level(game.canvas, data);
	});
}

/**
 * --
 * @class Engine
 */
Engine.prototype.start = function(){
	createjs.Ticker.addEventListener("tick", function(event){
		game.loop(event, input);
	});
};


