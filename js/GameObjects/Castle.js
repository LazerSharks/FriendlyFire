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
app.Castle = function () {

	//Soldier constructor
	function Castle(image, position, size, side) {
		// Instance variables of Soldier
        this.image = image;
		this.position = position;
        this.size = size;
		this.side = side;
        
		this.fighting = false;
		this.active = true;
		this.dead = false;
        
		this.health = 10000;
		this.maxHealth = this.health;
		
		this.strength = 20;
		this.color = "grey";
        
	}//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Castle.prototype;
	
	p.die = function () {
		this.dead = true;
		this.active = false;
		this.color = "black";
	};
	
	p.isDead = function () { return this.dead; };
	
	p.setFighting = function (fight) {
		this.fighting = fight;
	};
	
	p.getSide = function () { return this.side; };
	
	
	p.attack = function () {
        return this.strength;
	};
	
	p.takeDamage = function (damage) {
		this.health -= damage;
		if (this.health <= 0) { this.die(); }
	};
	
	//Soldier Draw Method
	p.draw = function () {
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var center = new app.Vector(this.size.x / 2, this.size.y / 2);
		
		//test to see if there is an image and draw accordingly
		if (!this.image) {
			app.DrawLib.drawRect(this.color, this.position, this.size, 0);
			app.DrawLib.debugRect(this);
			
		} else {
			app.DrawLib.drawImage(this.img, 0, 0, 10, 10, this.position.difference(center), center, 0);
		}
		if (this.health > 0) {
			this.drawHealthBar();
		}
	};//draw
	
	p.drawHealthBar = function () {
		var barPos = new app.Vector(this.position.x, this.position.y);
		app.DrawLib.drawRect("red", barPos, new app.Vector(5, this.size.x * this.health / 1200), 0);

	}
	
	p.colliding = function (gameObject) {
		return (gameObject.position.x < this.position.x + this.size.x &&
                gameObject.position.x + gameObject.size.x > this.position.x &&
                gameObject.position.y < this.position.y + this.size.y &&
                gameObject.position.y + gameObject.size.y > this.position.y);
	};
	
	//set the castle's health to max
	p.respawn = function()
	{
		this.health = this.maxHealth;
		this.dead = false;
		this.color = "grey";
	}
    
    
	p.update = function (dt) {
		
		
	};//update
	  
	  
	// private
	//in bounds
	
	return Castle;
	
}(); //end of Soldier.js