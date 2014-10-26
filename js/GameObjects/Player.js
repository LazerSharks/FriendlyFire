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
	function Player(image, side) {
		// Instance variables of Player
        this.side = side;
        if (side == "left") {
		  this.position = new app.Vector(400, 800);
		  this.startPosition = new app.Vector(400, 800);
        } else {
		  this.position = new app.Vector(1200, 800);
		  this.startPosition = new app.Vector(1200, 800);
        }
		this.size = new app.Vector(100, 105);
		this.speed = 320;
		this.activeWeapons = [];
		
		//set the image and default "backup" color
		this.image = app.IMAGES.Blacksmith;
		this.weaponImage = app.IMAGES.Spear;
        
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
        
		
		var image = new Image();
		image.src = this.image;
		//test to see if there is an image and draw accordingly
        app.DrawLib.drawImage(image, 0, 0, 120, 125, this.position, this.size, 0, false);//if image
		var weaponSize = new app.Vector(40,120);
		var weaponPos = new app.Vector(this.position.x,this.position.y + 20);
		var weaponImage = new Image();
		weaponImage.src = this.weaponImage;
        app.DrawLib.drawImage(weaponImage, 0, 0, 140, 320, weaponPos, weaponSize, -Math.PI/2, false);//if image
		
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
        if(this.side == "left") {
		  this.position.x = clamp(this.position.x, 100 + (this.size.x/2) ,800 - this.size.x/2);
        } else {
		  this.position.x = clamp(this.position.x, 800 + (this.size.x/2) ,1500 - this.size.x/2);
        }
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
				this.weaponImage = app.IMAGES.Spear;
				this.currentWeaponUpgrade = this.spearUpgrade;
				break;
			case 1:
				this.color = "green";
				this.weaponType = "mace";
				this.weaponImage = app.IMAGES.Mace;
				this.currentWeaponUpgrade = this.maceUpgrade;
				break;
			case 2:
				this.color = "blue";
				this.weaponType = "axe";
				this.weaponImage = app.IMAGES.Axe;
				this.currentWeaponUpgrade = this.axeUpgrade;
				break;
			case 3:
				this.color = "red";
				this.weaponType = "sword";
				this.weaponImage = app.IMAGES.Sword;
				this.currentWeaponUpgrade = this.swordUpgrade;
				break;
		}
	};
	
    p.controller = function(dt) {
        if(this.side == "left") {
            //handle movement left and right
            if(app.keydown[app.KEYBOARD.KEY_A]) {
                this.move("left", dt);
            }
            if(app.keydown[app.KEYBOARD.KEY_D]) {
                this.move("right", dt);
            }


            //switch weapon and prevent the player from holding down the switch buttons
            if((app.keyPress[this.app.KEYBOARD.KEY_S])) {
                this.switchWeapons("down");
            }
            if((this.app.keyPress[this.app.KEYBOARD.KEY_W])) {
                this.switchWeapons("up");
            }

            //throw a weapon
            if(this.app.keyPress[this.app.KEYBOARD.KEY_Q] || this.app.keyPress[this.app.KEYBOARD.KEY_E]) {
                this.throwWeapon();
            }
        } else {
            //handle movement left and right
            if(app.keydown[app.KEYBOARD.KEY_J]) {
                this.move("left", dt);
            }
            if(app.keydown[app.KEYBOARD.KEY_L]) {
                this.move("right", dt);
            }


            //switch weapon and prevent the player from holding down the switch buttons
            if((app.keyPress[this.app.KEYBOARD.KEY_K])) {
                this.switchWeapons("down");
            }
            if((this.app.keyPress[this.app.KEYBOARD.KEY_I])) {
                this.switchWeapons("up");
            }

            //throw a weapon
            if(this.app.keyPress[this.app.KEYBOARD.KEY_U] || this.app.keyPress[this.app.KEYBOARD.KEY_O]) {
                this.throwWeapon();
            }
        }
    }
    
	//create a new weapon to the active weapons array
	p.throwWeapon = function() {
		this.activeWeapons.push(new app.Weapon(new app.Vector(this.position.x,this.position.y), this.weaponType, new app.Vector(40,120), this.currentWeaponUpgrade));
	};
	
	// private
	function inBounds(obj) {
		return obj.position.y <= obj.canvasHeight + obj.size.y * 0.5;
	};//in bounds
	
	return Player;
	
}();//end of Player.js
