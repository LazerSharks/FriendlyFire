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
		this.active = true;
		this.dead = false;
		
		//set the image and default "backup" color
		this.image = image;
		
		switch(weaponType)
		{
			case "spear":
				this.color = "yellow";
				break;
			case "mace":
				this.color = "green";
				break;
			case "axe":
				this.color = "blue";
				break;
			case "sword":
				this.color = "red";
				break;
		}
		
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Soldier.prototype;
	
	p.setWeapon = function(weapon)
	{
		this.weapon = weapon;
		this.color = "purple";
	};
	
	p.die = function()
	{
		this.dead = true;
		this.active = false;
		this.color = "black";
	};
	
	p.getWeaponType = function(){return this.weaponType;};
	
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
		console.log("i am here");
		ctx.restore();
	};//draw
	
	p.colliding = function(gameObject)
	{
		return(gameObject.position.x < this.position.x + this.size.x &&
			gameObject.position.x + gameObject.size.x > this.position.x &&
			gameObject.position.y < this.position.y + this.size.y &&
			gameObject.position.y + gameObject.size.y > this.position.y)
	}
	
	//Soldier update function, takes delta time(time since last frame) as a param
	p.update = function(dt,ctx) 
	{
	
		if(!this.dead)
		{
			if(this.side == "left")
			{
				this.position.x += this.speed * dt;
			}
			
			if(this.position.x > 1600 || this.position.x < 0)
			{
				this.active = false;
			}
			
			if(this.weapon)
			{
				console.log(this.weapon);
			}
			
			this.draw(ctx);
		}
		
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.vector.y <= obj.canvasHeight + obj.height * 0.5;
	};//in bounds
	
	return Soldier;
	
}();//end of Soldier.js
