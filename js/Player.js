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
	function Player(image, x, y, size) 
	{
		// Instance variables of Player
		this.position = new app.Vector(x, y);
		this.size = size;
		this.speed = 320;
		
		//set the image and default "backup" color
		this.image = image;
		this.currentWeaponIndex = 0;
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
			app.DrawLib.drawRect(ctx,this.color,this.position,this.size,0);
			app.DrawLib.debugRect(ctx, this);
			
		} else{
			app.DrawLib.drawImage(this.img, 0, 0, 10, 10, this.position.difference(center), center, 0);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Player update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{

	};//update
	
	//input methods
	//move player - takes a string representing the key input for direction and delta time
	p.move = function(direction, dt)
	{
		if(direction == "left")
		{
			this.position.x -= this.speed * dt;
		}
		else if (direction == "right")
		{
			this.position.x += this.speed * dt;
		}
	}
	
	//switch weapons - takes a string representing the key input
	p.switchWeapons = function(input)
	{
		if(input == "up")
		{
			this.currentWeaponIndex++;
			
			//loop the index if it's greater than 3
			if(this.currentWeaponIndex > 3)
			{
				this.currentWeaponIndex = 0;
			}
		}
		else if (input =="down")
		{
			this.currentWeaponIndex--;
			
			//loop the index if it's less than 0
			if(this.currentWeaponIndex < 0)
			{
				this.currentWeaponIndex = 3;
			}
		}
		
		//log the weapon index to the console
		console.log("Weapon Index: " + this.currentWeaponIndex);
		
		//sets the color based on the weapon index
		switch(this.currentWeaponIndex)
		{
			case 0:
				this.color = "yellow";
				break;
			case 1:
				this.color = "green";
				break;
			case 2:
				this.color = "blue";
				break;
			case 3:
				this.color = "red";
				break;
		}
	}
	
	/*
		p.throwWeapon()
		{
		
		}
	*/
	
	// private
	function inBounds(obj) {
		return obj.position.y <= obj.canvasHeight + obj.size.y * 0.5;
	};//in bounds
	
	return Player;
	
}();//end of Player.js
