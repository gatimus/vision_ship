function ChargeFire(x, y) {
    var data = {
    images: ["Charge Fire.png"],
    frames: {width:640, height:32, count:3},
    animations: {
      run:[0,2]
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  createjs.Sprite.call(this, spriteSheet, "run");
  this.speed = 10;
  this.x = x;
  this.y = y;
}

ChargeFire.prototype = Object.create(createjs.Sprite.prototype);

ChargeFire.prototype.update = function(delta){

};