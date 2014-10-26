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

// loader.js - this loads and initializes all of the needed data 

"use strict";

//create the global application object if it doesn't exist
var app = app || {};

//"hashtable" of keycodes to their actual values
app.KEYBOARD = 
{
	"KEY_ESC": 27,
	"KEY_ENTER": 13,
	"KEY_LEFT": 37,
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_W": 87,
	"KEY_A": 65,
	"KEY_S": 83,
	"KEY_D": 68,
    "KEY_Q": 81,
    "KEY_E": 69,
	"KEY_P": 80,
    "KEY_I": 73,
    "KEY_J": 74,
    "KEY_K": 75,
    "KEY_L": 76,
    "KEY_U": 85,
    "KEY_O": 79
};

//mouse object with coords and click state
app.mouse = 
{
	x:0,
	y:0,
	clicked:false,
};

//"hashtable" of our images
app.IMAGES = 
{
	teamLogo: "images/Laser Shark.png",
	Spear: "images/Spear.png",
	Sword: "images/Sword.png",
	Mace: "images/Mace.png",
	Axe: "images/Axe.png",

	RedWalk: "images/RedWalk.png",
	RedAttack: "images/RedAttack.png",
	RedWeaponWalk: "images/RedWeaponWalk.png",
	RedWeaponAttack: "images/RedWeaponAttack.png",
	
	BlueWalk: "images/BlueWalk.png",
	BlueAttack: "images/BlueAttack.png",
	BlueWeaponWalk: "images/BlueWeaponWalk.png",
	BlueWeaponAttack: "images/BlueWeaponAttack.png",
	
	GreenWalk: "images/GreenWalk.png",
	GreenAttack: "images/GreenAttack.png",
	GreenWeaponWalk: "images/GreenWeaponWalk.png",
	GreenWeaponAttack: "images/GreenWeaponAttack.png",
	
	YellowWalk: "images/YellowWalk.png",
	YellowAttack: "images/YellowAttack.png",
	YellowWeaponWalk: "images/YellowWeaponWalk.png",
	YellowWeaponAttack: "images/YellowWeaponAttack.png",

	EnemyWalk: "images/EnemyWalk.png",
	EnemyAttack: "images/EnemyAttack.png",
	
	Castle: "images/Castle.png",
	Tombstone: "images/Tombstone.png",
	controls: "images/controls.png",
	
	flagBritain: "images/gb.png",
	flagFrance: "images/fr.png",
	flagItaly: "images/it.png",
	flagGermany: "images/de.png",
	flagUS: "images/us.png",
	flagCanada: "images/ca.png"
};

//array of booleans representing pressed keys
app.keydown = [];
app.keyPress = [];

//Run loader.js when the window loads
window.onload = function() {
    
	//When a key is pressed set its place in the array to true
	window.addEventListener("keydown", function(e){
		if (!app.keyPress[e.keyCode] && !app.keydown[e.keyCode]) {
            app.keyPress[e.keyCode] = true;
        }
		app.keydown[e.keyCode] = true;
        //newly pressed keys go into the keypress array
	});
	
	//when a key is released set its place in the array to false
	window.addEventListener("keyup", function(e){
		app.keydown[e.keyCode] = false;
	});
	
	// hook the interface up to the controller
	app.FriendlyFire.userInterface = app.Interface;
	
	//Give the app variable to objects that need to access it
	app.FriendlyFire.app = app;
	app.Player.prototype.app = app;
	
	//preload Images and Sound and then run FriendlyFire.init
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function()
	{
		app.FriendlyFire.init();
	});
	app.queue.loadManifest([
		{id: "teamLogo", src:"images/Laser Shark.png"},
		{id: "Spear", src:"images/Spear.png"},
		{id: "Sword", src:"images/Sword.png"},
		{id: "Mace", src:"images/Mace.png"},
		{id: "Axe", src:"images/Axe.png"},
	
		{id: "RedWalk", src:"images/RedWalk.png"},
		{id: "RedAttack", src:"images/RedAttack.png"},
		{id: "RedWeaponWalk", src:"images/RedWeaponWalk.png"},
		{id: "RedWeaponAttack", src:"images/RedWeaponAttack.png"},
		
		{id: "BlueWalk", src:"images/BlueWalk.png"},
		{id: "BlueAttack", src:"images/BlueAttack.png"},
		{id: "BlueWeaponWalk", src:"images/BlueWeaponWalk.png"},
		{id: "BlueWeaponAttack", src:"images/BlueWeaponAttack.png"},
		
		{id: "GreenWalk", src:"images/Green Walk Cycle.png"},
		{id: "GreenAttack", src:"images/GreenAttack.png"},
		{id: "GreenWeaponWalk", src:"images/GreenWeaponWalk.png"},
		{id: "GreenWeaponAttack", src:"images/GreenWeaponAttack.png"},
		
		{id: "YellowWalk", src:"images/Yellow Walk Cycle.png"},
		{id: "YellowAttack", src:"images/YellowAttack.png"},
		{id: "YellowWeaponWalk", src:"images/YellowWeaponWalk.png"},
		{id: "YellowWeaponAttack", src:"images/YellowWeaponAttack.png"},
		
		{id: "EnemyWalk", src:"images/EnemyWalk.png"},
		{id: "EnemyAttack", src:"images/EnemyAttack.png"},
		{id: "Castle", src:"images/Castle.png"},
		{id: "Tombstone", src:"images/Tombstone.png"},
		{id: "controls", src:"images/controls.png"},
		
		{id: "flagBritain", src:"images/gb.png"},
		{id: "flagFrance", src:"images/fr.png"},
		{id: "flagItaly", src:"images/it.png"},
		{id: "flagGermany", src:"images/de.png"},
		{id: "flagUS", src:"images/us.png"},
		{id: "flagCanada", src:"images/ca.png"},
    ]);
		
	//Handle the mouses position.  It calls a method in FriendlyFire because
	//FriendlyFire knows about the canvas, therefore, we can get canvas coords, not screen coords
	window.addEventListener("mousemove", function(e){
        app.mouse.x = e.pageX - e.target.offsetLeft;
        app.mouse.y = e.pageY - e.target.offsetTop;
	});
	
	//Set the mouse's click state
	window.addEventListener("mousedown", function(e){app.mouse.clicked = true;});
	window.addEventListener("mouseup", function(e){app.mouse.clicked = false;});
	
}//end of loader.js