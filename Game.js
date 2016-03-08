ZombieGame.Game = function (game) {};

var player;
var zombies;
var crates;

var bullets;
var fireRate = 700;
var nextFire = 0;

var layer;
var map;

var pspeed = 256;

var bulletstext;
var bulletsremaining = 10;

var scoretext;



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
		player = this.add.sprite(10, 10, "char");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		this.physics.arcade.enable(player);


		this.camera.follow(player);

		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		zombies = this.add.group();
		zombies.enableBody = true;


		for (var i = 0; i < 50; i++) {
			var zombie = zombies.create(this.world.randomX, this.world.randomY, 'enemy');
		}
		zombies.setAll('anchor.x', 0.5);
		zombies.setAll('anchor.y', 0.5);

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
	},

	update: function () {
		player.bringToTop();
		this.physics.arcade.collide(player, layer);
		this.physics.arcade.collide(zombies, layer);

		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
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

		zombies.forEachAlive(function (singleEnemy) {
			this.moveToObject(singleEnemy, player);
		}, this.game.physics.arcade);

		zombies.forEachAlive(function (singleEnemy) {
			this.collide(singleEnemy, player, function () {
				this.game.state.start("GameOver");
			}, null, this);
		}, this.game.physics.arcade);

		zombies.forEachAlive(function (singleEnemy) {
			this.collide(singleEnemy, zombies);
		}, this.game.physics.arcade);


		zombies.forEachAlive(function (singleEnemy) {
			singleEnemy.rotation = this.angleToXY(singleEnemy, player.x, player.y);
		}, this.game.physics.arcade);

		zombies.forEachAlive(function (singleEnemy) {
			this.collide(singleEnemy, bullets, function (x, y) {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.001, function () {
					x.destroy();
				}, this);
				y.y = -100;
				score += 100;
			}, null, this);
		}, this.game.physics.arcade);

		this.game.physics.arcade.collide(player, crates, this.collectbullets)

		this.updatetext();

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
				bullet.rotation = this.physics.arcade.moveToXY(bullet, this.input.activePointer.worldX + this.weaponpresition(30), this.input.activePointer.worldY + this.weaponpresition(30), 2000)
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

};