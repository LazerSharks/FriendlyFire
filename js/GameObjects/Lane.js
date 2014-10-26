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

//Friendly Fire.js - this is the control or main game manager

"use strict";

//create the global application object if it doesn't exist
var app = app || {};

app.Lane = function () {
    
    function Lane(image, position, playField) {
		// Instance variables of Player
		this.position = position;
		this.playField = playField;
		//set the image and default "backup" color
		this.image = image;
		this.color = "tan";
        
        this.leftSoldiers = [];
        this.rightSoldiers = [];
        this.deadSoldiers = [];
        
        this.leftSpawn = new app.Vector(0, this.position.y);
        this.rightSpawn = new app.Vector(1600, this.position.y);
        
        this.ENEMY_SOLDIER_PROBABILITY = 0.2;
        this.ENEMY_SOLDIER_FREQUENCY = 1;
        this.enemyTimer = 0;
        
        this.FRIENDLY_SOLDIER_PROBABILITY = 0.2;
        this.FRIENDLY_SOLDIER_FREQUENCY = 1;
        this.friendlyTimer = 0;
		
		this.endlessMode = false;
	}//constructor
    
    
    var p = Lane.prototype;
    
    

    p.update = function (dt) {
        if (this.endlessMode) {
            this.ENEMY_SOLDIER_PROBABILITY += (dt * 0.001);
        }
		
		var leftCastle = this.playField.leftCastle;
		var rightCastle = this.playField.rightCastle;
		
		if(leftCastle.health > 0)
		{
			this.spawnLeftGuys(dt);
		}
		if(rightCastle.health > 0)
		{
			if (this.playField.players == 1) {
				this.spawnEnemies(dt);
			} else {
				this.spawnRightGuys(dt);
			}
		}
        
        for (var i = 0; i < this.leftSoldiers.length; i++) {
            this.leftSoldiers[i].update(dt);
        }
        for (var i = 0; i < this.rightSoldiers.length; i++) {
            this.rightSoldiers[i].update(dt);
        }
        
        //filter soldiers
        this.filterSoldiers();
    };
    
    
    
    //handles the spawning of enemies
    p.spawnEnemies = function (dt) {
        this.enemyTimer += dt;
        
        //enemies spawn randomly, but can't spawn faster than the frequency limit
        if (Math.random() < this.ENEMY_SOLDIER_PROBABILITY && this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY) {
            //reset timer
            this.enemyTimer = 0;
            //create soldier
            var weapon = "enemy";
            this.rightSoldiers.push(new app.Soldier(undefined, this.rightSpawn.copy(), "right", this, weapon, this.endlessMode));
        } else if (this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY) {
            this.enemyTimer = 0;
        }
    };
    
    
    //handles the spawning of friendlies
    p.spawnLeftGuys = function (dt) {
        this.friendlyTimer += dt;
        
        if (Math.random() < this.FRIENDLY_SOLDIER_PROBABILITY && this.friendlyTimer > this.FRIENDLY_SOLDIER_FREQUENCY) {
            //reset timer
            this.friendlyTimer = 0;
            //create soldier
            var weapon = getRandomWeapon();
            this.leftSoldiers.push(new app.Soldier(undefined, this.leftSpawn.copy(), "left", this, weapon, this.endlessMode));
        } else if (this.friendlyTimer > this.FRIENDLY_SOLDIER_FREQUENCY) {
            this.friendlyTimer = 0;
        }
    };
    
    //handles the spawning of friendlies
    p.spawnRightGuys = function (dt) {
        this.enemyTimer += dt;
        
        if (Math.random() < this.ENEMY_SOLDIER_PROBABILITY && this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY) {
            //reset timer
            this.enemyTimer = 0;
            //create soldier
            var weapon = getRandomWeapon();
            this.rightSoldiers.push(new app.Soldier(undefined, this.rightSpawn.copy(), "right", this, weapon, this.endlessMode));
        } else if (this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY) {
            this.enemyTimer = 0;
        }
    };
    
    p.draw = function () {
        
        app.DrawLib.drawRect(this.color, this.position, new app.Vector(1600,100), 0);
		
        for(var i = 0; i < this.deadSoldiers.length; i++) {
            this.deadSoldiers[i].draw();
        }
		
        for(var i = 0; i < this.leftSoldiers.length; i++) {
            this.leftSoldiers[i].draw();
        }
        
        for(var i = 0; i < this.rightSoldiers.length; i++) {
            this.rightSoldiers[i].draw();
        }
    };
    
    
    p.filterSoldiers = function () {
        //filter dead soldiers into a dead soldier array
        this.deadSoldiers = this.deadSoldiers.concat(this.leftSoldiers.filter(function(soldier){return soldier.dead;}));
        this.deadSoldiers = this.deadSoldiers.concat(this.rightSoldiers.filter(function(soldier){return soldier.dead;}));
        
        //filter inactive soldiers out of the primary lanes
        this.leftSoldiers = this.leftSoldiers.filter(function(soldier){return soldier.active;});
        this.rightSoldiers = this.rightSoldiers.filter(function(soldier){return soldier.active;});
        
        //remove excess dead soldiers from the dead array
        if(this.deadSoldiers.length > 10) {
            this.deadSoldiers.splice(0,1);
        }
    };
    
	//empty the lanes of all soldiers
	p.clearLane = function()
	{
		this.leftSoldiers = [];
        this.rightSoldiers = [];
        this.deadSoldiers = [];
	};
    
    
    //private
    function getRandomWeapon() {
        
        var weaponIndex = Math.floor((Math.random() * 4) + 1);
        var weapon;
		switch (weaponIndex) {
        case 1:
            weapon = "spear";
            break;
        case 2:
            weapon = "mace";
            break;
        case 3:
            weapon = "axe";
            break;
        case 4:
            weapon = "sword";
            break;
        }
        return weapon;
	};
    
    
    
    return Lane;
    
}();