function Gatimus() {
    var data = {
    images: ["vision_ship.png"],
    frames: {width:64, height:64, count:3},
    animations: {
      run:{
        frames: [0,1,2],
        speed: 0.3
      }
    }
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  createjs.Sprite.call(this, spriteSheet, "run");
  this.speed = 10;
  this.y = 208;
  this.power = "normal";
}

Gatimus.prototype = Object.create(createjs.Sprite.prototype);

Gatimus.prototype.move = function(up, left, down, right){
  if (up && this.y > 0) this.y -= this.speed*2;
  if (left && this.x > 0) this.x -= this.speed;
  if (down && this.y < 416) this.y += this.speed*2;
  if (right && this.x <576) this.x += this.speed;
};

Gatimus.prototype.update = function(delta){
  //console.log(delta);
  /*
  if(Key.isDown(32)){
    
    switch (this.power) {
      case "normal" :
            if(!this.wasFire){
              stage.addChild(new Round(this.x+52, this.y+28));
              createjs.Sound.play("shot").pan = this.x/320-1;
            }
        break;
      case "repeat" :
        stage.addChild(new Round(this.x+52, this.y+28));
        createjs.Sound.play("shot");
        break;
      case "spread" :
            if(!this.wasFire){
              stage.addChild(new Round(this.x+52, this.y+28, 0));
              stage.addChild(new Round(this.x+52, this.y+28, 1));
              stage.addChild(new Round(this.x+52, this.y+28, 2));
              createjs.Sound.play("shot");
            }
        break;
    }
    this.wasFire = true;
  } else{
    this.wasFire = false;
  }
  
  if(Key.isDown(90)){
    if(!this.wasCharge){
      this.charge = stage.addChild(new Charge(this.x+48, this.y+16));
    }
    if(this.chargeValue > 30){
      if(!this.charged){
        stage.removeChild(this.charge);
        this.charge = stage.addChildAt(new ChargeFire(this.x+48, this.y+16),stage.getChildIndex(this)-1);
        this.charged = true;
      }
    }
    if(this.chargeValue > 30){
      this.wasCharge = false;
      this.charged = false;
      this.chargeValue = 0;
    }
    this.chargeValue += 1;
    this.charge.x = this.x+48;
    this.charge.y = this.y+16;
    this.wasCharge = true;
  } else {
    stage.removeChild(this.charge);
    this.chargeValue = 0;
    this.charged = false;
    this.wasCharge = false;
  }
  */
};