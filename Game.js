ZombieGame.Game = function (game) {};

var player;
var zombies;
var crates;

var bullets;
var fireRate = [500, 50, 1000];
var nextFire = 0;
var bulletdamage = [4, 15 / 10, 10];
var accuarcity = [15, 40, 0];

var layer;
var map;

var pspeed = 300;

var bulletstext;
var bulletsremaining = [10, 100, 5];

var scoretext;

var selectedweapon = 0;
var gunhud;

var zombiemaxhealth = 10;
var zombieindex = 0;

var minimap;
var pointer;

var boxes;
var boxindex = 0;
var bonusbullets = [10, 50, 3];

var screene;

var timeleft;
var timelefttext;
var maxtimeleft = 30;
var nextbonus = 1000;

var boxspawns = [];
var fuckyou;

var controlimage;
var cu, cr, cd, cl;
var joystiick;

var hud;
var gunhud2;
var guntween;





ZombieGame.Game.prototype = {

	preload: function () {},

	create: function () {

		fuckyou = 60;
		score = 0;
		zombieindex = 0;
		boxindex = 0;
		bulletsremaining = [10, 100, 5];
		fireRate = [500, 50, 1000];
		bulletdamage = [4, 15 / 10, 10];
		accuarcity = [15, 40, 0];
		maxtimeleft = 30;
		timeleft = maxtimeleft;
		nextbonus = 1000;
		boxspawns = [];
		//Map Stuff
		map = this.add.tilemap('00');
		map.addTilesetImage('tiles', 'tiles');

		layer = map.createLayer('00');
		layer.resizeWorld();

		crates = this.add.group();
		crates.enableBody = true;
		map.createFromTiles(129, 1, "crate", layer, crates);

		hud = this.add.sprite(0, 0, "hud");
		hud.fixedToCamera = true;

		minimap = this.add.sprite(800, 0, "minimap");
		minimap.anchor.x = 1;
		minimap.anchor.y = 0;
		minimap.fixedToCamera = true;

		pointer = this.add.sprite(0, 0, "pointer");
		pointer.anchor.x = 0.5;
		pointer.anchor.y = 0.5;
		pointer.fixedToCamera = true;

		this.physics.startSystem(Phaser.Physics.ARCADE);

		var px, py;

		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(100, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);

		zombies = this.add.group();
		this.physics.arcade.enable(zombies);
		zombies.enableBody = true;


		boxes = this.add.group();
		this.physics.arcade.enable(boxes);
		boxes.enableBody = true;

		//timers
		this.timer2 = this.game.time.create(false);
		this.timer2.loop(5000, function () {
			if (boxes.length >= 75) {} else {
				this.createbox();
			}
			maxtimeleft--;
		}, this);
		this.timer2.start();

		this.timer3 = this.game.time.create(false);
		this.timer3.loop(1000, function () {
			timeleft--;
		}, this);
		this.timer3.start();

		map.setCollisionBetween(109, 126);
		map.setCollisionBetween(136, 153);
		map.setCollisionBetween(163, 180);
		map.setCollisionBetween(190, 207);
		map.setCollisionBetween(217, 234);
		map.setCollisionBetween(244, 261);

		map.setCollisionBetween(280, 288);
		map.setCollisionBetween(307, 315);
		map.setCollisionBetween(334, 342);
		map.setCollisionBetween(361, 368);
		map.setCollisionBetween(388, 396);
		map.setCollisionBetween(415, 423);



		//texts
		bulletstext = this.add.text(64, 0, bulletsremaining[selectedweapon], {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3
		});
		bulletstext.anchor.x = 0;
		bulletstext.anchor.y = 0;
		bulletstext.fixedToCamera = true;

		scoretext = this.add.text(700, 0, score, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		scoretext.anchor.x = 1;
		scoretext.anchor.y = 0;
		scoretext.fixedToCamera = true;

		gunhud = this.add.sprite(0, 0, "gunhud");
		gunhud.fixedToCamera = true;
		gunhud2 = this.add.sprite(0, 64, "gunhud2");
		gunhud2.fixedToCamera = true;
		//	gunhud2.alpha = 0;


		timelefttext = this.add.text(400, 0, timeleft + "/" + maxtimeleft, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		timelefttext.anchor.x = 0.5;
		timelefttext.fixedToCamera = true;


		/*this.game.input.keyboard.onDownCallback = function (e) {
				console.log(e.keyCode);

			}
			*/

		screene = this.add.sprite(800 / 2, 600 / 2, "screen");
		screene.anchor.x = 0.5;
		screene.anchor.y = 0.5;
		screene.fixedToCamera = true;
		screene.alpha = 0;
		screene.enableBody = true;
		this.physics.arcade.enable(screene);

		if (!desktop) {
			//cu, cur, cr, cdr, cd, cdl, cl;
			controlimage = this.add.sprite(0, this.game.height, "controls");
			controlimage.anchor.y = 1;
			controlimage.fixedToCamera = true;



			cu = this.add.sprite(53, this.game.height - (53 * 3), "control");
			cu.fixedToCamera = true;
			this.physics.arcade.enable(cu);
			cu.enableBody = true;


			cl = this.add.sprite(0, this.game.height - (53 * 2), "control");
			this.physics.arcade.enable(cl);
			cl.fixedToCamera = true;

			cr = this.add.sprite(53 * 2, this.game.height - (53 * 2), "control");
			this.physics.arcade.enable(cr);
			cr.fixedToCamera = true;


			cd = this.add.sprite(53, this.game.height - (53), "control");
			this.physics.arcade.enable(cd);
			cd.fixedToCamera = true;



			joystiick = this.game.add.sprite(53, this.game.height - 53 * 2, "control");
			joystiick.fixedToCamera = true;
			joystiick.inputEnabled = true;
			joystiick.input.enableDrag(false, true, false);
			joystiick.enableBody = true;
			this.physics.arcade.enable(joystiick);
			//joystiick.input.boundsSprite = controlimage;



		}
		this.createplayer();
		this.input.mouse.mouseWheelCallback = this.mouseWheel.bind(this);
		gunhud2.alpha = 0;
		guntween = this.game.add.tween(gunhud2).to({
			alpha: 0
		}, 500);

		guntween.onComplete.add(function () {
			this.game.add.tween(gunhud2).to({
				alpha: 0
			}, 500);
		}, this);

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

		soundbutton = this.game.add.button(800 - 16, 600, 'soundbutton', function () {
			if (playsound) {
				playsound = false;
			} else {
				playsound = true;
			}

		});
		soundbutton.anchor.x = 1;
		soundbutton.anchor.y = 1;
		soundbutton.fixedToCamera = true;


	},

	update: function () {
		/*if (this.physics.arcade.overlap(joystiick, cu)) {
			console.log("TEST");
			player.body.velocity.y = -pspeed;
		}*/


		if (fuckyou >= 1) {
			this.createzombie();
			fuckyou--;
		}
		player.bringToTop();
		hud.bringToTop();
		minimap.bringToTop();
		pointer.bringToTop();
		scoretext.bringToTop();
		timelefttext.bringToTop();
		gunhud.bringToTop();
		gunhud2.bringToTop();
		bulletstext.bringToTop();
		player.frame = selectedweapon;
		gunhud.frame = selectedweapon;

		this.physics.arcade.collide(player, layer);
		this.physics.arcade.collide(player, boxes, this.collectbullets);
		this.physics.arcade.collide(bullets, layer, function (x, y) {
			//x.x = -1337;
			x.kill();
		});

		if (timeleft <= 0) {
			this.game.state.start("GameOver")
		}

		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			one: this.input.keyboard.addKey(49),
			two: this.input.keyboard.addKey(50),
			three: this.input.keyboard.addKey(51),
			dbug: this.input.keyboard.addKey(220),

		};
		if (wasd.up.isDown || cursors.up.isDown /* || this.physics.arcade.overlap(joystiick, cu)*/ ) {
			player.body.velocity.y = -pspeed;
		} else if (wasd.down.isDown || cursors.down.isDown /* || this.physics.arcade.overlap(joystiick, cd)*/ ) {
			player.body.velocity.y = pspeed;

		} else {
			player.body.velocity.y = 0;
		}
		if (wasd.left.isDown || cursors.left.isDown /* || this.physics.arcade.overlap(joystiick, cl)*/ ) {
			player.body.velocity.x = -pspeed;
		} else if (wasd.right.isDown || cursors.right.isDown /* || this.physics.arcade.overlap(joystiick, cr)*/ ) {
			player.body.velocity.x = pspeed;
		} else {
			player.body.velocity.x = 0;
		}

		player.rotation = this.physics.arcade.angleToPointer(player)

		if (this.input.activePointer.isDown) {
			this.fire();
		}

		zombies.forEachAlive(this.zombieupdate, this.game.physics.arcade)

		this.game.physics.arcade.collide(player, crates, this.collectbullets)

		this.updatetext();


		if (wasd.one.isDown) {
			selectedweapon = 0
		} else if (wasd.two.isDown) {
			selectedweapon = 1
		} else if (wasd.three.isDown) {
			selectedweapon = 2
		}

		if (wasd.dbug.isDown) {
			if (debug) {
				debug = false;
			} else {
				debug = true;
			}
		}

		pointer.cameraOffset.x = (map.getTileWorldXY(player.x, player.y, 64, 64, layer, true)).x + 700;
		pointer.cameraOffset.y = (map.getTileWorldXY(player.x, player.y, 64, 64, layer, true)).y;

		if (score >= nextbonus) {
			nextbonus += 1000;
			if (maxtimeleft + 5 >= 60) {
				maxtimeleft = 60;
			} else {
				maxtimeleft += 5;
			}
		}

	},

	render: function () {
		if (debug) {
			this.game.debug.body(player);
			zombies.forEach(function (singleEnemy) {
				this.body(singleEnemy);
			}, this.game.debug);
			bullets.forEach(function (singleEnemy) {
				this.body(singleEnemy);
			}, this.game.debug);
			this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
		}

	},

	fire: function () {
		if (bulletsremaining[selectedweapon]) {
			if (this.time.now > nextFire && bullets.countDead() > 0) {
				nextFire = this.time.now + fireRate[selectedweapon];
				var bullet = bullets.getFirstExists(false);
				bullet.anchor.x = 0.5;
				bullet.anchor.x = 0.5;
				bullet.reset(player.x, player.y);
				bullet.damage = bulletdamage[selectedweapon];
				bullet.rotation = this.physics.arcade.moveToXY(bullet, this.input.activePointer.worldX + this.weaponpresition(accuarcity[selectedweapon]), this.input.activePointer.worldY + this.weaponpresition(accuarcity[selectedweapon]), 800)


				bullet.body.setSize(7, 7, 0, 0);

				bulletsremaining[selectedweapon]--;
				if (playsound) {
					gunshot.play();

				}
			}
		}

	},

	weaponpresition: function (foo) {
		return (Math.floor((Math.random() * 2 * foo) - foo));
	},

	updatetext: function () {
		bulletstext.setText(bulletsremaining[selectedweapon]);
		scoretext.setText(score);
		timelefttext.setText(timeleft + "/" + maxtimeleft);
	},
	collectbullets: function (x, y) {
		y.destroy();
		score += 50;
		var ignacio = Math.floor(Math.random() * 3);
		bulletsremaining[ignacio] += bonusbullets[ignacio];
		gunhud2.frame = ignacio;
		gunhud2.alpha = 1;
		guntween.start();
		if (playsound) {
			pickbullets.play();

		}

	},
	zombieupdate: function (singleEnemy) {


		this.moveToObject(singleEnemy, player);

		this.collide(singleEnemy, player, function () {
			this.game.state.start("GameOver");
		}, null, this);

		this.collide(singleEnemy, zombies);

		singleEnemy.rotation = this.angleToXY(singleEnemy, player.x, player.y);

		this.overlap(singleEnemy, bullets, function (x, y) {
			this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function () {
				x.health -= y.damage;
			}, this);
			if (y.damage > 4) {} else {
				y.kill();
			}
		}, null, this);

		if (singleEnemy.health <= 0) {
			this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function () {
				singleEnemy.alive = false;
				singleEnemy.destroy();
				zombieindex--;
				score += 100;
				if (timeleft + 5 >= maxtimeleft) {
					timeleft = maxtimeleft;
				} else {
					timeleft += 5
				}

				fuckyou++;

				if (playsound) {
					zombiedead.play();
				}

			}, this);
		}
		if (this.overlap(singleEnemy, screene)) {

			this.collide(singleEnemy, layer);
		}

	},
	createzombie: function () {
		var zombie = zombies.create(this.world.randomX, this.world.randomY, 'enemy');
		var newhealth = Math.floor(Math.random() * zombiemaxhealth) + 1;
		zombies.set(zombies.children[zombieindex] === null ? console.log("null") : zombies.children[zombieindex], "health", newhealth);

		zombies.setAll('anchor.x', 0.5);
		zombies.setAll('anchor.y', 0.5);
		zombies.children[zombieindex] === null ? console.log("null") : zombies.children[zombieindex].body.setSize(40, 40, 0, 0);
		zombieindex++;
	},
	//THE BOXES MASON, WHAT DO THEY MEAN
	createbox: function () {
		var spawnx = this.world.randomX;
		var spawny = this.world.randomY;
		var FUUUUUUUUK = map.getTileWorldXY(spawnx, spawny, 64, 64, layer, true);
		if (FUUUUUUUUK === null) {
			this.createbox();
		} else {
			if (FUUUUUUUUK.index == 96) {
				var box = boxes.create(FUUUUUUUUK.x * 64 + 32, FUUUUUUUUK.y * 64 + 32, 'crate');
				boxes.setAll('anchor.x', 0.5);
				boxes.setAll('anchor.y', 0.5);
			} else {
				this.createbox();
			}

		}
	},

	createplayer: function () {
		px = this.game.world.randomX;
		py = this.game.world.randomY;
		var foo = map.getTileWorldXY(px, py, 64, 64, layer, true);
		if (foo === null) {
			this.createplayer();
		} else {
			if (foo.index == 96) {
				player = this.add.sprite(px, py, "char");
				player.anchor.x = 0.5;
				player.anchor.y = 0.5;
				this.physics.arcade.enable(player);
				player.body.setSize(40, 40, 0, 0);
				player.body.collideWorldBounds = true;
				this.camera.follow(player);
			} else {
				this.createplayer();
			}
		}
	},

	mouseWheel: function (event) {
		if (this.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
			if (selectedweapon === 0) {
				selectedweapon = 2;
			} else {
				selectedweapon--;
			}

		} else {
			if (selectedweapon === 2) {
				selectedweapon = 0;
			} else {
				selectedweapon++;
			}

		}

	},

};