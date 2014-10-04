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
		/*this.x = x;
		this.y = y;*/
		this.position = new app.Vector(x, y);
<<<<<<< HEAD
		this.size = new app.Vector(30,80);
		this.width = 30;
		this.height = 80;
=======
		this.size = new app.Vector(120,160);
>>>>>>> ff85fee757c58415d1560523c3c637c65c9cf081
		this.speed = 120;
		this.side = side;
		this.weaponType = weaponType;
		this.weapon = undefined;
		this.active = true;
		
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
	
	p.getPosition = 
	
	//Soldier Draw Method
	p.draw = function(ctx) 
	{
<<<<<<< HEAD
		//test to see if there is an image and draw accordingly
		if(!this.image){
			app.DrawLib.drawRect(ctx,this.color,this.position,this.size,0);
		} else{ 
			app.DrawLib.drawImage(this.img,this.vector.x - halfW,this.vector.y - halfH,this.width,this.height,0);
=======
		ctx.save();
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var center = new app.Vector(this.size.x/2,this.size.y/2);
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			app.DrawLib.drawRect(ctx,this.color,this.position.difference(center),center,0);
			
		} else{
			app.DrawLib.drawImage(this.img, 0, 0, 10, 10, this.position.difference(center), center, 0);
>>>>>>> ff85fee757c58415d1560523c3c637c65c9cf081
		}//if image
	};//draw
	
	//Soldier update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		if(this.side == "left")
		{
			this.position.x += this.speed * dt;
		}
		
		if(this.Weapon);
		
		if(this.position.x > 1600)
		{
			this.active = false;
		}
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.vector.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Soldier;
	
}();//end of Soldier.js
