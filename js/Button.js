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

//Button.js is the "class" for our button objects

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the "IIFE"/Class for the Button
app.Button = function()
{

	//Button constructor
	function Button(image,x,y,width,height) 
	{
		// Instance variables of Button
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = width;
		this.scale = 1;
		
		//set the image and default "backup" color
		this.image = image;
		this.color = "red";
		this.clicked = false;
		
	};//constructor
		
	// Prototype for making functions/methods available outside of the class
	var p = Button.prototype;
	
	//Button Draw Method
	p.draw = function(ctx,mouse) 
	{
		ctx.save();
		
		//drawing origin is top left corner
		//use this to center image on (x,y)
		var halfW = (this.width * this.scale)/2;
		var halfH = (this.height * this.scale)/2;
		
		//test to see if there is an image and draw accordingly
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width * this.scale, this.height * this.scale);
			
		} else{
			ctx.drawImage(this.image,this.x - halfW, this.y - halfH, this.width * this.scale, this.height * this.scale);
		}//if image
		
		ctx.restore();
		
		//handle any input
		update(mouse,this);
	};//draw
	
	//accessor/get for clicked state
	p.isClicked = function() {return this.clicked;};
	
	// private functions/methods
	
	// This checks to see that the mouse is within the button
	// takes mouse and this as params
	function containsMouse(mouse,that) 
	{
		//was originally having object access issues, this can be cleaned up later
		var mx = mouse.x;
		var my = mouse.y;
		
		//if the mouse coords are within the button return true
		if(mx > that.x - that.width/2 && mx < that.x + that.width/2
			&& my > that.y - that.height/2 && my < that.y + that.height/2)
			return true;
		else
			return false;
			
	};//contains mouse
	
	//Button update function
	function update(mouse,that) 
	{
		//handle mouse input
		handleMouse(containsMouse(mouse,that),that,mouse);
	};//update
	  
	//This handles all input to be gathered from the mouse
	//Event handler is in loader.js.  Coordinates are determined in FriendlyFire.js
	function handleMouse(hovering,that,mouse)
	{
		//if hovering enlarge button and set click state to the mouse's click state
		if(hovering)
		{
			that.scale = 2;
			that.clicked = mouse.clicked;
		}
		else
		{
			that.scale = 1;
			that.clicked = false;
		}
			
	};//hover
	
	return Button;
	
}();//end of Button.js
