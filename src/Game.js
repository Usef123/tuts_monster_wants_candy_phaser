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
  create: function () { // this refers to the Candy.Game object
    this.physics.startSystem(Phaser.Physics.ARCADE); // start the physics engine
    this.physics.arcade.gravity.y = 200; // set the global gravity

    this.add.sprite(0, 0, 'background'); // display images: background, floor and score
    this.add.sprite(-30, Candy.GAME_HEIGHT - 160, 'floor'); // GAME_HEIGHT defined in Candy.Preloader() but are available throughout the whole game code
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
  managePause: function () {
    this.game.paused = true; // pause the game
    var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle); // add proper informational text
    this.input.onDown.add(function () { // set event listener for the user's click/tap the screen
      pausedText.destroy(); // remove the pause text
      this.game.paused = false; // unpause the game
    }, this);
  },
  update: function () { // The update() function name is one of the reserved words in Phaser. When you write a function with that name, it will be executed on every frame of the game. 
    this._spawnCandyTimer += this.time.elapsed; // update timer every frame
    if (this._spawnCandyTimer > 1000) { // if spawn timer reach one second (1000 miliseconds)
      this._spawnCandyTimer = 0; // reset it
      Candy.item.spawnCandy(this); // and spawn new candy
    }
    this._candyGroup.forEach(function (candy) { // loop through all candy on the screen
      candy.angle += candy.rotateMe; // to rotate them accordingly
    });
    if (!Candy._health) { // if the health of the player drops to 0, the player dies = game over
      this.add.sprite((Candy.GAME_WIDTH - 594) / 2, (Candy.GAME_HEIGHT - 271) / 2, 'game-over'); // show the game over message
      this.game.paused = true; // pause the game
    }
  }
};

Candy.item = { // will be able to access _scoreText, _score, _health, variables at the Candy object level 
  spawnCandy: function (game) {
    // var dropPos = Math.floor(Math.random() * Candy.GAME_WIDTH); // calculate drop position (from 0 to game width) on the x axis
    var dropPos = Math.floor(Math.random() * (Candy.GAME_WIDTH - 41 + 1) + 41); // dimension of each image in sprite: width 82 x height 98
    var dropOffset = [-27, -36, -36, -38, -48]; // define the y offset (from top) for every candy
    var candyType = Math.floor(Math.random() * 5); // randomize candy type
    var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy'); // create new candy
    // add(name, frames, frameRate, loop, useNumericIndex) → {Phaser.Animation}
    // frames - An array of numbers/strings that correspond to the frames to add to this animation and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used.
    candy.animations.add('anim', [candyType], 10, true); // add new animation frame
    candy.animations.play('anim'); // play the newly created animation
    game.physics.enable(candy, Phaser.Physics.ARCADE); // enable candy body for physic engine
    candy.inputEnabled = true; // enable candy to be clicked/tapped
    candy.events.onInputDown.add(this.clickCandy, this); // add event listener to click/tap
    candy.checkWorldBounds = true; // be sure that the candy will fire an event when it goes out of the screen
    candy.events.onOutOfBounds.add(this.removeCandy, this); // reset candy when it goes out of screen
    candy.anchor.setTo(0.5, 0.5); // set the anchor (for rotation, position etc) to the middle of the candy so that it will spin naturally
    candy.rotateMe = (Math.random() * 4) - 2; // set the random rotation value
    game._candyGroup.add(candy); // add candy to the group, access the Candy.Game._candyGroup variable
  },
  clickCandy: function (candy) {
    candy.kill(); // kill the candy when it's clicked
    Candy._score += 1; // add points to the score
    Candy._scoreText.setText(Candy._score); // update score text // Note: Candy._scoreText is now an object (see line 30). Therefore we need to use the setText function to place text inside this object on the canvas.
  },
};