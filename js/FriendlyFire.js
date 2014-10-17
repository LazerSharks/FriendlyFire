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

app.FriendlyFire = {
	
    //Constants
	WIDTH : 1600,
	HEIGHT : 900,
	
	//Instance Variables
	canvas: undefined,
    ctx: undefined,
    
	dt: 0,
	thisFrame: 0,
	lastFrame: 0,
	fps: 0,
    totalTime: 0,
	introTime:0,
	instructionTime:0,
    
	gameState: undefined,
	currentState: undefined,
	userInterface: undefined,
	
	
    playField: new app.PlayField(),
	
	
	//This initializes all of the data needed for the game
	//called by loader.js
	init : function () {
		//find and set the canvas
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
        
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		
        
		//declare the game states
		this.gameState = {
			intro: 0,
			controls: 1,
			intstructions: 2,
			play: 3,
			paused: 4,
			over: 5,
			difficulty: 6,
			twoPlayerTrollScreen: 7
		};
		//set the current game state
		this.currentState = this.gameState.intro;
        
        
		//initialize our interface
		this.userInterface.init(app.IMAGES, this.WIDTH, this.HEIGHT);
		
        
        
        
		this.thisFrame = this.lastFrame = Date.now();
		
		//begin the game loop
		this.update();
		
	},//init
	
	//--------------------------Main Update Loop-------------------------------------
	
	//This is the main game loop
	update : function () {
		// Loop this function every frame
		requestAnimationFrame(this.update.bind(this));
	
		this.thisFrame = Date.now();
		this.dt = (this.thisFrame - this.lastFrame) / 1000;
		this.lastFrame = Date.now();
		
		this.totalTime += this.dt;
	
		//Update according to the game state
		if (this.currentState == this.gameState.intro) {
			
			//keep track of how long intro has been playing
			this.introTime += this.dt;
			
			//change game state after intro
			if (this.introTime >= 2) {
				this.currentState = this.gameState.controls;
				this.introTime = 0;
			}
            
		} else if (this.currentState == this.gameState.controls) {
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			// Check to see if the menuButton was clicked and advance accordingly
			// Pros of this, Friendly Fire doesn't have to monitor and keep button data
			// around.  Cons, the programmer must know what they are named in the interface
			if (this.userInterface.buttonClicked("menuButton")) {
				console.log("Clicked");
				this.currentState = this.gameState.instructions;
			}
		}else if (this.currentState == this.gameState.instructions) {
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			this.instructionTime += this.dt;
			
			// Check to see if the menuButton was clicked and advance accordingly
			// Pros of this, Friendly Fire doesn't have to monitor and keep button data
			// around.  Cons, the programmer must know what they are named in the interface
			if (this.instructionTime >= 0.5) {
				if (this.userInterface.buttonClicked("menuButton")) {
					this.instructionTime = 0;
					console.log("Clicked");
					this.currentState = this.gameState.difficulty;
				}
			}
		}else if (this.currentState == this.gameState.twoPlayerTrollScreen) {
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			// Check to see if the menuButton was clicked and advance accordingly
			// Pros of this, Friendly Fire doesn't have to monitor and keep button data
			// around.  Cons, the programmer must know what they are named in the interface
			if (this.userInterface.buttonClicked("menuButton")) {
				console.log("Clicked");
				this.currentState = this.gameState.difficulty;
			}
		} else if (this.currentState == this.gameState.difficulty) {
			// Throw all keyboard events to the objects
			this.handleKeyboard();
			
			// Check to see if the menuButton was clicked and advance accordingly
			// Pros of this, Friendly Fire doesn't have to monitor and keep button data
			// around.  Cons, the programmer must know what they are named in the interface
			if (this.userInterface.buttonClicked("easyButton")) {
				console.log("Easy button Clicked");
				this.playField.setDifficulty("easy");
				this.currentState = this.gameState.play;
			}if (this.userInterface.buttonClicked("mediumButton")) {
				console.log("medium button Clicked");
				this.playField.setDifficulty("medium");
				this.currentState = this.gameState.play;
			}if (this.userInterface.buttonClicked("hardButton")) {
				console.log("hard button Clicked");
				this.playField.setDifficulty("hard");
				this.currentState = this.gameState.play;
			}if (this.userInterface.buttonClicked("endlessButton")) {
				console.log("endless button Clicked");
				this.playField.setDifficulty("endless");
				this.currentState = this.gameState.play;
			}if (this.userInterface.buttonClicked("twoPlayerButton")) {
				console.log("twoPlayer button Clicked");
				this.playField.setDifficulty("twoPlayer");
				this.currentState = this.gameState.twoPlayerTrollScreen;
			}
		} else if (this.currentState == this.gameState.play) {
            this.playField.update(this.dt);
            
			//this.soldierTimer += this.dt;
			//this.enemyTimer += this.dt;
		
			// Throw all keyboard events to the objects
			this.handleKeyboard();

			//this.checkCollisions();
			if(this.playField.gameOver() == true)
			{
				this.playField.restoreField(this.playField); //restore the state of the field
				this.currentState = this.gameState.controls; //go to the controls screen
			}
            
		} else if (this.currentState == this.gameState.paused) {
			this.handleKeyboard();
		}//game state if
		this.draw();
        
        
        //reset new key presses
        app.keyPress = [];
	},//update game
	
    
    
	//-----------------------------Draw Loop-------------------------------------------
	
	//This is the draw loop 
	draw : function () {
		// Need this to pass the object, breaks otherwise
		var mouse = this.app.mouse;
		
		// Clear the screen
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		
		
		//Draw according to the game state
		if (this.currentState == this.gameState.intro) {
			this.userInterface.drawIntro(this.ctx);
            
		} else if (this.currentState == this.gameState.controls) {
			// Throw all keyboard events to the objects
			this.userInterface.drawControls(this.ctx, mouse);
            
		}else if (this.currentState == this.gameState.instructions) {
			// Throw all keyboard events to the objects
			this.userInterface.drawInstructions(this.ctx, mouse);
            
		}else if (this.currentState == this.gameState.difficulty) {
			// Throw all keyboard events to the objects
			this.userInterface.drawDifficulty(this.ctx, mouse);
            
		}else if (this.currentState == this.gameState.twoPlayerTrollScreen) {
			// Throw all keyboard events to the objects
			this.userInterface.drawTwoPlayer(this.ctx, mouse);
            
		} else if (this.currentState == this.gameState.play) {
            this.playField.draw();
			this.userInterface.drawGame(this.ctx, mouse);
            
            
		} else if (this.currentState == this.gameState.paused) {
            this.playField.draw();
			this.userInterface.drawPaused(this.ctx, mouse);
		}//game state if
        
        
		
		//show the frame rate
        //this.displayFrameRate();
        

	},//draw game
	
    
    
	//---------------------------------Helper Functions----------------------------------
	
	//This handles the input for the game
	//Some input is handled by the individual objects
	handleKeyboard : function () {
        
		//Handle input according to the game state
		if (this.currentState == this.gameState.controls) {
			//if the user presses enter advance onto the play game state
			if (this.app.keydown[this.app.KEYBOARD.KEY_ENTER]) {
				this.currentState = this.gameState.instructions;
			}//if left
            
            
		} else if (this.currentState == this.gameState.play) {
            //pause the game
            if(this.app.keyPress[this.app.KEYBOARD.KEY_P]) {
                this.currentState = this.gameState.paused; //pause the game
    		}
			
		} else if (this.currentState == this.gameState.paused) {
			if(this.app.keyPress[this.app.KEYBOARD.KEY_P]) {
                this.currentState = this.gameState.play; //unpause the game
    		}
		}
	},//input
    
    displayFrameRate : function () {
        this.ctx.save();
        this.ctx.font = "70px Verdana";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(this.fps.toFixed(2) + "fps", 100, 100);
        this.ctx.restore();
        if (this.totalTime > 1) {
            this.totalTime = 0;
            this.fps = 1 / this.dt;
        }
    }
};//end of FriendlyFire.js





















