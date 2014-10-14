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
    
    function PlayField() {
        //create the castles
        this.leftCastle = new app.Castle(undefined, new app.Vector(50, 450), new app.Vector(100, 900), "left");
        this.rightCastle = new app.Castle(undefined, new app.Vector(1550, 450), new app.Vector(100, 900), "right");
        
        //create the lanes
        this.lanes = {
            1: new app.Lane(undefined, new app.Vector(800, 300), this),
            2: new app.Lane(undefined, new app.Vector(800, 450), this),
            3: new app.Lane(undefined, new app.Vector(800, 600), this),
        };
        
        this.player = new app.Player(undefined, 400, 800);
	}
    
    
    var p = PlayField.prototype;
    
    

    p.update = function (dt) {
		this.collisionHandling();
		
        this.lanes[1].update(dt);
        this.lanes[2].update(dt);
        this.lanes[3].update(dt);
        this.leftCastle.update(dt);
        this.rightCastle.update(dt);
        this.player.update(dt);
    };
    
	p.collisionHandling = function () {
		
		
		
		
		
	}
	
	
	
    p.draw = function () {
        app.DrawLib.drawRect("lightgreen", new app.Vector(800, 450), new app.Vector(1600, 900), 0);
        app.DrawLib.drawRect("black", new app.Vector(800, 450), new app.Vector(8, 900), 0);
        this.lanes[1].draw();
        this.lanes[2].draw();
        this.lanes[3].draw();
        this.leftCastle.draw();
        this.rightCastle.draw();
        this.player.draw();
    };
    
	
	
    return PlayField;
    
}();