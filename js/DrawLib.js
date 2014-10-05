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
	
	//draw a given image using the context
	drawImage: function(ctx, img, sourceX, sourceY, sourceW, sourceH, position, size, r){
		//setup the context
		ctx.save();
		ctx.translate(position.x,position.y);
		ctx.rotate(r);
		//display image
		ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, size.x, size.y);
		ctx.restore();
	},

	//draws a stroke rectangle around where an object should be given it's position and size
	debugRect: function(ctx, object)
	{
		ctx.save();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 5;
		ctx.strokeRect(object.position.x - object.size.x/2, object.position.y - object.size.y/2, object.size.x, object.size.y);
		ctx.restore();
	},

};//end of drawlib