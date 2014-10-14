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
app.Weapon = function () {

	//Weapon constructor
	function Weapon(position, weaponType, size, upgrade) {
		// Instance variables of Weapon
		this.position = position;
		this.size = size;
		this.soldier = undefined;
		this.speed = 480;
		this.weaponType = weaponType;
		this.thrown = true;
		this.held = false;
		this.strength = 5;
		this.upgrade = upgrade || 0;
		
		//set the image and default "backup" color
		switch (weaponType) {
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
		
	} //constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Weapon.prototype;
	
	p.getWeaponType = function () {return this.weaponType; };
	
	p.getStrength = function () {return this.strength + this.upgrade; };
	
	p.wasCaught = function () {
		this.thrown = false;
		this.held = true;
	};
	
	//Weapon Draw Method
	p.draw = function (ctx) {
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var center = new app.Vector(this.size.x / 2, this.size.y / 2);
		
		//test to see if there is an image and draw accordingly
		if (!this.image) {
			app.DrawLib.drawRect(this.color, this.position, this.size, 0);
			app.DrawLib.debugRect(this);
		} else {
			app.DrawLib.drawImage(this.img, this.position.x - center.x, this.position.y - center.y, this.width, this.height, 0);
		}//if image 
	};//draw
	
	//Weapon update function, takes delta time(time since last frame) as a param
	p.update = function (dt) {
		if (this.thrown) { this.position.y -= this.speed * dt; }
		
		if (this.position.y < 0 && this.thrown) { this.thrown = false; }
			
		
	};//update
	
	return Weapon;
	
}();//end of Weapon.js
