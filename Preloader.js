ZombieGame.Preloader = function (game) { //declare the Preloader function

	this.background = null;

	this.ready = false;
};

ZombieGame.Preloader.prototype = {


	preload: function () {
		//load all the required assets in the game - sprites, music, fonts,etc
		this.load.image('playbutton', 'assets/playbutton.png');
		this.load.image('creditsbutton', 'assets/creditsbutton.png');
		this.load.image('helpbutton', 'assets/helpbutton.png');
		this.load.image('menubutton', 'assets/menubutton.png');
		this.load.image('retrybutton', 'assets/retrybutton.png');
		this.load.image('soundbutton', 'assets/soundbutton.png');
		this.load.image('logo', 'assets/logo.png');

		this.load.spritesheet('char', 'assets/player.png', 56, 43);
		this.load.spritesheet('gunhud', 'assets/gunhud.png', 64, 64);
		this.load.spritesheet('gunhud2', 'assets/gunhud2.png', 64, 64);

		this.load.image('credits', 'assets/credits.png');
		this.load.image('help', 'assets/help.png');


		this.load.tilemap('00', 'maps/00.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('tiles', 'assets/tiles.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.image('crate', 'assets/crate.png');
		this.load.image('minimap', 'maps/minimap.png');
		this.load.image('pointer', 'maps/pointer.png');
		this.load.image('bg', 'maps/bg.png');
		this.load.image('screen', 'assets/screen.png');
		this.load.image('controls', 'assets/controls.png');
		this.load.image('control', 'assets/control.png');
		this.load.image('hud', 'assets/hud.png');

		this.load.audio('menumusic', 'assets/menumusic.mp3');



		this.time.advancedTiming = true;

		this.game.load.script('filterX', 'assets/filters/BlurX.js');
		this.game.load.script('filterY', 'assets/filters/BlurY.js');


		this.game.load.start();


	},

	create: function () {},

	update: function () {

		//checking whether the music is ready to be played before proceeding to the Main Menu.
		if (this.cache.isSoundDecoded('menumusic') && this.ready === false) {
			this.ready = true;
			this.state.start('MainMenu');
		}

	}



};