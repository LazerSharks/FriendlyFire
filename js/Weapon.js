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

//Weapon.js is the "class" for our Weapon objects

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the "IIFE"/Class for the Weapon
app.Weapon = function()
{

	//Weapon constructor
	function Weapon(image,x,y,weaponType) 
	{
		// Instance variables of Weapon
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 30;
		this.speed = 240;
		this.weaponType = weaponType;
		
		//set the image and default "backup" color
		this.image = image;
		this.color = "green";
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Weapon.prototype;
	
	//Weapon Draw Method
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
	
	//Weapon update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		if(this.side == "left")
		{
			this.x += this.speed * dt;
		}
		
		if(this.Weapon);
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Weapon;
	
}();//end of Weapon.js
