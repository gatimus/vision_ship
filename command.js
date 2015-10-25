/**
 * --
 * @class Command
 */
function Command(){
	//
}
/**
 * --
 * @class Command
 * @pram {Actor} actor
 */
Command.prototype.execute = function(actor) {
	//
};


/**
 * --
 * @class Move
 */
function Move(x, y){
	Command.call(this);
	this.x = x;
	this.y = y;
}
Move.prototype = Object.create(Command.prototype);
/**
 * --
 * @class Move
 * @pram {Actor} actor
 */
Move.prototype.execute = function(actor) {
	actor.move(this.x, this.y);
};


/**
 * --
 * @class Action
 */
function Action(code){
	Command.call(this);
	this.code = code;
}
Action.prototype = Object.create(Command.prototype);
/**
 * --
 * @class Action
 * @pram {Actor} actor
 */
Action.prototype.execute = function(actor) {
	actor.action(this.code);
};