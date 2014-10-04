/*
	Friendly Fire
	
	Alex Fuerst, 
	Mario Chuman,
	David Erbelding,
	Brian Nugent,
	Ryan Farrell,

	Game Design and Development 2
	10/3/2014

*/

//DrawLib.js will carry functions for draw calls

"use strict";

//Create the global app object if needed
var app = app || {};


app.DrawLib = {

	//draw a rectangle
	drawRect: function(ctx, color, position, size, r){
		
		//determine the center of the image
		var halfW = size.x/2;
		var halfH = size.y/2;
		
		ctx.save();
		ctx.translate(position.x - halfW,position.y - halfH);
		ctx.rotate(r);
		ctx.fillStyle = color;
		ctx.fillRect(0,0,size.x, size.y);
		ctx.restore();
	},
	
<<<<<<< HEAD
	//draw an image
	
	drawImage: function(ctx, img, position, size, r){
	
		var halfW = size.x/2;
		var halfH = size.y/2;
	
=======
	//draw a given image using the context
	drawImage: function(ctx, img, sourceX, sourceY, sourceW, sourceH, position, size, r){
		//setup the context
>>>>>>> ff85fee757c58415d1560523c3c637c65c9cf081
		ctx.save();
		ctx.translate(position.x - halfW,position.y - halfH);
		ctx.rotate(r);
		//display image
		ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, size.x, size.y);
		ctx.restore();
	}


};//end of drawlib