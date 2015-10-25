/**
 * --
 * @class Input
 */
function Input(){
	this.keyBoard = {};
	this.mouse = {
		x: 0,
		y: 0,
		moveX: 0,
		moveY: 0,
		buttons: {}
	};
	this.gamePads = {};
	this.gamePadSensitivity = 0.25;
}

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onKeyDown = function(event) {
	this.keyBoard[event.keyCode] = true;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onKeyUp = function(event) {
	this.keyBoard[event.keyCode] = false;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onMouseMove = function(event) {
	this.mouse.moveX = event.clientX - this.mouse.x;
	this.mouse.moveY = event.clientY - this.mouse.y;
	this.mouse.x = event.clientX;
	this.mouse.y = event.clientY;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onMouseDown = function(event) {
	this.mouse.buttons[event.button] = true;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.onMouseUp = function(event) {
	this.mouse.buttons[event.button] = false;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.gamePadConnected = function(event) {
	this.gamePads[event.gamepad.index] = event.gamepad;
};

/**
 * --
 * @class Input
 * @pram {Object} event
 */
Input.prototype.gamePadDisconnected = function(event) {
	delete this.gamePads[event.gamepad.index];
};

/**
 * --
 * @class Input
 */
Input.prototype.getGamepads = function() {
	this.gamePads = navigator.getGamepads();
	this.senseAxes();
};

/**
 * --
 * @class Input
 */
Input.prototype.senseAxes = function() {
	for(var g = 0; g < 	this.gamePads.length; g++){
	  if(typeof this.gamePads[g] != 'undefined'){
  	  this.gamePads[g].sensedAxes = new Array(this.gamePads[g].axes.length);
  	  for(var a = 0; a < this.gamePads[g].axes.length; a++){
  	    this.gamePads[g].sensedAxes[a] = {
  	      value: this.gamePads[g].axes[a],
  	      pressed: Math.abs(this.gamePads[g].axes[a]) > this.gamePadSensitivity
  	    };
  	  }
	  }
	}
};

/**
 * --
 * @class Input
 * @return
 */
Input.prototype.handleInput = function() {
	this.getGamepads();
	var commands = [];
	var x = 0;
	var y = 0;
	
	if(typeof this.gamePads[0] != 'undefined') { //Use Gamepad
	  var gamePad = this.gamePads[0];
	  
	  //Dpad
	  if(gamePad.buttons[12].pressed) y = -1; //   UP
	  if(gamePad.buttons[14].pressed) x = -1; // LEFT
	  if(gamePad.buttons[13].pressed) y =  1; // DOWN
	  if(gamePad.buttons[15].pressed) x =  1; //RIGHT
	  
	  //Left Thumb Stick
	  if(gamePad.sensedAxes[0].pressed) x = gamePad.sensedAxes[0].value; //LEFT-RIGHT
	  if(gamePad.sensedAxes[1].pressed) y = gamePad.sensedAxes[1].value; //UP  - DOWN
	  
	  //Left Thumb Stick Adjusted
	  /*
	  if(gamePad.sensedAxes[0].pressed) { //LEFT-RIGHT
	    var xAdjust = Math.sqrt(1-Math.pow(gamePad.sensedAxes[1].value,2));
	    if(xAdjust > 0){
	      x = gamePad.sensedAxes[0].value / xAdjust;
	    } else {
	      x = gamePad.sensedAxes[0].value;
	    }
	  }
	  if(gamePad.sensedAxes[1].pressed) { //UP  - DOWN
	    var yAdjust = Math.sqrt(1-Math.pow(gamePad.sensedAxes[0].value,2));
	    if(yAdjust > 0){
	      y = gamePad.sensedAxes[1].value / yAdjust;
	    } else {
	      y = gamePad.sensedAxes[1].value;
	    }
	  }
	  */

    //Buttons
		if(gamePad.buttons[0].pressed){
			commands.push(new Action(0));
		} else if(gamePad.buttons[1].pressed){
			commands.push(new Action(1));
		}
		
	} else {                                     //Use Keyboard
	
	  //Direction
		if(this.keyBoard[KEY.UP]    || this.keyBoard[KEY.W]) y = -1; //   UP
		if(this.keyBoard[KEY.LEFT]  || this.keyBoard[KEY.A]) x = -1; // LEFT
		if(this.keyBoard[KEY.DOWN]  || this.keyBoard[KEY.S]) y =  1; // DOWN
		if(this.keyBoard[KEY.RIGHT] || this.keyBoard[KEY.D]) x =  1; //RIGHT
		
		//Buttons
		if(this.keyBoard[KEY.SPACE]){
			commands.push(new Action(0));
		} else if(this.keyBoard[KEY.Z]){
			commands.push(new Action(1));
		}
		if(this.keyBoard[KEY.ENTER]){
		  commands.push(new Action("start"));
		}
		
	}
	
	//Move
	if(x !== 0 || y !== 0){
			commands.push(new Move(x, y));
	}
	
	return commands;
};

var KEY = {
  ENTER: 13,
  RETURN: 13,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  A: 65,
  D: 68,
  S: 83,
  W: 87,
  Z: 90
};
