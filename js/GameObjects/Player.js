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
app.Player = function () {
    
	//Player constructor
	function Player(image, x, y) {
		// Instance variables of Player
		this.position = new app.Vector(x, y);
		this.size = new app.Vector(60, 80);
		this.speed = 320;
		this.activeWeapons = [];
		
		//set the image and default "backup" color
		this.image = image;
        
		this.currentWeaponIndex = 0;
		this.weaponType = "spear";
		this.color = "yellow";
        
		this.currentWeaponUpgrade = 0;
		this.swordUpgrade = 0;
		this.spearUpgrade = 0;
		this.maceUpgrade = 0;
		this.axeUpgrade = 0;
		
	}//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Player.prototype;
	
	// ** p.app is set in loader.js **
	
	p.getActiveWeapons = function () {
		return this.activeWeapons;
	};
	
	p.setAxeUpgrade = function (upgrade) {
		this.axeUpgrade = upgrade;
	};
	
	p.setSwordUpgrade = function (upgrade) {
		this.swordUpgrade = upgrade;
	};
	
	p.setSpearUpgrade = function (upgrade) {
		this.spearUpgrade = upgrade;
	};
	
	p.setMaceUpgrade = function (upgrade) {
		this.maceUpgrade = upgrade;
	};
	
	//Player Draw Method
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
		}//if image
		
		for (var i = 0; i < this.activeWeapons.length; i++)
		{
			this.activeWeapons[i].draw();
		}
	};//draw
	
	//Player update function, takes delta time(time since last frame) as a param
	p.update = function(dt) {
        //manage player input
        this.controller(dt);
        
        //update all weapons
		for(var i = 0; i < this.activeWeapons.length; i++) {
			this.activeWeapons[i].update(dt);
		}
        //remove weapons that have been disabled
		this.activeWeapons = this.activeWeapons.filter(function(weapon){return weapon.thrown;});
		
	};//update
	
	//input methods
	//move player - takes a string representing the key input for direction and delta time
	p.move = function(direction, dt) {
		if(direction == "left") {
			this.position.x -= this.speed * dt;
		} else if (direction == "right") {
			this.position.x += this.speed * dt;
		}
		
		//this.position.x = clamp(this.position.x, 10 + this.size.x ,800 - this.size.x);
		this.position.x = clamp(this.position.x, 100 + (this.size.x/2) ,800 - this.size.x/2);
	}
	
	//switch weapons - takes a string representing the key input
    
	p.switchWeapons = function(input) {
		if(input == "up") {
			this.currentWeaponIndex++;
			
			//loop the index if it's greater than 3
			if(this.currentWeaponIndex > 3) {
				this.currentWeaponIndex = 0;
			}
		} else if (input =="down") {
			this.currentWeaponIndex--;
			
			//loop the index if it's less than 0
			if(this.currentWeaponIndex < 0) {
				this.currentWeaponIndex = 3;
			}
		}
		
		//sets the color based on the weapon index
		switch(this.currentWeaponIndex) {
			case 0:
				this.color = "yellow";
				this.weaponType = "spear";
				this.currentWeaponUpgrade = this.spearUpgrade;
				break;
			case 1:
				this.color = "green";
				this.weaponType = "mace";
				this.currentWeaponUpgrade = this.maceUpgrade;
				break;
			case 2:
				this.color = "blue";
				this.weaponType = "axe";
				this.currentWeaponUpgrade = this.axeUpgrade;
				break;
			case 3:
				this.color = "red";
				this.weaponType = "sword";
				this.currentWeaponUpgrade = this.swordUpgrade;
				break;
		}
	};
	
    p.controller = function(dt) {
        
        //handle movement left and right
        if(app.keydown[app.KEYBOARD.KEY_LEFT] || app.keydown[app.KEYBOARD.KEY_A]) {
			this.move("left", dt);
        }
		if(app.keydown[app.KEYBOARD.KEY_RIGHT] || app.keydown[app.KEYBOARD.KEY_D]) {
			this.move("right", dt);
		}
        
        
		//switch weapon and prevent the player from holding down the switch buttons
		if((app.keyPress[app.KEYBOARD.KEY_DOWN] || app.keyPress[this.app.KEYBOARD.KEY_S])) {
			this.switchWeapons("down");
		}
		if((this.app.keyPress[this.app.KEYBOARD.KEY_UP] || this.app.keyPress[this.app.KEYBOARD.KEY_W])) {
			this.switchWeapons("up");
		}
        
        //throw a weapon
		if(this.app.keyPress[this.app.KEYBOARD.KEY_SPACE]) {
			this.throwWeapon();
		}
    }
    
	//create a new weapon to the active weapons array
	p.throwWeapon = function() {
		this.activeWeapons.push(new app.Weapon(new app.Vector(this.position.x,this.position.y), this.weaponType, new app.Vector(20,60), this.currentWeaponUpgrade));
	};
	
	// private
	function inBounds(obj) {
		return obj.position.y <= obj.canvasHeight + obj.size.y * 0.5;
	};//in bounds
	
	return Player;
	
}();//end of Player.js
