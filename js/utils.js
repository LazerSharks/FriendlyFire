// utils.js

"use strict";

/*
Function Name: clamp(val, min, max)
Return Value: returns a value that is constrained between min and max (inclusive) 
*/


function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}

var app = app || {};





//----------------------------------------------Vector--------------------------------------



app.Vector = function()
{
	//constructor for the vector class
	function Vector(x,y)
	{
		this.x = x;
		this.y = y;
	};
	
	var p = Vector.prototype;
	
	//Vector magnitude function, determines and returns the length of the vector
	p.magnitude = function()
	{
		var magnitude = Math.sqrt((this.x * this.x)+(this.y * this.y));
		return magnitude;
	};
	
	//Vector distance function, takes a vector to determine the length as a parameter
	//returns the value of distance between the two vectors
	p.distance = function(vec)
	{
		var xsquared = (this.x - vec.x) * (this.x - vec.x);
		var ysquared = (this.y - vec.y) * (this.y - vec.y);
		var distance = Math.sqrt(xsquared + ysquared);
		
		return distance;
	};
	
	//Vector sum function, takes a vector to add as a parameter
	//returns the resulting vector
	p.sum = function(vec)
	{
		var output = new app.Vector(this.x + vec.x, this.y + vec.y);
		return output;
	};
	
	//Vector subtraction function, takes a vector to subtract as a parameter
	//returns the resulting vector
	p.difference = function(vec)
	{
		var output = new app.Vector(this.x - vec.x, this.y - vec.y);
		return output;
	};
    
    //returns a new copy of the same vector
    p.copy = function() {
        return new app.Vector(this.x, this.y);
    }
	
	return Vector;
}();





//----------------------------drawlibrary-------------------------------



app.DrawLib = {

	//draw a rectangle
	drawRect: function(color, position, size, r){
		app.FriendlyFire.ctx.save();
		app.FriendlyFire.ctx.translate(position.x,position.y);
		app.FriendlyFire.ctx.rotate(r);
		app.FriendlyFire.ctx.fillStyle = color;
		app.FriendlyFire.ctx.fillRect(-size.x/2,-size.y/2,size.x, size.y);
		app.FriendlyFire.ctx.restore();
	},
	
	//draw a given image using the context
	drawImage: function(img, sourceX, sourceY, sourceW, sourceH, position, size, r){
		//setup the context
		app.FriendlyFire.ctx.save();
		app.FriendlyFire.ctx.translate(position.x,position.y);
		app.FriendlyFire.ctx.rotate(r);
		//display image
		app.FriendlyFire.ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, size.x, size.y);
		app.FriendlyFire.ctx.restore();
	},

	//draws a stroke rectangle around where an object should be given it's position and size
	debugRect: function(object)
	{
		app.FriendlyFire.ctx.save();
		app.FriendlyFire.ctx.strokeStyle = "black";
		app.FriendlyFire.ctx.lineWidth = 5;
		app.FriendlyFire.ctx.strokeRect(object.position.x - object.size.x/2, object.position.y - object.size.y/2, object.size.x, object.size.y);
		app.FriendlyFire.ctx.restore();
	},

};//end of drawlib