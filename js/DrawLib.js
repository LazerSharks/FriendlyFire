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
	
	//draw an image
	
	drawImage: function(ctx, img, position, size, r){
	
		var halfW = size.x/2;
		var halfH = size.y/2;
	
		ctx.save();
		ctx.translate(position.x - halfW,position.y - halfH);
		ctx.rotate(r);
		ctx.drawImage(img, 0, 0, size.x, size.y);
		ctx.restore();
	},


};//end of drawlib