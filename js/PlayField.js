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

app.PlayField = function () {
    
    function PlayField(players) {
        this.players = players;
        
        //create the castles
        this.leftCastle = new app.Castle(undefined, new app.Vector(50, 450), new app.Vector(100, 900), "left");
        this.rightCastle = new app.Castle(undefined, new app.Vector(1550, 450), new app.Vector(100, 900), "right");
		if (players == 0) {
			this.leftCastle.invincible = true;
			this.rightCastle.invincible = true;
		}
        //create the lanes
        this.lanes = {
            1: new app.Lane(undefined, new app.Vector(800, 300), this),
            2: new app.Lane(undefined, new app.Vector(800, 450), this),
            3: new app.Lane(undefined, new app.Vector(800, 600), this)
        };
        
		if (players > 0) {
			this.player = new app.Player(undefined, "left");
		}
        if (players == 2) {
            this.player2 = new app.Player(undefined, "right");
        }
		
		this.endlessMode = false;
	}
    
    
    var p = PlayField.prototype;
    
    

    p.update = function (dt) {
		
        this.lanes[1].update(dt);
        this.lanes[2].update(dt);
        this.lanes[3].update(dt);
        this.leftCastle.update(dt);
		if (!this.endlessMode) {
			this.rightCastle.update(dt);
		}
        
		if (this.players > 0) {
			this.player.update(dt);
		}
        if (this.players == 2) {
            this.player2.update(dt);
        }
    };
	
	
	
    p.draw = function () {
        app.DrawLib.drawRect("lightgreen", new app.Vector(800, 450), new app.Vector(1600, 900), 0);
        app.DrawLib.drawRect("black", new app.Vector(800, 450), new app.Vector(8, 900), 0);
        this.lanes[1].draw();
        this.lanes[2].draw();
        this.lanes[3].draw();
        this.leftCastle.draw();
		if (!this.endlessMode) {
			this.rightCastle.draw();
		}
		if (this.players > 0) {
			this.player.draw();
		}
        if (this.players == 2) {
            this.player2.draw();
        }
    };
    
	//set the difficulty based off player choice
	p.setDifficulty = function (choice) {
		switch (choice) {
		case "easy":
				this.leftCastle.flag = app.IMAGES.flagBritain;
				this.rightCastle.flag = app.IMAGES.flagFrance;
		case "twoPlayer":
			this.endlessMode = false;
			for (var i = 1; i < 4; i++) {
				this.lanes[i].ENEMY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].FRIENDLY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].endlessMode = this.endlessMode;
				this.leftCastle.flag = app.IMAGES.flagUS;
				this.rightCastle.flag = app.IMAGES.flagCanada;
				
			}
			break;
		case "medium":
			this.endlessMode = false;
			for (var i = 1; i < 4; i++) {
				this.lanes[i].ENEMY_SOLDIER_PROBABILITY = 0.275;
				this.lanes[i].FRIENDLY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].endlessMode = this.endlessMode;
				this.leftCastle.flag = app.IMAGES.flagBritain;
				this.rightCastle.flag = app.IMAGES.flagItaly;
			}
			break;
		case "hard":
			this.endlessMode = false;
			for (var i = 1; i < 4; i++) {
				this.lanes[i].ENEMY_SOLDIER_PROBABILITY = 0.35;
				this.lanes[i].FRIENDLY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].endlessMode = this.endlessMode;
				this.leftCastle.flag = app.IMAGES.flagBritain;
				this.rightCastle.flag = app.IMAGES.flagGermany;
			}

			break;
		case "endless":
			this.endlessMode = true;
			for (var i = 1; i < 4; i++) {
				this.lanes[i].ENEMY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].FRIENDLY_SOLDIER_PROBABILITY = 0.2;
				this.lanes[i].endlessMode = this.endlessMode;
				this.leftCastle.flag = app.IMAGES.flagBritain;
			}
			break;
		}
	}
	
	p.restoreField = function(obj)
	{
		obj.lanes[1].clearLane();
        obj.lanes[2].clearLane();
        obj.lanes[3].clearLane();
		if(!obj.endlessMode)
		{
			obj.rightCastle.respawn();
		}
			obj.leftCastle.respawn();
	}
	
	//check to see if a castle fell. If so, return true
	p.gameOver = function()
	{
		if(this.endlessMode)
		{
			//if the left castle is dead, return true
			if(this.leftCastle.health <=0)
			{
				return true;
			}
			return false;
		}
		else
		{
			//if the left castle is dead, return true
			if(this.leftCastle.health <=0 || this.rightCastle.health <= 0)
			{
				return true;
			}
			return false;
		}
	}
	
	
    return PlayField;
    
}();