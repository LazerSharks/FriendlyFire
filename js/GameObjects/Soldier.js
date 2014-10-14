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
app.Soldier = function () {

	//Soldier constructor
	function Soldier(image, position, side, lane, weaponType) {
		// Instance variables of Soldier
		this.position = position;
		this.size = new app.Vector(60, 80);
		this.speed = 120;
		this.side = side;
		this.lane = lane;
		this.weaponType = weaponType;
		this.weapon = undefined;
		this.fighting = false;
		this.active = true;
		this.dead = false;
		this.health = 1000;
		this.strength = 2;
		
		//set the image and default "backup" color
		this.image = image;
		
		switch (weaponType) {
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
		case "enemy":
			this.color = "grey";
			break;
		}
		
	}//constructor
    
	// Prototype for making functions/methods available outside of the class
	var p = Soldier.prototype;
	
	p.setWeapon = function (weapon) {
		this.weapon = weapon;
		this.color = "purple";
		this.speed = 160;
	};
	
	p.die = function () {
		this.dead = true;
		this.active = false;
		this.color = "black";
	};
	
	p.isDead = function () { return this.dead; };
	
	
	p.getSide = function () {return this.side; };
	
	p.getWeaponType = function () {return this.weaponType; };
	
	//p.getPosition = 
	
	p.attack = function () {
		if (this.weapon) {
			//console.log(this.strength + this.weapon.getStrength());
			return this.strength + this.weapon.getStrength();
		} else {
			return this.strength;
		}
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
		
		//this.drawHealthBar();
        
	};//draw
	
	p.drawHealthBar = function () {
		var barPos = new app.Vector(this.position.x, this.position.y - this.size.y*3/4);
		app.DrawLib.drawRect("red", barPos, new app.Vector(this.size.x * this.health / 1000, 5), 0);

	}
	
    p.collisionHandling = function () {
		//----------Soldiers colliding with weapons------------
		var thrownWeapons = app.FriendlyFire.playField.player.getActiveWeapons();
		
		if (this.side == "left") {
			for (var i = 0; i < thrownWeapons.length; i++) { //each weapon
				if (this.colliding(thrownWeapons[i])) { //colliding?
					if (this.getWeaponType() == thrownWeapons[i].getWeaponType()){
						this.setWeapon(thrownWeapons[i]);
						thrownWeapons[i].wasCaught();
					} else {
						this.health = 0;
						this.die();
					}//if right weapon
				}
			}
		}
		
		//----------Soldiers colliding with Soldiers------------
		
		//start without fighting anyone
		
		this.fighting = false;
		
		//check which side we are on
		var opponents;
		if(this.side == "left") {
			opponents = this.lane.rightSoldiers;
		} else {
			opponents = this.lane.leftSoldiers;
		}
		
		//attack the first enemy you collide with
		for(var i = 0; i < opponents.length; i++) {
			var enemy = opponents[i];
			if (this.colliding(enemy)) {
				this.fighting = true;
				enemy.takeDamage(this.attack());
				break;
			}
		}
		
		
		
		//---------------------Soldiers colliding with Castle----------------------//
		
		var castle;
		if(this.side == "left") {
			castle = this.lane.playField.rightCastle;
		} else {
			castle = this.lane.playField.leftCastle;
		}
		
		if (this.colliding(castle)) {
			this.fighting = true;
			castle.takeDamage(this.attack());
			this.takeDamage(castle.attack());
		}
	};
	
	
	p.colliding = function (gameObject) {
		if(gameObject.position.x - gameObject.size.x / 2 > this.position.x + this.size.x / 2 ||
		   gameObject.position.x + gameObject.size.x / 2 < this.position.x - this.size.x / 2 ||
           gameObject.position.y - gameObject.size.y / 2 > this.position.y + this.size.y / 2 ||
           gameObject.position.y + gameObject.size.y / 2 < this.position.y - this.size.y / 2) {
			return false;
		} else {
			return true;
		}
	};
	
    
	//Soldier update function, takes delta time(time since last frame) as a param
	p.update = function (dt) {
	
		if (!this.dead && !this.fighting) {
            
            //move
			if (this.side == "left") {
				this.position.x += this.speed * dt;
			} else {
				this.position.x -= this.speed * dt;
			}
			
            
            //get removed if moving off screen
			if (this.position.x > 1600 || this.position.x < 0) {
				this.active = false;
			}
			if (this.weapon) {
				//console.log(this.weapon);
			}
        }
        
		//check for collisions
		this.collisionHandling();
            
	};//update
	  
	  
	// private
	function inBounds(obj) {
		return obj.vector.y <= obj.canvasHeight + obj.height * 0.5;
	}//in bounds
	
	return Soldier;
	
}();//end of Soldier.js
