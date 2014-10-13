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

//Vector.js is the "class" for our vector "objects"

"use strict";

//Create the global app object if needed
var app = app || {};

// This is the "IIFE"/Class for the Vector
app.Vector = function()
{
	//constructor for the vector class
	function Vector(x,y)
	{
		this.x = x;
		this.y = y;
	};
	
	//constructor that takes an angle 
	Vector.vectorFromAngle = function(angle)
	{
		var x = Math.cos(angle);
		var y = Math.sin(angle);
		return new app.Vector(x,y);
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
	
	//returns a vector with a magnitude of 1
	p.normalized = function()
	{
		var length = this.magnitude();
		return new app.Vector(this.x/length,this.y/length);
	};
	
	//get the angle of a vector
	p.getAngle = function()
	{
		return Math.atan2(this.y,this.x);
	};
	
	//set the magnitude of a vector
	p.setMag = function(mag)
	{
		var angle = this.getAngle();
		this.x = mag * Math.cos(angle);
		this.y = mag * Math.sin(angle);
	};
	
	//limit the magnitude of the vector
	p.limit = function(limit)
	{
		var mag = this.mag();
		if(mag > limit)
		{
			this.setMag(limit);
		}
	};
	
	//rotate the vector by an angle
	p.rotate = function(angle)
	{
		var mag - this.mag();
		var newAngle = angle + this.getAngle();
		this.x = mag * Math.cos(newAngle);
		this.y = mag * Math.sin(newAngle);
	};
	
	//multiply the vector by a scalar
	p.mult = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
	};
	
	return Vector;
}();