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
        this.image = app.IMAGES.Castle;
		this.position = position;
        this.size = size;
		this.collider = size;
		this.side = side;
        
		this.fighting = false;
		this.active = true;
		this.dead = false;
        
		this.health = 10000;
		this.maxHealth = this.health;
		
		this.strength = 20;
		this.color = "grey";
		this.invincible = false;
        
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
		if (!this.invincible) {
			this.health -= damage;
			if (this.health <= 0) { this.die(); }
		}
	};
	
	//Soldier Draw Method
	p.draw = function () {
		
        var bottom;
        var top;
        var size = new app.Vector(225, 450);
        
        var image = new Image();
        image.src = this.image;
		if (this.side == "left") {
            bottom = new app.Vector(0, this.position.y + this.size.y / 8);
            top = new app.Vector(0, this.position.y - this.size.y / 4);
            app.DrawLib.drawImage(image, 0, 0, 297, 646, top, size, 0, false);
            app.DrawLib.drawImage(image, 0, 0, 297, 646, bottom, size, 0, false);
        } else {
            bottom = new app.Vector(1600, this.position.y + this.size.y / 8);
            top = new app.Vector(1600, this.position.y - this.size.y / 4);
            app.DrawLib.drawImage(image, 0, 0, 297, 646, top, size, 0, false);
            app.DrawLib.drawImage(image, 0, 0, 297, 646, bottom, size, 0, false);
        }
        
        
		if (this.health > 0 && !this.invincible) {
			this.drawHealthBar();
		}
	};//draw
	
	p.drawHealthBar = function () {
			var barPos
		if (this.side == "left") {
			barPos = new app.Vector(400, 50);
		} else {
			barPos = new app.Vector(1200, 50);
		}
		app.DrawLib.drawRect("red", barPos, new app.Vector(this.health / 24, 10), 0);

	};
	
	p.colliding = function (gameObject) {
		return (gameObject.position.x < this.position.x + this.size.x &&
                gameObject.position.x + gameObject.size.x > this.position.x &&
                gameObject.position.y < this.position.y + this.size.y &&
                gameObject.position.y + gameObject.size.y > this.position.y);
	};
	
	//set the castle's health to max
	p.respawn = function () {
		this.health = this.maxHealth;
		this.dead = false;
		this.color = "grey";
	};
    
    
	p.update = function (dt) {
		
		
	};//update
	  
	  
	// private
	//in bounds
	
	return Castle;
	
}(); //end of Soldier.js