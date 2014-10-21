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

//Interface.js is the "class" for our interfaces

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the object for our interface
app.Interface =
{
	//Constants
	WIDTH: 0,
	HEIGHT: 0,
	
	images: [],
	buttons: undefined,
	
	//Interface constructor
	init : function(images, canvasWidth, canvasHeight) 
	{
		this.WIDTH = canvasWidth;
		this.HEIGHT = canvasHeight;
		this.images = images;
		this.color = "#462F02";
		
		var buttonPadding = 100;
		
		//Create hash table of buttons
		this.buttons =
		{
			//Button(text, font, fontColor, image,x,y,width,height)
			"menuButton" : new app.Button("MENU", "24pt Comic Sans MS", "white", undefined, this.WIDTH/9 + 10, this.HEIGHT/10, 175, 75),
			"menuSinglePlayerButton" : new app.Button("SINGLE PLAYER", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/3,250,75),
			"menuTwoPlayerButton" : new app.Button("TWO PLAYER", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/3 + buttonPadding,250,75),
			"menuEndlessButton" : new app.Button("ENDLESS MODE", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/3 + buttonPadding*2,250,75),
			"menuControlsButton" : new app.Button("CONTROLS", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/3 + buttonPadding*3,250,75),
			"menuInstructionsButton" : new app.Button("INSTRUCTIONS", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/3 + buttonPadding * 4,250,75),
			"easyButton" : new app.Button("EASY", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2 - 100,175,75),
			"mediumButton" : new app.Button("MEDIUM", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2,175,75),
			"hardButton" : new app.Button("HARD", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2 + 100,175,75),
			"endlessButton" : new app.Button(undefined,(3*this.WIDTH/4) + 25,330,50,50),
			"twoPlayerButton" : new app.Button(undefined,(3*this.WIDTH/4) + 65,500,50,50),
			"controlsInstructionButton" : new app.Button("INSTRUCTIONS", "28px Comic Sans MS", "white", undefined, this.WIDTH/2, this.HEIGHT -(this.HEIGHT /9) + 5, 250, 75), 
			"instructionsControlButton" : new app.Button("CONTROLS", "28px Comic Sans MS", "white", undefined, this.WIDTH/2, this.HEIGHT -(this.HEIGHT /9) + 5, 250, 75), 
			"pauseResumeButton" : new app.Button("RESUME", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2 - 100, 250, 75),
			"pauseRestartButton" : new app.Button("RESTART", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2, 250, 75),
			"pauseButton" : new app.Button("||", "bold 22px Comic Sans MS", "white", undefined,(this.WIDTH/2),50, 50, 50),
			"pauseQuitButton" : new app.Button("QUIT", "28px Comic Sans MS", "white", undefined,(this.WIDTH/2),this.HEIGHT/2 + 100, 250, 75),
		};
	},
	
	//--------------------Interface Draw Methods--------------------------
	
	//Draw intro scene
	drawIntro : function(ctx) 
	{
		ctx.save();
	
		//team logo splash screen
		var image = new Image();
		image.src = this.images['teamLogo'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		ctx.restore();
	},//draw intro
	
	//Draw main menu UI
	drawMainMenu : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = undefined;
		//var image = new Image();
		//image.src = this.images['controlMenu'];
		
		//test to see if there is an image and draw accordingly
		/*
		if(!image){
			ctx.fillStyle = "red";
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}*///if image
		
		
		app.DrawLib.drawRect(this.color, new app.Vector(this.WIDTH/2, this.HEIGHT/2),  new app.Vector(this.WIDTH/4, this.HEIGHT), 0);
		
		//draw the menu button since we are in the menu
		this.buttons["menuSinglePlayerButton"].draw(ctx,mouse);
		this.buttons["menuTwoPlayerButton"].draw(ctx,mouse);
		this.buttons["menuEndlessButton"].draw(ctx,mouse);
		this.buttons["menuControlsButton"].draw(ctx,mouse);
		this.buttons["menuInstructionsButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw main menu
	
	//Draw main menu UI
	drawControls : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = undefined;
		//var image = new Image();
		//image.src = this.images['controlMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = "red";
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		app.DrawLib.drawRect(this.color, new app.Vector(this.WIDTH/2, this.HEIGHT/2),  new app.Vector(this.WIDTH/2, this.HEIGHT/2), 0);
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		this.buttons["controlsInstructionButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw main menu
	
		//Draw instructions UI
	drawInstructions : function(ctx, mouse) {
		console.log("Instructions");
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = undefined;
		//var image = new Image();
		//image.src = this.images['instructionMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = "red";
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		app.DrawLib.drawRect(this.color, new app.Vector(this.WIDTH/2, this.HEIGHT/2),  new app.Vector(this.WIDTH/2, this.HEIGHT/2), 0);
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		this.buttons["instructionsControlButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw instructions	
	
	
	//Draw difficulty select UI
	drawDifficulty : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		
		var image = undefined;
		
		/*var image = new Image();
		image.src = this.images['difficultyMenu'];*/
		
		//test to see if there is an image and draw accordingly
		/*
		if(!image){
			ctx.fillStyle = "red";
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image*/
		
		app.DrawLib.drawRect(this.color, new app.Vector(this.WIDTH/2, this.HEIGHT/2),  new app.Vector(this.WIDTH/4, this.HEIGHT), 0);
		
		//draw the menu button since we are in the menu
		this.buttons["easyButton"].draw(ctx,mouse);
		this.buttons["mediumButton"].draw(ctx,mouse);
		this.buttons["hardButton"].draw(ctx,mouse);
		this.buttons["menuButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw instructions
	
	drawGame : function(ctx, mouse) {
		this.buttons["pauseButton"].draw(ctx,mouse);
	},
	
	drawPaused: function(ctx, mouse) {
		//drawRect: function(color, position, size, r)
		app.DrawLib.drawRect(this.color, new app.Vector(this.WIDTH/2, this.HEIGHT/2),  new app.Vector(this.WIDTH/4, this.HEIGHT), 0);

		
	
		this.buttons["pauseResumeButton"].draw(ctx,mouse);
		this.buttons["pauseRestartButton"].draw(ctx,mouse);
		this.buttons["pauseQuitButton"].draw(ctx,mouse);
	},
	
	drawGameOver: function(ctx, mouse) {
		this.buttons["resumeButton"].draw(ctx,mouse);
		this.buttons["quitButton"].draw(ctx,mouse);
	},
	
	//Test to see if a certain button is clicked or not
	buttonClicked : function(buttonTitle)
	{
		return this.buttons[buttonTitle].isClicked();
	}//button clicked
};//end of Interface.js