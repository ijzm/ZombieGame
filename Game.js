ZombieGame.Game = function (game) {};

var player;
var zombies;
var crates;

var bullets;
var fireRate = 500;
var nextFire = 0;
var bulletdamage = 3;
var accuarcity = 30;

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

var screen;

var timeleft;
var timelefttext;
var maxtimeleft = 30;
var nextbonus = 1000;

var boxspawns = [];
var fuckyou;



ZombieGame.Game.prototype = {

	preload: function () {},

	create: function () {
		fuckyou = 60;
		score = 0;
		zombieindex = 0;
		boxindex = 0;
		bulletsremaining = [10, 100, 5];
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

		minimap = this.add.sprite(800, 600, "minimap");
		minimap.anchor.x = 1;
		minimap.anchor.y = 1;
		minimap.fixedToCamera = true;

		pointer = this.add.sprite(0, 0, "pointer");
		pointer.anchor.x = 0.5;
		pointer.anchor.y = 0.5;
		pointer.fixedToCamera = true;

		this.physics.startSystem(Phaser.Physics.ARCADE);
		player = this.add.sprite(this.world.randomX, this.world.randomY, "char");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		this.physics.arcade.enable(player);
		player.body.setSize(40, 40, 0, 0);
		player.body.collideWorldBounds = true;


		this.camera.follow(player);

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



		//texts
		bulletstext = this.add.text(64, 608, bulletsremaining[selectedweapon], {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3
		});
		bulletstext.anchor.x = 0;
		bulletstext.anchor.y = 1;
		bulletstext.fixedToCamera = true;

		scoretext = this.add.text(700, 608, score, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		scoretext.anchor.x = 1;
		scoretext.anchor.y = 1;
		scoretext.fixedToCamera = true;

		gunhud = this.add.sprite(0, 600, "gunhud");
		gunhud.anchor.y = 1;
		gunhud.fixedToCamera = true;


		timelefttext = this.add.text(400, 608, timeleft + "/" + maxtimeleft, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		timelefttext.anchor.x = 0.5;
		timelefttext.anchor.y = 1;
		timelefttext.fixedToCamera = true;


		/*this.game.input.keyboard.onDownCallback = function (e) {
				console.log(e.keyCode);

			}
			*/

		screen = this.add.sprite(800 / 2, 600 / 2, "screen");
		screen.anchor.x = 0.5;
		screen.anchor.y = 0.5;
		screen.fixedToCamera = true;
		screen.alpha = 0;
		screen.enableBody = true;
		this.physics.arcade.enable(screen);



	},

	update: function () {
		if (fuckyou >= 1) {
			this.createzombie();
			fuckyou--;
		}
		player.bringToTop();
		minimap.bringToTop();
		pointer.bringToTop();
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
		if (wasd.up.isDown || cursors.up.isDown) {
			player.body.velocity.y = -pspeed;
		} else if (wasd.down.isDown || cursors.down.isDown) {
			player.body.velocity.y = pspeed;

		} else {
			player.body.velocity.y = 0;
		}
		if (wasd.left.isDown || cursors.left.isDown) {
			player.body.velocity.x = -pspeed;
		} else if (wasd.right.isDown || cursors.right.isDown) {
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
			fireRate = 500;
			bulletdamage = 4;
			accuarcity = 15;
		} else
		if (wasd.two.isDown) {
			selectedweapon = 1
			fireRate = 50;
			bulletdamage = 15 / 10;
			accuarcity = 40;
		} else
		if (wasd.three.isDown) {
			selectedweapon = 2
			fireRate = 1000;
			bulletdamage = 10;
			accuarcity = 0;
		}

		if (wasd.dbug.isDown) {
			if (debug) {
				debug = false;
			} else {
				debug = true;
			}
		}

		pointer.cameraOffset.x = (map.getTileWorldXY(player.x, player.y, 64, 64, layer, true)).x + 700;
		pointer.cameraOffset.y = (map.getTileWorldXY(player.x, player.y, 64, 64, layer, true)).y + 500;

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
		}
		this.game.debug.text(this.game.time.fps || '--', 2, 14, "#000000");
	},

	fire: function () {
		if (bulletsremaining[selectedweapon]) {
			if (this.time.now > nextFire && bullets.countDead() > 0) {
				nextFire = this.time.now + fireRate;
				var bullet = bullets.getFirstExists(false);
				bullet.anchor.x = 0.5;
				bullet.anchor.x = 0.5;
				bullet.reset(player.x, player.y);
				bullet.damage = bulletdamage;
				bullet.rotation = this.physics.arcade.moveToXY(bullet, this.input.activePointer.worldX + this.weaponpresition(accuarcity), this.input.activePointer.worldY + this.weaponpresition(accuarcity), 800)


				bullet.body.setSize(7, 7, 0, 0);

				bulletsremaining[selectedweapon]--;
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

			}, this);
		}
		if (this.overlap(singleEnemy, screen)) {

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
			if (FUUUUUUUUK.index == 42) {
				var box = boxes.create(FUUUUUUUUK.x * 64 + 32, FUUUUUUUUK.y * 64 + 32, 'crate');
				boxes.setAll('anchor.x', 0.5);
				boxes.setAll('anchor.y', 0.5);
			} else {
				this.createbox();
			}

		}
	},

};