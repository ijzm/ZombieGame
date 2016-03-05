ZombieGame.Game = function (game) {};

var player;
var zombies;

var bullets;
var fireRate = 100;
var nextFire = 0;

var layer;
var map;





ZombieGame.Game.prototype = {

	preload: function () {},

	create: function () {

		map = this.add.tilemap('00');
		map.addTilesetImage('tiles', 'tiles');
		layer = map.createLayer('00');
		layer.resizeWorld();

		this.physics.startSystem(Phaser.Physics.ARCADE);
		player = this.add.sprite(0, 0, "char");
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

	},

	update: function () {
		player.bringToTop();
		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
		};
		if (wasd.up.isDown || cursors.up.isDown) {
			player.body.velocity.y = -150;
		} else if (wasd.down.isDown || cursors.down.isDown) {
			player.body.velocity.y = 150;

		} else {
			player.body.velocity.y = 0;
		}
		if (wasd.left.isDown || cursors.left.isDown) {
			player.body.velocity.x = -150;
		} else if (wasd.right.isDown || cursors.right.isDown) {
			player.body.velocity.x = 150;
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
			this.collide(singleEnemy, bullets, function (x, y) {
				x.destroy();
			}, null, this);
		}, this.game.physics.arcade);

		zombies.forEachAlive(function (singleEnemy) {
			singleEnemy.rotation = this.angleToXY(singleEnemy, player.x, player.y);
		}, this.game.physics.arcade);


	},

	render: function () {
		this.game.debug.body(player);
		zombies.forEach(function (singleEnemy) {
			this.body(singleEnemy);
		}, this.game.debug);
		bullets.forEach(function (singleEnemy) {
			this.body(singleEnemy);
		}, this.game.debug);

	},

	fire: function () {
		if (this.time.now > nextFire && bullets.countDead() > 0) {
			nextFire = this.time.now + fireRate;
			var bullet = bullets.getFirstExists(false);
			bullet.reset(player.x, player.y);
			bullet.anchor.x = 0.5;
			bullet.anchor.x = 0.5;
			bullet.rotation = this.physics.arcade.moveToPointer(bullet, 1000, this.input.activePointer);
		}

	},

};