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
	FRIENDLY_SOLDIER_PROBABILITY:0.5,
	SOLDIER_WIDTH: 120, //Change to affect how wide the player and the soldiers are
	SOLDIER_HEIGHT: 160, //Change to affect how tall the player and the soldiers are
	
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
	weaponSwitched: false,
	
	
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
			1:{x:0,y:120},
			2:{x:0,y:300},
			3:{x:0,y:480}
		};
		
		//set the current game state
		this.currentState = this.gameState.play;
		
		//initialize our player
		this.player = new app.Player(undefined,this.WIDTH/2, this.HEIGHT-100, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT});
		
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
			//this.player.update(this.dt);
			
			for(var i = 0; i < this.friendlySoldiers.length; i++)
			{
				this.friendlySoldiers[i].update(this.dt);
			}
			
			if(Math.random() < (this.FRIENDLY_SOLDIER_PROBABILITY/60))
			{
				var lane = Math.floor((Math.random() * 3) + 1);
				var x = this.lanes[lane].x;
				var y = this.lanes[lane].y;
				this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "left","sword"));
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
			for(var i = 1; i < 4; i++)
			{
				this.ctx.save();
				this.ctx.strokeStyle = "black";
				this.ctx.lineWidth = 5;
				this.ctx.strokeRect(0, this.lanes[i].y - this.SOLDIER_HEIGHT/2, this.WIDTH, this.SOLDIER_HEIGHT);
				this.ctx.restore();
			}
			
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
		if(this.currentState == this.gameState.play)//handle gameplay input
		{
			//move the player
			if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT])//left move
			{
				this.player.move("left", this.dt);
			}
			if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT])//right move
			{
				this.player.move("right", this.dt);
			}
			
			//switch weapon and prevent the player from holding down the switch buttons
			if(this.app.keydown[this.app.KEYBOARD.KEY_DOWN] && !this.weaponSwitched) //down switch
			{
				this.player.switchWeapons("down");
				this.weaponSwitched = true;
			}
			if(this.app.keydown[this.app.KEYBOARD.KEY_UP] && !this.weaponSwitched) //up switch
			{
				this.player.switchWeapons("up");
				this.weaponSwitched = true;
			}
			if(!this.app.keydown[this.app.KEYBOARD.KEY_DOWN] && !this.app.keydown[this.app.KEYBOARD.KEY_UP] && this.weaponSwitched) // reset weaponSwitched value
			{
				this.weaponSwitched = false;
			}
			
			//throw weapon
			/*
				if(this.app.keydown[this.app.KEYBOARD.SPACE]) //throw
				{
					this.player.throwWeapon();
				}
			*/
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





















