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
		this.size = new app.Vector(120,160);
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
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			app.DrawLib.drawRect(ctx,this.color,this.position,this.size,0);
		} else{
			app.DrawLib.drawImage(this.img, 0, 0, 10, 10, this.position.difference(center), center, 0);
		}//if image
		
		ctx.restore();
	};//draw
	
	//Player update function, takes delta time(time since last frame) as a param
	p.update = function(dt) 
	{
		//Handle keyboard input
		//move left and right
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT])
		{
			this.position.x -= this.speed * dt;
		}//if left
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT])
		{
			this.position.x += this.speed * dt;
		}//if right
		
		
		//switch weapons
		window.addEventListener("keydown", function(e){
			if(e.keyCode == this.app.KEYBOARD.KEY_UP){
				this.currentWeaponIndex++;
				switchWeapons(this);
			}
			if(e.keyCode == this.app.KEYBOARD.KEY_DOWN){
				this.currentWeaponIndex--;
				switchWeapons(this);
			}
		});
		
	};//update
	
	// private
	function inBounds(obj) {
		return obj.position.y <= obj.canvasHeight + obj.size.y * 0.5;
	};//in bounds
	
	function switchWeapons(obj){
		if(obj.currentWeaponIndex == -1){obj.currentWeaponIndex = 2;}
		else if(obj.currentWeaponIndex == 3){obj.currentWeaponIndex = 0;}
		else if(obj.currentWeaponIndex == 0){obj.color = "red";}
		else if(obj.currentWeaponIndex == 1){obj.color = "green";}
		else if(obj.currentWeaponIndex == 2){obj.color = "blue";}
	};
	
	return Player;
	
}();//end of Player.js
