/*
	Friendly Fire
	
	Alex Fuerst, 
	Mario Chuman,
	David Erbelding,
	Brian Nugent,
	Ryan Farrell,

	Game Design and Development 2
	10/2/2014

*/

//Player.js is the "class" for our player object

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the "IIFE"/Class for the Player
app.Player = function()
{

	//Player constructor
	function Player(image,x,y) 
	{
		// Instance variables of Player
		this.x = x;
		this.y = y;
		this.width = 30;
		this.height = 80;
		this.speed = 120;
		
		//set the image and default "backup" color
		this.image = image;
		this.color = "yellow";
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Player.prototype;
	
	// ** p.app is set in loader.js **
	
	//Player Draw Method
	p.draw = function(ctx) 
	{
		ctx.save();
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var halfW = this.width/2;
		var halfH = this.height/2;
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
			
		} else{
			ctx.drawImage(this.image,this.x - halfW, this.y - halfH, this.width, this.height);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Player update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		//Handle keyboard input
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT])
		{
			this.x -= this.speed * dt;
		}//if left
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT])
		{
			this.x += this.speed * dt;
		}//if right
		
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Player;
	
}();//end of Player.js
