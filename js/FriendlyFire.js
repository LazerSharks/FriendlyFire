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

app.FriendlyFire = 
{
	//Constants
	WIDTH : 1600,
	HEIGHT : 900,
	FRIENDLY_SOLDIER_PROBABILITY:,
	
	//Instance Variables
	canvas: undefined,
    ctx: undefined,
	app: undefined,
	dt:1/60.0,
	gameState : undefined,
	currentState : undefined,
	player: undefined,
	userInterface: undefined,
	timePassed:0,
	friendlySoldiers:[],
	lanes: undefined,
	
	
	//This initializes all of the data needed for the game
	//called by loader.js
	init : function()
	{
		//find and set the canvas
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		//declare the game states
		this.gameState = {
			intro:0,
			mainMenu:1,
			play:2,
			paused:3,
			over:4
		};
		
		this.lanes = {
			1:{x:0,y:250},
			2:{x:0,y:400},
			3:{x:0,y:550}
		};
		
		//set the current game state
		this.currentState = this.gameState.intro;
		
		//initialize our player
		this.player = new app.Player(undefined,this.WIDTH/2, this.HEIGHT-100);
		
		//initialize our interface
		this.userInterface.init(app.IMAGES,this.WIDTH,this.HEIGHT);
		
		//begin the game loop
		this.update();
		
	},//init
	
	//--------------------------Main Update Loop-------------------------------------
	
	//This is the main game loop
	update : function()
	{
		//Update according to the game state
		if(this.currentState == this.gameState.intro)//this updates the intro scene
		{
			//draw intro
			this.draw();
			
			//keep track of how long intro has been playing
			this.timePassed += this.dt;
			
			//change game state after intro
			if(this.timePassed >= 2)
			{
				this.currentState = this.gameState.mainMenu;
				this.timePassed = 0;
			}
			
		}
		else if(this.currentState == this.gameState.mainMenu)//this updates the main menu
		{
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			// Check to see if the menuButton was clicked and advance accordingly
			// Pros of this, Friendly Fire doesn't have to monitor and keep button data
			// around.  Cons, the programmer must know what they are named in the interface
			if(this.userInterface.buttonClicked("menuButton"))
			{
				this.currentState = this.gameState.play;
			}
				
			// Draw Call
			this.draw();
		}
		else if(this.currentState == this.gameState.play)//this updates the gameplay
		{
			// Throw all keyboard events to the objects
			this.handleKeyboard();
		
			// Update all the items in the game
			this.player.update(this.dt);
			
			for(var i = 0; i < this.friendlySoldiers.length; i++)
			{
				this.friendlySoldiers[i].update(this.dt);
			}
			
			if(Math.random() < (this.FRIENDLY_SOLDIER_PROBABILITY/60))
			{
				var lane = Math.floor((Math.random() * 3) + 1);
				var x = this.lanes[lane].x;
				var y = this.lanes[lane].y;
				this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y,"left","sword"));
			}
			
			// Draw Call
			this.draw();
		}//game state if
		
		// Loop this function every frame
		requestAnimationFrame(this.update.bind(this));
	
	},//update game
	
	//-----------------------------Draw Loop-------------------------------------------
	
	//This is the draw loop 
	draw : function()
	{
		// Need this to pass the object, breaks otherwise
		var mouse = this.app.mouse;
		
		// Clear the screen
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
		this.ctx.fillStyle = "#55DD55";
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
		
		//Draw according to the game state
		if(this.currentState == this.gameState.intro)//draw intro
		{
			this.userInterface.drawIntro(this.ctx);
		}
		else if(this.currentState == this.gameState.mainMenu)//this draws the main menu
		{
			// Throw all keyboard events to the objects
			this.userInterface.drawMainMenu(this.ctx,mouse);
		}
		else if(this.currentState == this.gameState.play)//draw gameplay
		{
			// Draw all of the sprites
			this.player.draw(this.ctx)
		}//game state if
		
		for(var i = 0; i < this.friendlySoldiers.length; i++)
		{
			this.friendlySoldiers[i].draw(this.ctx);
		}

	},//draw game
	
	//---------------------------------Helper Functions----------------------------------
	
	//This handles the input for the game
	//Some input is handled by the individual objects
	handleKeyboard : function()
	{
		//Handle input according to the game state
		if(this.currentState == this.gameState.mainMenu)//handle main menu inputs
		{
			//Handle keyboard input
			//if the user presses enter advance onto the play game state
			if(this.app.keydown[this.app.KEYBOARD.KEY_ENTER])
			{
				this.currentState = this.gameState.play;
			}//if left
		}
	},//input
	
	
	// This function takes a mouse move event and returns the mouse
	// coordinates relative to the canvas.  Event handler is in loader.js
	// Code origin: Html5 Canvas Tutorials http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
	getMousePos : function(e)
	{
		var rect = this.canvas.getBoundingClientRect();
		return { 
				 x: e.clientX - rect.left,
				 y: e.clientY - rect.top
			   };
	}
	
}//end of FriendlyFire.js





















