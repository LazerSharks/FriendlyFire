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
	function Soldier(image,x,y,side,weaponType) 
	{
		// Instance variables of Soldier
		this.x = x;
		this.y = y;
		this.width = 30;
		this.height = 80;
		this.speed = 120;
		this.side = side;
		this.weaponType = weaponType;
		this.weapon = undefined;
		
		//set the image and default "backup" color
		this.image = image;
		this.color = "green";
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Soldier.prototype;
	
	p.setWeapon = function(weapon)
	{
		this.weapon = weapon;
		this.color = "red";
	}
	
	p.getPosition = 
	
	//Soldier Draw Method
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
	
	//Soldier update function, takes delta time(time since last frame) as a param
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
	
	return Soldier;
	
}();//end of Soldier.js
