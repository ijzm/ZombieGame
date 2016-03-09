ZombieGame.Preloader = function (game) { //declare the Preloader function

	this.background = null;

	this.ready = false;


	WebFontConfig = {

		//  'active' means all requested fonts have finished loading
		//  We set a 1 second delay before calling 'createText'.
		//  For some reason if we don't the browser cannot render the text the first time it's created.
		active: function () {
			game.time.events.add(Phaser.Timer.SECOND, createText, this);
		},

		//  The Google Fonts we want to load (specify as many as you like in the array)
		google: {
			families: ['Press Start 2P']
		}

	};

};

ZombieGame.Preloader.prototype = {

	preload: function () {
		//load all the required assets in the game - sprites, music, fonts,etc
		this.load.image('playbutton', 'assets/playbutton.png');
		this.load.image('creditsbutton', 'assets/creditsbutton.png');
		this.load.image('helpbutton', 'assets/helpbutton.png');
		this.load.image('menubutton', 'assets/menubutton.png');
		this.load.image('retrybutton', 'assets/retrybutton.png');
		this.load.spritesheet('button', 'assets/button.png', 64, 64);
		this.load.image('buttonlocked', 'assets/buttonlocked.png');
		this.load.image('soundbutton', 'assets/soundbutton.png');
		this.load.image('logo', 'assets/logo.png');

		this.load.spritesheet('char', 'assets/player.png', 56, 43);
		this.load.spritesheet('gunhud', 'assets/gunhud.png', 64, 64);
		this.load.image('bg', 'assets/bg.png');
		this.load.image('credits', 'assets/credits.png');
		this.load.image('help', 'assets/help.png');


		this.load.tilemap('00', 'maps/00.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('tiles', 'assets/tiles.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.image('crate', 'assets/crate.png');
		this.load.image('minimap', 'maps/minimap.png');
		this.load.image('pointer', 'maps/pointer.png');



		this.load.audio('menumusic', 'assets/menumusic.mp3');

		this.time.advancedTiming = true;


	},

	create: function () {},

	update: function () {

		//checking whether the music is ready to be played before proceeding to the Main Menu.
		if (this.cache.isSoundDecoded('menumusic') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};