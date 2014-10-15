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
		this.color = "#665500";
		
		//Create hash table of buttons
		this.buttons =
		{
			"menuButton" : new app.Button(undefined,(this.WIDTH/2) +  20,675,50,50),
			"easyButton" : new app.Button(undefined,(this.WIDTH/2) - 145,310,50,50),
			"mediumButton" : new app.Button(undefined,(this.WIDTH/2) - 130,450,50,50),
			"hardButton" : new app.Button(undefined,(this.WIDTH/2) - 140,585,50,50),
			"endlessButton" : new app.Button(undefined,(3*this.WIDTH/4) + 25,330,50,50),
			"twoPlayerButton" : new app.Button(undefined,(3*this.WIDTH/4) + 65,500,50,50)
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
		var image = new Image();
		image.src = this.images['controlMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw main menu
	
	//Draw main menu UI
	drawControls : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = new Image();
		image.src = this.images['controlMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw main menu
	
		//Draw instructions UI
	drawInstructions : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = new Image();
		image.src = this.images['instructionMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw instructions	
	drawTwoPlayer : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = new Image();
		image.src = this.images['twoPlayer'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		//draw the menu button since we are in the menu
		this.buttons["menuButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw instructions	
	
	//Draw difficulty select UI
	drawDifficulty : function(ctx, mouse) {
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		//menu splash screen
		var image = new Image();
		image.src = this.images['difficultyMenu'];
		
		//test to see if there is an image and draw accordingly
		if(!image){
			ctx.fillStyle = this.color;
			ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
		}else{
			ctx.drawImage(image,0,0, this.WIDTH, this.HEIGHT);
		}//if image
		
		//draw the menu button since we are in the menu
		this.buttons["easyButton"].draw(ctx,mouse);
		this.buttons["mediumButton"].draw(ctx,mouse);
		this.buttons["hardButton"].draw(ctx,mouse);
		this.buttons["endlessButton"].draw(ctx,mouse);
		this.buttons["twoPlayerButton"].draw(ctx,mouse);
		
		ctx.restore();
	},//draw instructions
	
	drawGame : function(ctx, mouse) {
		//console.log("drawGame");
	},
	
	drawPaused: function(ctx, mouse) {
		console.log("paused");
	},
	
	//Test to see if a certain button is clicked or not
	buttonClicked : function(buttonTitle)
	{
		return this.buttons[buttonTitle].isClicked();
	}//button clicked
};//end of Interface.js