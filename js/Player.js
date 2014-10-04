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
		this.position = new app.Vector(x, y);
		this.size = new app.Vector(30,80);
		this.speed = 240;
		
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
		var center = new app.Vector(this.size.x/2,this.size.y/2);
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			app.DrawLib.drawRect(ctx,this.color,this.position.difference(center),center,0);
			
		} else{
			app.DrawLib.drawImage(this.img,this.position.x - halfW,this.position.y - halfH,this.width,this.height,0);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Player update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		//Handle keyboard input
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT])
		{
			this.position.x -= this.speed * dt;
		}//if left
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT])
		{
			this.position.x += this.speed * dt;
		}//if right
		
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.position.y <= obj.canvasHeight + obj.size.y * 0.5;
	};//in bounds
	
	return Player;
	
}();//end of Player.js
