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

//Soldier.js is the "class" for our soldier objects

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the "IIFE"/Class for the Soldier
app.Soldier = function()
{

	//Soldier constructor
	function Soldier(image,x,y,size,side,weaponType) 
	{
		// Instance variables of Soldier
		this.position = new app.Vector(x, y);
		this.size = size;
		this.speed = 120;
		this.side = side;
		this.weaponType = weaponType;
		this.weapon = undefined;
		
		//set the image and default "backup" color
		this.image = image;
		this.color = "red";
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Soldier.prototype;
	
	p.setWeapon = function(weapon)
	{
		this.weapon = weapon;
		this.color = "red";
	}
	
	//p.getPosition = 
	
	//Soldier Draw Method
	p.draw = function(ctx) 
	{
		//console.log("Soldier Draw");
		ctx.save();
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var center = new app.Vector(this.size.x/2,this.size.y/2);
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			app.DrawLib.drawRect(ctx,this.color,this.position,this.size,0);
			app.DrawLib.debugRect(ctx, this);
			
		} else{
			app.DrawLib.drawImage(this.img, 0, 0, 10, 10, this.position.difference(center), center, 0);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Soldier update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		if(this.side == "left")
		{
			this.position.x += this.speed * dt;
		}
		
		if(this.Weapon);
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.vector.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Soldier;
	
}();//end of Soldier.js
