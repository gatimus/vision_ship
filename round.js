function Round(x, y, direction) {
    var data = {
    images: ["Round.png"],
    frames: {width:8, height:8, count:1},
    animations: {
      run:0
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  createjs.Sprite.call(this, spriteSheet, "run");
  this.speed = 10;
  this.x = x;
  this.y = y;
  this.d = direction | 0;
}

Round.prototype = Object.create(createjs.Sprite.prototype);

Round.prototype.update = function(delta){
  if(this.x>640){
    stage.removeChild(this);
  }
  switch (this.d) {
    case 0 :
      this.x += this.speed*delta;
      break;
    case 1 :
      this.x += this.speed*delta;
      this.y += this.speed*delta;
      break;
    case 2 :
      this.x += this.speed*delta;
      this.y -= this.speed*delta;
      break;
  }
};