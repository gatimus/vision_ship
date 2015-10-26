
// Observer super
function Observer() {
  this.event = "uninitialized";
  this.entity = {};
}

Observer.prototype.onNotify = function(event, entity) {
  this.event = event;
  this.entity = entity;
};

// Spawner
function Spawner() {
  Observer.call(this);
}

Spawner.prototype = Object.create(Observer.prototype);

Spawner.prototype.onNotify = function(event, entity, subject) {
  Observer.prototype.onNotify.call(this, event, entity);
  if(this.event == "SPAWN") subject.spawn(entity);
};

// Audio super
function Audio() {
  Observer.call(this);
  this.config = new createjs.PlayPropsConfig();
}

Audio.prototype = Object.create(Observer.prototype);

Audio.prototype.onNotify = function(event, entity) {
  Observer.prototype.onNotify.call(this, event, entity);
};

Audio.prototype.play = function() {
  createjs.Sound.play(this.entity, this.config);
};

// Music
function Music() {
  Audio.Call(this);
  this.config.loop = -1;
}

Music.prototype = Object.create(Audio.prototype);

Music.prototype.onNotify = function(event, entity) {
  Audio.prototype.onNotify.call(this, event, entity);
  if(this.event == "MUSIC") this.play();
};

// FX
function FX() {
  Audio.call(this);
  this.config.loop = 0;
}

FX.prototype = Object.create(Audio.prototype);

FX.prototype.onNotify = function(event, entity, subject) {
  Audio.prototype.onNotify.call(this, event, entity);
  this.config.pan = subject.x/320-1;
  if(this.event == "FX") this.play();
};

