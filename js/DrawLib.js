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
		ctx.save();
		ctx.translate(position.x,position.y);
		ctx.rotate(r);
		ctx.fillStyle = color;
		ctx.fillRect(-size.x/2,-size.y/2,size.x, size.y);
		ctx.restore();
	},
	
	//draw an image
	
	drawImage: function(ctx, img, position, size, r){
		ctx.save();
		ctx.translate(position.x,position.y);
		ctx.rotate(r);
		ctx.drawImage(img, 0, 0, size.x, size.y);
		ctx.restore();
	},


};//end of drawlib