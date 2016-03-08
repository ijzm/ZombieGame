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

var pspeed = 256;

var bulletstext;
var bulletsremaining = 100000;

var scoretext;

var selectedweapon = 0;
var gunhud;

var zombiemaxhealth = 10;
var zombieindex = 0;



ZombieGame.Game.prototype = {

	preload: function () {},

	create: function () {

		map = this.add.tilemap('00');
		map.addTilesetImage('tiles', 'tiles');

		layer = map.createLayer('00');
		layer.resizeWorld();

		crates = this.add.group();
		crates.enableBody = true;
		map.createFromTiles(189, 22, "crate", layer, crates);


		this.physics.startSystem(Phaser.Physics.ARCADE);
		player = this.add.sprite(this.world.randomX, this.world.randomY, "char");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		this.physics.arcade.enable(player);


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
		zombies.enableBody = true;

		this.timer1 = this.game.time.create(false);
		this.timer1.loop(1000, function () {
			var zombie = zombies.create(this.world.randomX, this.world.randomY, 'enemy');
			var newhealth = Math.floor(Math.random() * zombiemaxhealth) + 1;
			zombies.set(zombies.children[zombieindex], "health", newhealth);
			zombies.setAll('anchor.x', 0.5);
			zombies.setAll('anchor.y', 0.5);

			console.log(zombies.children[zombieindex].health)
			zombieindex++
		}, this);
		this.timer1.start();

		map.setCollisionBetween(11, 15);
		map.setCollisionBetween(31, 35);
		map.setCollisionBetween(51, 53);
		map.setTileIndexCallback(189, this.collectbullets, this);

		bulletstext = this.add.text(0, 0, "Bullets: " + bulletsremaining, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		bulletstext.anchor.x = 0;
		bulletstext.anchor.y = 0;
		bulletstext.fixedToCamera = true;

		scoretext = this.add.text(800, 0, "Score: " + score, {
			font: "60px Arial",
			fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		scoretext.anchor.x = 1;
		scoretext.anchor.y = 0;
		scoretext.fixedToCamera = true;

		gunhud = this.add.sprite(0, 600, "gunhud");
		gunhud.anchor.y = 1;
		gunhud.fixedToCamera = true;


		//		this.game.input.keyboard.onDownCallback = function (e) {
		//			console.log(e.keyCode);
		//
		//		}

	},

	update: function () {
		player.bringToTop();
		player.frame = selectedweapon;
		gunhud.frame = selectedweapon;
		this.physics.arcade.collide(player, layer);
		this.physics.arcade.collide(zombies, layer);

		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			one: this.input.keyboard.addKey(49),
			two: this.input.keyboard.addKey(50),
			three: this.input.keyboard.addKey(51),
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
			bulletdamage = 3;
			accuarcity = 15;
		} else
		if (wasd.two.isDown) {
			selectedweapon = 1
			fireRate = 50;
			bulletdamage = 15 / 10;
			accuarcity = 35;
		} else
		if (wasd.three.isDown) {
			selectedweapon = 2
			fireRate = 1000;
			bulletdamage = 10;
			accuarcity = 0;
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
	},

	fire: function () {
		if (bulletsremaining) {
			if (this.time.now > nextFire && bullets.countDead() > 0) {
				nextFire = this.time.now + fireRate;
				var bullet = bullets.getFirstExists(false);
				bullet.reset(player.x, player.y);
				bullet.anchor.x = 0.5;
				bullet.anchor.x = 0.5;
				bullet.rotation = this.physics.arcade.moveToXY(bullet, this.input.activePointer.worldX + this.weaponpresition(accuarcity), this.input.activePointer.worldY + this.weaponpresition(accuarcity), 2000)
				bulletsremaining--;
			}
		}

	},

	weaponpresition: function (foo) {
		return (Math.floor((Math.random() * 2 * foo) - foo));
	},

	updatetext: function () {
		bulletstext.setText("Bullets: " + bulletsremaining);
		scoretext.setText("Score: " + score);
	},
	collectbullets: function (x, y) {
		y.destroy();
		score += 50;
		bulletsremaining += 5;
	},
	zombieupdate: function (singleEnemy) {

		//console.log(singleEnemy.health)

		this.moveToObject(singleEnemy, player);

		this.collide(singleEnemy, player, function () {
			this.game.state.start("GameOver");
		}, null, this);

		this.collide(singleEnemy, zombies);

		singleEnemy.rotation = this.angleToXY(singleEnemy, player.x, player.y);

		this.collide(singleEnemy, bullets, function (x, y) {
			this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function () {
				x.health -= bulletdamage;
			}, this);
			y.y = -1337;
			score += 100;
		}, null, this);

		if (singleEnemy.health <= 0) {
			this.game.time.events.add(Phaser.Timer.SECOND * 0.01, function () {
				singleEnemy.alive = false;
				singleEnemy.destroy();
				zombieindex--;
			}, this);
		}

	},

};