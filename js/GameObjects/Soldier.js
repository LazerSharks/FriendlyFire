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
	function Soldier(image, position, side, lane, weaponType, endlessMode) {
		// Instance variables of Soldier
		this.position = position;
		this.size = new app.Vector(97, 80);
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
		this.endlessMode = endlessMode;
		this.grave = new Image();
		this.grave.src = app.IMAGES.Tombstone;
		
		this.weaponWalkFrame = 7;
		this.weaponlessWalkFrame = 7;
		this.weaponFightFrame = 5;
		this.weaponlessFightFrame = 7;
		
		//set the image and default "backup" color
		this.image = image;
		
		switch (weaponType) {
        case "spear":
            this.color = "yellow";
			this.walk = new app.Animation(app.IMAGES.YellowWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessWalkFrame, 1.2);
            this.fight = new app.Animation(app.IMAGES.YellowAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessFightFrame, 1.2);
			break;
        case "mace":
            this.color = "green";
			this.walk = new app.Animation(app.IMAGES.GreenWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessWalkFrame, 1.2);
            this.fight = new app.Animation(app.IMAGES.GreenAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessFightFrame, 1.2);
			break;
        case "axe":
            this.color = "blue";
			this.walk = new app.Animation(app.IMAGES.BlueWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessWalkFrame, 1.2);
			this.fight = new app.Animation(app.IMAGES.BlueAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessFightFrame, 1.2);
            break;
        case "sword":
            this.color = "red";
			this.walk = new app.Animation(app.IMAGES.RedWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessWalkFrame, 1.2);
            this.fight = new app.Animation(app.IMAGES.RedAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessFightFrame, 1.2);
			break;
		case "enemy":
			this.color = "grey";
			this.walk = new app.Animation(app.IMAGES.EnemyWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessWalkFrame, 1.2);
			this.fight = new app.Animation(app.IMAGES.EnemyAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponlessFightFrame, 1.2);
			break;
		}
		
	}//constructor
    
	// Prototype for making functions/methods available outside of the class
	var p = Soldier.prototype;
	
	p.setWeapon = function (weapon) {
		this.weapon = weapon;
		//this.color = "purple";
		this.speed = 160;
	};
	
	p.die = function () {
		this.dead = true;
		this.active = false;
		this.color = "black";
		this.lane.playField.totalDeaths++;
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
		if(!this.dead)
		{
			if (!this.walk) {
				app.DrawLib.drawRect(this.color, this.position, this.size, 0);
				app.DrawLib.debugRect(this);
			} else if(this.walk && !this.fighting){
				if (this.side == "left") {
					this.walk.draw(this.position, this.size, this.rotation, false);
				} else {
					this.walk.draw(this.position, this.size, this.rotation, true);
				}
			} else if(this.fight && this.fighting){
				if (this.side == "left") {
					this.fight.draw(this.position, this.size, this.rotation, false);
				} else {
					this.fight.draw(this.position, this.size, this.rotation, true);
					}
			}
		}
		else
		{
			app.DrawLib.drawImage(this.grave,0,0,100,124,this.position,new app.Vector(50,50),this.rotation,false);
		}
		//this.drawHealthBar();
        
	};//draw
	
	p.drawHealthBar = function () {
		var barPos = new app.Vector(this.position.x, this.position.y - this.size.y * 3 / 4);
		app.DrawLib.drawRect("red", barPos, new app.Vector(this.size.x * this.health / 1000, 5), 0);

	};
	
	p.weaponCollisions = function () {
		//----------Soldiers colliding with weapons------------
		var player;
        var thrownWeapons;
		if (this.side == "left") {
			player = app.FriendlyFire.playField.player;
        } else if (app.FriendlyFire.playField.players == 2) {
			player = app.FriendlyFire.playField.player2;
        }
		thrownWeapons = player.getActiveWeapons();
        if (this.side == "left" || app.FriendlyFire.playField.players == 2) {
            for (var i = 0; i < thrownWeapons.length; i++) { //each weapon
                if (thrownWeapons[i].thrown && this.colliding(thrownWeapons[i])) { //colliding?
                    if (this.weapon == undefined && this.getWeaponType() == thrownWeapons[i].getWeaponType()){
                        this.setWeapon(thrownWeapons[i]);
                        thrownWeapons[i].wasCaught();
						this.switchAnimations();
						player.hitCount ++;
						break;
                    } else if (this.getWeaponType() != thrownWeapons[i].getWeaponType()) {
                        this.health = 0;
                        this.die();
						player.friendlyFire ++;
                    }//if right weapon
                }
            }
        }
	}
	
	p.switchAnimations = function()
	{
		switch (this.color){
			case "yellow":
				this.walk = new app.Animation(app.IMAGES.YellowWeaponWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponWalkFrame, 1.2);
				this.fight = new app.Animation(app.IMAGES.YellowWeaponAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponFightFrame, .75);
				break;
			case "green":
				this.walk = new app.Animation(app.IMAGES.GreenWeaponWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponWalkFrame, 1.2);
				this.fight = new app.Animation(app.IMAGES.GreenWeaponAttack, new app.Vector(0, 0),  new app.Vector(200, 165), this.weaponFightFrame, .75); 
				break;
			case "blue":
				this.walk = new app.Animation(app.IMAGES.BlueWeaponWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponWalkFrame, 1.2);
				this.fight = new app.Animation(app.IMAGES.BlueWeaponAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponFightFrame, .75);
				break;
			case "red":
				this.walk = new app.Animation(app.IMAGES.RedWeaponWalk, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponWalkFrame, 1.2);
				this.fight = new app.Animation(app.IMAGES.RedWeaponAttack, new app.Vector(0, 0), new app.Vector(200, 165), this.weaponFightFrame, .75); 
				break;
		}
	}
	
	p.soldierCollisions = function () {
		//----------Soldiers colliding with Soldiers------------
		
		//start without fighting anyone
		
		this.fighting = false;
		var offset = 60;
		
		//check which side we are on
		var opponents;
		if(this.side == "left") {
			opponents = this.lane.rightSoldiers;
			offset = -offset;
		} else {
			opponents = this.lane.leftSoldiers;
		}
		
		//attack the first enemy you collide with
		for(var i = 0; i < opponents.length; i++) {
			var enemy = opponents[i];
			if (this.colliding(enemy,offset)) {
				this.fighting = true;
				enemy.takeDamage(this.attack());
				break;
			}
		}
	}
	
	p.castleCollisions = function () {
		//---------------------Soldiers colliding with Castle----------------------//
		
		/* Endless Mode not active*/
		if(!this.endlessMode)
		{
			var castle;
			if(this.side == "left") {
				castle = this.lane.playField.rightCastle;
			} else {
				castle = this.lane.playField.leftCastle;
			}
			
			if(castle.health> 0)
			{
				if (this.colliding(castle)) {
					this.fighting = true;
					castle.takeDamage(this.attack());
					this.takeDamage(castle.attack());
				}
			}
		}
		else
		{
			var castle;
			if(this.side == "right") {
				castle = this.lane.playField.leftCastle;
			}
			
			if(castle != undefined && castle.health> 0)
			{
				if (this.colliding(castle)) {
					this.fighting = true;
					castle.takeDamage(this.attack());
					this.takeDamage(castle.attack());
				}
			}
			
		}
	}
	
	
	
    p.collisionHandling = function () {
		if(this.lane.playField.players > 0) {
			this.weaponCollisions();
		}
		this.soldierCollisions();
		this.castleCollisions();
	};
	
	
	p.colliding = function (gameObject,offset) {
	
		if(!offset)
			offset = 0;
			
		var tempPosition = new app.Vector(this.position.x + offset, this.position.y)
			
		if(gameObject.position.x - gameObject.size.x / 2 > tempPosition.x + this.size.x / 2 ||
		   gameObject.position.x + gameObject.size.x / 2 < tempPosition.x - this.size.x / 2 ||
           gameObject.position.y - gameObject.size.y / 2 > tempPosition.y + this.size.y / 2 ||
           gameObject.position.y + gameObject.size.y / 2 < tempPosition.y - this.size.y / 2) {
			return false;
		} else {
			return true;
		}
	};
	
    
	//Soldier update function, takes delta time(time since last frame) as a param
	p.update = function (dt) {
	
		if (!this.dead && !this.fighting) {
		if(this.walk) { 
            this.walk.update(dt);
		}
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
		else if(!this.dead && this.fighting)
		{
			if(this.fight)
				this.fight.update(dt);
				
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
