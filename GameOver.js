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
		this.game.add.sprite(0, 0, 'bg');
		this.camera.y = 0;
		this.camera.x = 0;

		this.game.add.sprite(20, 20, 'logo');

		playbutton = this.add.button(780, 350, "retrybutton", this.playTheGame, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		playbutton = this.add.button(780, 450, "menubutton", this.mainmenu, this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;

		music = this.add.audio('menumusic');
		//music.loopFull();


		scoretext = this.add.text(0, 0, score, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		bestscoretext = this.add.text(500, 0, bestscore, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});


	},

	update: function () {},
	playTheGame: function () {
		console.log("PLAY");
		this.state.start("Game");
		music.stop();
	},

	mainmenu: function () {
		console.log("MainMenu");
		this.state.start("MainMenu");
	}

};