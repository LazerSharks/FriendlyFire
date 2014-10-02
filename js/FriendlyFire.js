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
	
	//Instance Variables
	canvas: undefined,
    ctx: undefined,
	app: undefined,
	dt:1/60.0,
	enemies:[],
	gameState : undefined,
	currentState : undefined,
	player: undefined,
	userInterface: undefined,
	timePassed:0,
	
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
		
		//set the current game state
		this.currentState = this.gameState.intro;
		
		//initialize our player
		this.player = new app.Player(undefined,this.WIDTH/2, this.HEIGHT/2);
		
		//initialize our interface
		this.userInterface.init(app.IMAGES,this.WIDTH,this.HEIGHT);
		
		//begin the game loop
		this.update();
		
	},//init
	
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
			console.log(this.timePassed);
			
			//change game state after intro
			if(this.timePassed >= 2)
			{
				this.currentState = this.gameState.mainMenu;
				this.timePassed = 0;
			}
			
		}
		else if(this.currentState == this.gameState.mainMenu)//this updates the gameplay
		{
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			// Draw Call
			this.draw();
		}
		else if(this.currentState == this.gameState.play)//this updates the main menu
		{
			// Throw all keyboard events to the objects
			this.handleKeyboard();
		
			// Update all the items in the game
			this.player.update(this.dt);
			
			// Draw Call
			this.draw();
		}//game state if
		
		// Loop this function every frame
		requestAnimationFrame(this.update.bind(this));
	
	},//update game
	
	//This is the draw loop 
	draw : function()
	{
		// Clear the screen
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
		
		//Draw according to the game state
		if(this.currentState == this.gameState.intro)//draw intro
		{
			this.userInterface.drawIntro(this.ctx);
		}
		else if(this.currentState == this.gameState.mainMenu)//this draws the main menu
		{
			// Throw all keyboard events to the objects
			this.userInterface.drawMainMenu(this.ctx);
		}
		else if(this.currentState == this.gameState.play)//draw gameplay
		{
			// Draw all of the sprites
			this.player.draw(this.ctx)
		}//game state if

	},//draw game
	
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
	}//input
	
}//end of FriendlyFire.js





















