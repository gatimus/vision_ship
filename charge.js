function Charge(x, y) {
    var data = {
    images: ["Charge.png"],
    frames: {width:32, height:32, count:19},
    animations: {
      run:[0,19]
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  createjs.Sprite.call(this, spriteSheet, "run");
  this.speed = 10;
  this.x = x;
  this.y = y;
}

Charge.prototype = Object.create(createjs.Sprite.prototype);

Charge.prototype.update = function(delta){

};