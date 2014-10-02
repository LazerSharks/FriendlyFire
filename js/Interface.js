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
	WIDTH: 0,
	HEIGHT: 0,
	images: [],
	
	//Interface constructor
	init : function(images, canvasWidth, canvasHeight) 
	{
		this.WIDTH = canvasWidth;
		this.HEIGHT = canvasHeight;
		this.images = images;
		this.color = "yellow";
		
	},
	
	//--------------------Interface Draw Methods--------------------------
	
	//Draw intro scene
	drawIntro : function(ctx) 
	{
		ctx.save();
	
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
	drawMainMenu : function(ctx)
	{
		//this is still bare.  Needs to be replaced with various things
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.font = "70px Verdana";
		ctx.fillText("This Will Be The Main Menu", 100, 200);
		ctx.fillText("Hit Enter To Play", 100, 300);
		
		ctx.restore();
	},//draw main menu
	
};//end of Interface.js