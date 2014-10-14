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
			"menuButton" : new app.Button(undefined,(this.WIDTH/2) +  20,675,50,50)
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
		
		//team logo splash screen
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