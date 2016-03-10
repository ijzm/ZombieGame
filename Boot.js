var ZombieGame = {}; //declare the object that will hold all game states
var clicks = 0; // basic global variables
var playmusic = true; //global toggle to control music play across states
var playsound = true;
var desktop;

var score = 0;
var lastscore = 0;
var canclick = false;
var level;

var debug = 0;

ZombieGame.Boot = function (game) { //declare the boot state

};

ZombieGame.Boot.prototype = {

	preload: function () {
		//load assets for the loading screen
		//this.load.image('preloaderBackground', 'assets/preloadbck.png');
		//this.load.image('preloaderBar', 'assets/preloadbar.png');

	},

	create: function () {

		this.state.start('Preloader'); //start the Preloader state
		if (this.game.device.desktop) {
			desktop = 1;
		} else {
			desktop = 0;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 0;
			this.scale.minHeight = 0;
			this.scale.maxWidth = 1980;
			this.scale.maxHeight = 1080;
			this.game.scale.refresh();
		}

	}
};