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
	FRIENDLY_SOLDIER_FREQUENCY: 1.5,
	ENEMY_SOLDIER_PROBABILITY: 0.5,
	ENEMY_SOLDIER_FREQUENCY: 1.5,
	SOLDIER_WIDTH: 60, //Change to affect how wide the player and the soldiers are
	SOLDIER_HEIGHT: 80, //Change to affect how tall the player and the soldiers are
	
	//Instance Variables
	canvas: undefined,
    ctx: undefined,
	app: undefined,
	dt:1/60.0,
	thisFrame:0,
	lastFrame:0,
	fps:0,
	gameState : undefined,
	currentState : undefined,
	player: undefined,
	userInterface: undefined,
	timePassed:0,
	friendlySoldiers:[],
	enemySoldiers:[],
	deadSoldiers:[],
	soldierTimer:0,
	enemyTimer:0,
	totalTime: 0,
	lanes: undefined,
	weaponSwitched: false,
	weaponThrown: false,
	pausedPressed: false,
	swordUpgrade: 0,
	spearUpgrade: 0,
	maceUpgrade: 0,
	axeUpgrade: 0,
	
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
		
		//declare the lane positions
		this.lanes = {
			1:{x:0,y:200},
			2:{x:0,y:380},
			3:{x:0,y:560}
		};
		
		//set the current game state
		this.currentState = this.gameState.play;
		
		//initialize our player
		this.player = new app.Player(undefined,this.WIDTH/4, this.HEIGHT-100, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT});
		
		//initialize our interface
		this.userInterface.init(app.IMAGES,this.WIDTH,this.HEIGHT);
		
		this.thisFrame = this.lastFrame = Date.now();
		
		//begin the game loop
		this.update();
		
	},//init
	
	//--------------------------Main Update Loop-------------------------------------
	
	//This is the main game loop
	update : function()
	{
		// Loop this function every frame
		requestAnimationFrame(this.update.bind(this));
	
		// Calculate delta time
		this.thisFrame = Date.now();
		this.dt = (this.thisFrame - this.lastFrame)/1000;
		this.lastFrame = Date.now();
		
		//use this for FPS display.  Total time is a misleading currently.
		//To be used later to actually track total time
		this.totalTime += this.dt;
	
		//Update according to the game state
		if(this.currentState == this.gameState.intro)//this updates the intro scene
		{
			
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
				
		}
		else if(this.currentState == this.gameState.play)//this updates the gameplay
		{
			//update time since last soldier was created
			this.soldierTimer += this.dt;
			this.enemyTimer += this.dt;
		
			// Throw all keyboard events to the objects
			this.handleKeyboard();
		
			// Update all the items in the game
			// Some Items call update after their own draw function. Lowers number of loops
		
			// Every so often generate an enemy Soldier
			if(Math.random() < this.ENEMY_SOLDIER_PROBABILITY && this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY)
			{
				//reset the timer
				this.enemyTimer = 0;
				
				//pick a random lane and set it
				var lane = Math.floor((Math.random() * 3) + 1);
				var x = this.lanes[lane].x + this.WIDTH;
				var y = this.lanes[lane].y;
				
				//pick a random weapon
				var weaponIndex = Math.floor((Math.random() * 4) + 1);
				
				//create the soldier with lane and weapon type
				switch(weaponIndex)
				{
					case 1:
						this.enemySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "right","spear"));
						break;
					case 2:
						this.enemySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "right","mace"));
						break;
					case 3:
						this.enemySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "right","axe"));
						break;
					case 4:
						this.enemySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "right","sword"));
						break;
				}//switch soldier
			}
			else if(this.enemyTimer > this.ENEMY_SOLDIER_FREQUENCY)
			{
				//reset timer if the time frame for generation has passed
				//e.g. the soldier didn't generate this time
				this.enemyTimer = 0;
			}//if enemy creation
			
			//every so often generate a friendly soldier
			if(Math.random() < this.FRIENDLY_SOLDIER_PROBABILITY && this.soldierTimer > this.FRIENDLY_SOLDIER_FREQUENCY)
			{
				//reset the timer
				this.soldierTimer = 0;
				
				//pick a lane
				var lane = Math.floor((Math.random() * 3) + 1);
				var x = this.lanes[lane].x;
				var y = this.lanes[lane].y;
				
				//pick a weapon
				var weaponIndex = Math.floor((Math.random() * 4) + 1);
				
				//create soldiers with weapon and lane
				switch(weaponIndex)
				{
					case 1:
						this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "left","spear"));
						break;
					case 2:
						this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "left","mace"));
						break;
					case 3:
						this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "left","axe"));
						break;
					case 4:
						this.friendlySoldiers.push(new this.app.Soldier(undefined,x,y, {x:this.SOLDIER_WIDTH, y:this.SOLDIER_HEIGHT}, "left","sword"));
						break;
				}//switch soldier
			}
			else if(this.soldierTimer > this.FRIENDLY_SOLDIER_FREQUENCY)
			{
				//Soldier didn't generate this time, reset timer
				this.soldierTimer = 0;
			}//if friendly creation
			
			//check all the collisions
			this.checkCollisions();
			
			//add any dead soldiers to the end of the dead soldiers array
			this.deadSoldiers = this.deadSoldiers.concat(this.friendlySoldiers.filter(function(soldier){return soldier.dead;})); 
			this.deadSoldiers = this.deadSoldiers.concat(this.enemySoldiers.filter(function(soldier){return soldier.dead;}));
			
			//filter out any inactive/dead soldiers
			this.friendlySoldiers = this.friendlySoldiers.filter(function(soldier){return soldier.active;});
			this.enemySoldiers = this.enemySoldiers.filter(function(soldier){return soldier.active;});
			
			//if the dead soldiers array gets too big dequeue/remove the first element
			if(this.deadSoldiers.length > 20)
			{
				this.deadSoldiers.splice(0,1);
			}//remove dead soldiers
			
		}
		else if(this.currentState = this.gameState.paused)//this updates the paused state
		{
			//handle keyboard events
			this.handleKeyboard();
		}//game state if
		
		//draw everything
		this.draw();
	},//update game
	
	//This loops through all the items in the game and check for collisions
	checkCollisions : function()
	{
		//get the array of thrown weapons from the Player object
		var thrownWeapons = this.player.getActiveWeapons();
		
		//----------Soldiers colliding with weapons------------
		for(var i = 0; i < this.friendlySoldiers.length; i++)
		{
			//set the current soldier
			var soldier = this.friendlySoldiers[i];
			
			//loop through thrown weapons
			for(var j = 0; j < thrownWeapons.length; j++)
			{
				//if the soldier and the weapon are colliding 
				if(soldier.colliding(thrownWeapons[j]))
				{
					//if the weapon is the right type catch it
					//if not kill the soldier
					if(soldier.getWeaponType() == thrownWeapons[j].getWeaponType())
					{
						soldier.setWeapon(thrownWeapons[j]);
						thrownWeapons[j].wasCaught();
					}else{
						soldier.die();
					}//if right weapon
				}//if colliding with weapon
			}//weapon loop
		}//soldier loop
		
		//----------Soldiers colliding with Soldiers------------
		
		//array of the current enemies
		var enemies = this.enemySoldiers;
		for(var i = 0; i < this.friendlySoldiers.length; i++)
		{
			//save the current friendly soldier
			var friend = this.friendlySoldiers[i];
			
			//loop through the enemies
			for(var j = 0; j < enemies.length; j++)
			{
				//save the current enemy
				var enemy = enemies[j];
				
				//if the two soldiers are colliding
				if(friend.colliding(enemy))
				{
					//tell the soldiers that they are fighting
					enemy.setFighting(true);
					friend.setFighting(true);
					
					//have the soldiers attack each other
					enemy.takeDamage(friend.attack());
					friend.takeDamage(enemy.attack());
					
					if(friend.isDead() || enemy.isDead())
					{
						friend.setFighting(false);
						enemy.setFighting(false);
					}
				}//if colliding with weapon
			}//weapon loop
		}//soldier loop
		
	},//check collisions
	
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
			//draw the lanes
			for(var i = 1; i < 4; i++)
			{
				this.ctx.save();
				this.ctx.strokeStyle = "black";
				this.ctx.lineWidth = 5;
				this.ctx.strokeRect(0, this.lanes[i].y - this.SOLDIER_HEIGHT/2, this.WIDTH, this.SOLDIER_HEIGHT);
				this.ctx.restore();
			}
			
			//draw the dead soldiers
			for(var i = 0; i < this.deadSoldiers.length; i++)
			{
				this.deadSoldiers[i].draw(this.dt,this.ctx);
			}

			//draw the fps to the top of the screen every second
			this.ctx.save()    
			this.ctx.font = "70px Verdana";
			this.ctx.fillStyle = "red";
			this.ctx.fillText(this.fps.toFixed(2) + "fps", 100, 100);
			this.ctx.restore();
			if(this.totalTime > 1)
			{
				this.totalTime = 0;
				this.fps = 1/this.dt;				
			}//if total time
			
			//draw the player, pass it dt so it can call its own update
			this.player.draw(this.dt,this.ctx);
				
			//draw all the friendly soldiers, pass them dt to call their own updates
			for(var i = 0; i < this.friendlySoldiers.length; i++)
			{
				this.friendlySoldiers[i].draw(this.dt,this.ctx);
			}//for friendly
			
			//draw all the enemy soldiers, pass them dt to call their own updates
			for(var i = 0; i < this.enemySoldiers.length; i++)
			{
				this.enemySoldiers[i].draw(this.dt,this.ctx);
			}//for enemy
			
			//draw middle line
			this.ctx.save();
			this.ctx.strokeStyle = "black";
			this.ctx.lineWidth = 3;
			this.ctx.beginPath();
			this.ctx.moveTo(this.WIDTH/2, 0);
			this.ctx.lineTo(this.WIDTH/2, this.HEIGHT);
			this.ctx.stroke();
			this.ctx.restore();
			
			//draw the user interface
			this.userInterface.drawGame(this.ctx,mouse);
		}
		else if(this.currentState = this.gameState.paused)//this draw the paused state
		{
			//draw the paused interface
			this.userInterface.drawPaused(this.ctx,mouse);
		}//game state if

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
		else if(this.currentState == this.gameState.play)//handle gameplay input
		{
			//move the player
			if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT] || this.app.keydown[this.app.KEYBOARD.KEY_A])//left move
			{
				this.player.move("left", this.dt);
			}
			
			if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT] || this.app.keydown[this.app.KEYBOARD.KEY_D])//right move
			{
				this.player.move("right", this.dt);
			}
			
			//switch weapon and prevent the player from holding down the switch buttons
			if((this.app.keydown[this.app.KEYBOARD.KEY_DOWN] || this.app.keydown[this.app.KEYBOARD.KEY_S]) && !this.weaponSwitched) //down switch
			{
				this.player.switchWeapons("down");
				this.weaponSwitched = true;
			}
			
			if((this.app.keydown[this.app.KEYBOARD.KEY_UP] || this.app.keydown[this.app.KEYBOARD.KEY_W]) && !this.weaponSwitched) //up switch
			{
				this.player.switchWeapons("up");
				this.weaponSwitched = true;
			}
			
			if(!this.app.keydown[this.app.KEYBOARD.KEY_DOWN] && !this.app.keydown[this.app.KEYBOARD.KEY_UP] && !this.app.keydown[this.app.KEYBOARD.KEY_S] && !this.app.keydown[this.app.KEYBOARD.KEY_W] && this.weaponSwitched) // reset weaponSwitched value
			{
				this.weaponSwitched = false;
			}
			
			//throw weapon
			if(this.app.keydown[this.app.KEYBOARD.KEY_SPACE] && !this.weaponThrown) //throw and set the thrownWeapon boolean to true to force the player to release the space bar
			{
				this.weaponThrown = true;
				this.player.throwWeapon();
			}
			else if(!this.app.keydown[this.app.KEYBOARD.KEY_SPACE] && this.weaponThrown) //reset the boolean
			{
				this.weaponThrown = false;
			}
			
			//pause the game
			if(this.pausedPressed)
			{
				this.currentState = this.gameState.paused;
				this.pausedPressed = false;
			}
		}
		else if(this.currentState == this.gameState.paused)//handle paused keystates
		{
			//unpause the game
			if(this.pausedPressed)
			{
				this.currentState = this.gameState.play;
				this.pausedPressed = false;
			}
		}//if state
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





















