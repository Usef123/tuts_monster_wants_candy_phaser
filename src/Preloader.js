Candy.Preloader = function (game) {
  // define width and height of the game
  Candy.GAME_WIDTH = 640; // Why not standardise the variable naming to _GAME_WIDTH?
  Candy.GAME_HEIGHT = 960;
};

Candy.Preloader.prototype = {
  preload: function () {
    // set background color and preload image
    this.stage.backgroundColor = '#B4D9E7';
    this.preloadBar = this.add.sprite((Candy.GAME_WIDTH - 311) / 2, (Candy.GAME_HEIGHT - 27) / 2, 'preloaderBar'); // 'preloaderBar' defined in Candy.Game.preload()
    this.load.setPreloadSprite(this.preloadBar); // define this.preloadBar as the default one for the special function called setPreloadSprite() that will indicate the progress of the loading assets

    // load images
    this.load.image('background', 'img/background.png');
    this.load.image('floor', 'img/floor.png');
    this.load.image('monster-cover', 'img/monster-cover.png');
    this.load.image('title', 'img/title.png');
    this.load.image('game-over', 'img/gameover.png');
    this.load.image('score-bg', 'img/score-bg.png');
    this.load.image('button-pause', 'img/button-pause.png');

    // load spritesheets
    // This function, load.spritesheet(), rather than loading a single image, takes care of a full collection of images inside one file—a spritesheet. Two extra parameters are needed for telling the function the size of a single image in the sprite.
    // We have five different types of candy inside one candy.png file. The whole image is 410x98px, but the single item is set to 82x98px, which is entered in the load.spritesheet() function. 
    // spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing) → {Phaser.Loader}
    this.load.spritesheet('candy', 'img/candy.png', 82, 98);
    this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
    this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
  },
  create: function () {
    // start the MainMenu state
    this.state.start('MainMenu');
  }
};