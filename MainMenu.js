ZombieGame.MainMenu = function (game) {};

var music;
var playbutton;
var helpbutton;
var creditsbutton;
var menubutton;
var credits;
var help;
var bg;
var tween;
var h, w;
var logo;

ZombieGame.MainMenu.prototype = {

	preload: function () {
		this.game.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
		this.game.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
	},

	create: function () {

		bg = this.game.add.sprite(0, 0, 'bg');
		var blurX = this.game.add.filter('BlurX');
		var blurY = this.game.add.filter('BlurY')
		bg.filters = [blurX, blurY];
		logo = this.game.add.sprite(0, 0, 'logo');
		logo.width *= 0.75
		logo.height *= 0.75

		this.camera.y = 0;
		this.camera.x = 0;

		playbutton = this.add.button(780, 350, "playbutton", this.playTheGame, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		helpbutton = this.add.button(780, 450, "helpbutton", this.help, this);
		helpbutton.anchor.x = 1;
		helpbutton.anchor.y = 1;

		creditsbutton = this.add.button(780, 550, "creditsbutton", this.credits, this);
		creditsbutton.anchor.x = 1;
		creditsbutton.anchor.y = 1;

		credits = this.game.add.sprite(0, 0, 'credits');
		credits.alpha = 0

		help = this.game.add.sprite(0, 0, 'help');
		help.alpha = 0

		menubutton = this.add.button(20, 520, "menubutton", this.mainmenu, this);
		menubutton.alpha = 0;

		music = this.add.audio('menumusic');
		music.loopFull();

		var tween = this.game.add.tween(bg).to({
			x: [-bg.width + 800, 0, -bg.width + 800, 0, 0],
			y: [-bg.height + 600, -bg.height / 2, 0, -bg.height + 600, 0]
		}, 15000, null, true, 0, -1);

	},

	update: function () {},
	playTheGame: function () {
		console.log("PLAY");
		this.state.start("Game");
		music.stop();
	},
	help: function () {
		music.stop();
		console.log("help");
		help.alpha = 1;
		menubutton.alpha = 1;
	},
	credits: function () {
		music.stop();
		console.log("credits");
		menubutton.alpha = 1;
		credits.alpha = 1;
	},
	mainmenu: function () {
		music.loopFull();
		menubutton.alpha = 0;
		credits.alpha = 0;
		help.alpha = 0;
	},

};