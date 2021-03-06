ZombieGame.GameOver = function (game) {};

var music;
var playbutton;
var bestscoretext;

ZombieGame.GameOver.prototype = {

	preload: function () {},

	create: function () {

		if (score > bestscore) {
			bestscore = score;
		}

		if (localStorage.getItem('myItemKey') <= bestscore) {
			localStorage.setItem('myItemKey', bestscore);
		} else {

		}
		var bg = this.game.add.sprite(0, 0, 'bg');
		var blurX = this.game.add.filter('BlurX');
		var blurY = this.game.add.filter('BlurY')
		bg.filters = [blurX, blurY];
		var logo = this.game.add.sprite(0, 0, 'logo');
		logo.width *= 0.75
		logo.height *= 0.75

		this.camera.y = 0;
		this.camera.x = 0;


		var tween = this.game.add.tween(bg).to({
			x: [-bg.width + 800, 0, -bg.width + 800, 0, 0],
			y: [-bg.height + 600, -bg.height / 2, 0, -bg.height + 600, 0]
		}, 15000, null, true, 0, -1);

		playbutton = this.add.button(780, 375, "retrybutton", this.playTheGame, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		playbutton = this.add.button(780, 465, "menubutton", this.mainmenu, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		musicbutton = this.game.add.button(800, 600, 'musicbutton', function () {
			if (playmusic) {
				playmusic = false;
				music.pause();
			} else {
				playmusic = true;
				music.resume();
			}
		});
		musicbutton.anchor.x = 1;
		musicbutton.anchor.y = 1;
		musicbutton.fixedToCamera = true;

		soundbutton = this.game.add.button(800 - 32, 600, 'soundbutton', function () {
			if (playsound) {
				playsound = false;
			} else {
				playsound = true;
			}

		});
		soundbutton.anchor.x = 1;
		soundbutton.anchor.y = 1;
		soundbutton.fixedToCamera = true;

		this.add.sprite(10, 300, "black");
		scoretext = this.add.text(20, 350, "Score:" + " " + score, {
			font: "64px bebas_neueregular",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 4,
		});
		bestscoretext = this.add.text(20, 450, "HighScore:" + " " + bestscore, {
			font: "64px bebas_neueregular",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 4,
		});


	},

	update: function () {},
	playTheGame: function () {
		this.state.start("Game");
	},

	mainmenu: function () {
		this.state.start("MainMenu");
	}

};