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

		playbutton = this.add.button(780, 375, "playbutton", this.playTheGame, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		helpbutton = this.add.button(780, 475, "helpbutton", this.help, this);
		helpbutton.anchor.x = 1;
		helpbutton.anchor.y = 1;

		creditsbutton = this.add.button(780, 575, "creditsbutton", this.credits, this);
		creditsbutton.anchor.x = 1;
		creditsbutton.anchor.y = 1;

		credits = this.game.add.sprite(0, 0, 'credits');
		credits.alpha = 0

		help = this.game.add.sprite(0, 0, 'help');
		help.alpha = 0

		menubutton = this.add.button(20, 575, "menubutton", this.mainmenu, this);
		menubutton.anchor.y = 1;
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
		this.state.start("Game");
		music.stop();
	},
	help: function () {
		help.alpha = 1;
		menubutton.alpha = 1;
		logo.alpha = 0;
		playbutton.alpha = 0;
		helpbutton.alpha = 0;
		creditsbutton.alpha = 0;
	},
	credits: function () {
		menubutton.alpha = 1;
		credits.alpha = 1;
		logo.alpha = 0;
		playbutton.alpha = 0;
		helpbutton.alpha = 0;
		creditsbutton.alpha = 0;
	},
	mainmenu: function () {
		menubutton.alpha = 0;
		credits.alpha = 0;
		help.alpha = 0;
		logo.alpha = 1;
		playbutton.alpha = 1;
		helpbutton.alpha = 1;
		creditsbutton.alpha = 1;
	},

};