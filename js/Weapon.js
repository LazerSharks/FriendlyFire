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
	function Weapon(x,y,weaponType, size) 
	{
		// Instance variables of Weapon
		this.position = new app.Vector(x, y);
		this.size = new app.Vector(size.x, size.y);
		this.speed = 240;
		this.weaponType = weaponType;
		
		//set the image and default "backup" color
		switch(weaponType)
		{
			case "sword":
				this.color = "red";
				break;
			case "axe":
				this.color = "blue";
				break;
			case "mace":
				this.color = "green";
				break;
			case "spear":
				this.color = "yellow";
				break;
		}
		
		//this.image = image;
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Weapon.prototype;
	
	//Weapon Draw Method
	p.draw = function(ctx) 
	{
	console.log("Drawn weapon");
		ctx.save();
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var halfW = this.size.x/2;
		var halfH = this.size.y/2;
		
		//test to see if there is an image and draw accordingly
		if(!this.image){			
			app.DrawLib.drawRect(ctx,this.color,this.position.x - halfW,this.position.y - halfH,this.width,this.height,0);
			app.DrawLib.debugRect(ctx, this);
		} 
		else{
			app.DrawLib.drawImage(this.img,this.position.x - halfW,this.position.y - halfH,this.width,this.height,0);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Weapon update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		this.position.y -= this.speed * dt;
		
		if(this.Weapon);
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Weapon;
	
}();//end of Weapon.js
