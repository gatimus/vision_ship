

function Observer() {
  this.event = "uninitialized";
  this.entity = {};
}

Observer.prototype.onNotify = function(event, entity) {
  this.event = event;
  this.entity = entity;
};


function Spawner() {
  Observer.call(this);
}

Spawner.prototype = Object.create(Observer.prototype);

Spawner.prototype.onNotify = function(event, entity, subject) {
  Observer.prototype.onNotify.call(this, event, entity);
  if(this.event == "SPAWN") subject.spawn(entity);
};

function FX() {
  Observer.call(this);
  this.config = new createjs.PlayPropsConfig();
}

FX.prototype = Object.create(Observer.prototype);

FX.prototype.onNotify = function(event, entity, subject) {
  Observer.prototype.onNotify.call(this, event, entity);
  this.config.pan = subject.x/320-1;
  if(this.event == "FX") this.play();
};

FX.prototype.play = function() {
  createjs.Sound.play(this.entity, this.config);
};