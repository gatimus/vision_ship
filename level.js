/**
 * --
 * @class Level
 * @pram {HTMLCanvasElement | String | Object} canvas
 * @pram {String | Object} levelData 
 */
function Level(canvas, loadQueue) {
	createjs.Stage.call(this, canvas);
	//createjs.SpriteStage.call(this, canvas, false, false);
	this.loadQueue = loadQueue;
	this.levelData = loadQueue.getResult("level");
	/*
	for (var i = 0; i < this.levelData.events.length; i++) {
	  if(this.levelData.events[i].data.sprite_sheet){
	    this.levelData.events[i].data.sprite_sheet = loadQueue.getResult(this.levelData.events[i].data.sprite_sheet);
	  }
	}
	*/
	//level observers
	this.observers = [];
	this.observers.push(new Spawner());
	this.observers.push(new FX());
	
	
	this.ticks = 0;
}

Level.prototype = Object.create(createjs.Stage.prototype);
//Level.prototype = Object.create(createjs.SpriteStage.prototype);

/**
 * --
 * @class Level
 * @pram {Number} speed
 */
Level.prototype.update = function(speed){

	for (var i = 0; i < this.levelData.events.length; i++) {
		var event = this.levelData.events[i];
		if(event.ticks == this.ticks){
		  this.notify(event, this);
		  /*
			switch(event.type){
				case "SPAWN":
					this.spawn(event.data);
					break;
				default:
					//default
			}
			*/
		}
	}

	for (var i = 0; i < this.children.length; i++) {
		if(this.children[i].update){
			this.children[i].update(speed);
		}
	}

	createjs.Stage.prototype.update.call(this);//call super
	//createjs.SpriteStage.prototype.update.call(this);//call super
	
	this.ticks ++;
};

Level.prototype.notify = function(event, subject) {
  /*
  this.observers.forEach(function (observer, index, observers) {
    observer.onNotify(event.type, event.data, this);
  });
  */
  for(var i = 0; i <this.observers.length; i++){
    this.observers[i].onNotify(event.type, event.data, subject);
  }
};

Level.prototype.spawn = function(data) {
  console.dir(data);
  if(typeof data.sprite_sheet == "string") data.sprite_sheet = this.loadQueue.getResult(data.sprite_sheet);
	// console.dir(data);
	var entity;
	switch(data.type){
		case "BG":
			entity = new BackGround(data);
			break;
		case "PLAYER":
			entity = new Ship(data);
			entity.name = "PLAYER";
			break;
		default:
			entity = new Actor(data);
	}
	return this.addChild(entity);
};