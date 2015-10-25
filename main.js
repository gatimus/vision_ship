
//var engine;
var game;
var input;

window.onload = function() {

  //scale to window and center
  var gameScreen = document.getElementById("game");
  var scale = window.innerHeight/480;
  //gameScreen.style.height = height.toString() + "px";
  //gameScreen.style.width = ((height/3)*4).toString() + "px";
  gameScreen.style.transform = "scale(" + scale.toString() + ") " +
                               "translateX(-50%)";

  //get query string
  var args = new (function (search) {
    if (search.length > 1) {
      for (var aItKey, nKeyId = 0, aCouples = search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
        aItKey = aCouples[nKeyId].split("=");
        if(aItKey.length > 1){
          var arg = decodeURIComponent(aItKey[1]);
          this[decodeURIComponent(aItKey[0])] = isNaN(arg) ? arg : parseInt(arg);
        } else {
          this[decodeURIComponent(aItKey[0])] = true;
        }
      }
    }
  })(window.location.search);
  console.dir(args);
  
  init(args);
};

function init(args) {
  
  //var debug = typeof args.debug == "undefined" ? false : args.debug;
  //var fps = typeof args.fps == "undefined" ? 60 : args.fps;
  //var speed = typeof args.speed == "undefined" ? 10 : args.speed;
  //var level = typeof args.level == "undefined" ? 0 : args.level;
  
  var debug = args.debug || false;
  var fps = args.fps || 60;
  var speed = args.speed || 10;
  var level = args.level || 0;

  game = new Game("gameCanvas", {}, fps, speed);

  input = new Input();
  
  //Keyboard
  window.addEventListener("keydown", function(event){
    input.onKeyDown(event);
  });
  window.addEventListener("keyup", function(event){
    input.onKeyUp(event);
  });
  
  //Mouse
  window.addEventListener("mousemove", function(event){
    input.onMouseMove(event);
  });
  window.addEventListener("mousedown", function(event){
    input.onMouseDown(event);
  });
  window.addEventListener("mouseup", function(event){
    input.onMouseUp(event);
  });

  //GamePad
  window.addEventListener("gamepadconnected", function(event){
    input.gamePadConnected(event);
  });
  window.addEventListener("gamepaddisconnected", function(event){
    input.gamePadDisconnected(event);
  });

  /*
  var next = "./levels/title.json";
  
  game.loadLevel(next, function(data){
    next = data.next;
    game.level = new Level(game.canvas, data);
  });
  */

  createjs.Ticker.addEventListener("tick", function(event){
    game.loop(event, input);
  });

  //engine = new Engine("gameCanvas", {}, 60);
  //engine.start();


  /*
	$(document).mousemove(function( event ) {
    //$("#debug").text(event.clientX + "," + event.clientY);
    var moveX = event.clientX - mouse.x;
    var moveY = event.clientY - mouse.y;
    if(moveWindow){
      var currentX = $("#help_dialog").css("left");
      console.log(currentX);
      var currentY = $("#help_dialog").css("top");
      $("#help_dialog").css({
        left: '+=' + moveX + 'px',
        top: '+=' + moveY + 'px'
      });
    }
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
*/

}


HTMLProgressElement.prototype.update = function(value){
  this.value = value;
  var percentString = Math.round(this.position*100).toString() + "%";
  this.innerHTML = percentString;
  this.setAttribute("data-display", percentString);
};

