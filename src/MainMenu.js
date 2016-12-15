Candy.MainMenu = function (game) { };

Candy.MainMenu.prototype = {
  // The prototype of the MainMenu object doesn't have a preload() function, because we don't need it—all the images have been loaded in the Preload.js file already. 
  create: function () {
    // display images
    this.add.sprite(0, 0, 'background');
    this.add.sprite(-130, Candy.GAME_HEIGHT - 514, 'monster-cover');
    this.add.sprite((Candy.GAME_WIDTH - 395) / 2, 60, 'title');
    // add the button that will start the game
    // new Button(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
    // Create a new Button object. A Button is a special type of Sprite that is set-up to handle Pointer events automatically.
    this.add.button(Candy.GAME_WIDTH - 401 - 10, Candy.GAME_HEIGHT - 143 - 10, 'button-start', this.startGame, this, 1, 0, 2);
  },
  startGame: function () {
    // start the Game state
    // This function takes care of one thing only—launching the game loop—but it's not launched automatically or after the assets are loaded. We will assign it to a button and wait for a user input.
    this.state.start('Game');
  }
};