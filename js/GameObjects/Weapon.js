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
		this.collider = new app.Vector(20, 80);
		this.soldier = undefined;
		this.speed = 480;
		this.weaponType = weaponType;
		this.thrown = true;
		this.held = false;
		this.strength = 5;
		this.upgrade = upgrade || 0;
		this.image = new Image();
		
		//set the image and default "backup" color
		switch (weaponType) {
        case "sword":
            this.color = "red";
			this.image.src = app.IMAGES.Sword;
            break;
        case "axe":
            this.color = "blue";
			this.image.src = app.IMAGES.Axe;
            break;
        case "mace":
            this.color = "green";
			this.image.src = app.IMAGES.Mace;
            break;
        case "spear":
            this.color = "yellow";
			this.image.src = app.IMAGES.Spear;
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
			app.DrawLib.drawImage(this.image,0,0,140,320, this.position, this.size, 0,false);
		}//if image 
	};//draw
	
	//Weapon update function, takes delta time(time since last frame) as a param
	p.update = function (dt) {
		if (this.thrown) { this.position.y -= this.speed * dt; }
		
		if (this.position.y < 0 && this.thrown) { this.thrown = false; }
			
		
	};//update
	
	return Weapon;
	
}();//end of Weapon.js
