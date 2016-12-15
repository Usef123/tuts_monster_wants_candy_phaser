Candy.Game = function (game) {
  // define needed variables for Candy.Game
  // By defining this._name, we're restricting the use of the variables to the Candy.Game scope, which means they can't be used in other states — we don't need them there, so why expose them? ie. available only to the Candy.Game object
  this._player = null;
  this._candyGroup = null;
  this._spawnCandyTimer = 0;
  this._fontStyle = null;
  // define Candy variables to reuse them in Candy.item functions
  // By defining Candy._name, we're allowing the use of those variables in other states and objects, so, for example, Candy._score can be increased from the Candy.item.clickCandy() function, ie. available to the Candy object
  Candy._scoreText = null;
  Candy._score = 0;
  Candy._health = 0;
};

Candy.Game.prototype = {
  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE); // start the physics engine
    this.physics.arcade.gravity.y = 200; // set the global gravity

    this.add.sprite(0, 0, 'background'); // display images: background, floor and score
    this.add.sprite(-30, Candy.GAME_HEIGHT - 160, 'floor');
    this.add.sprite(10, 5, 'score-bg');
    this.add.button(Candy.GAME_WIDTH - 96 - 10, 5, 'button-pause', this.managePause, this); // add pause button

    this._player = this.add.sprite(5, 760, 'monster-idle'); // create the player
    this._player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true); // add player animation
    this._player.animations.play('idle'); // play the animation

    this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" }; // set font style
    Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle); // initialize the score text with 0

    this._spawnCandyTimer = 0; // initialize the spawn timer
    Candy._health = 10; // set health of the player

    this._candyGroup = this.add.group(); // create new group for candy
    Candy.item.spawnCandy(this); // spawn first candy
  },
}