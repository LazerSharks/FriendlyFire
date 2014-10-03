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

//DrawLib.js will carry functions for draw calls

"use strict";

//Create the global app object if needed
var app = app || {};


app.DrawLib = {
	//canvas and context objects
	drawRect: function(ctx, color, x, y, w, h, r){
		ctx.save();
		ctx.translate(x,y);
		ctx.rotate(r);
		ctx.fillStyle = color;
		ctx.fillRect(-w/2,-h/2,w,h);
		ctx.restore();
	},






};//end of drawlib