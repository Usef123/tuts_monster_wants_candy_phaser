var Candy = {}; // creates a global object for our game. Everything will be stored inside, so we won't bloat the global namespace. 

Candy.Boot = function (game) { };

// Our Boot object contains these two functions, so they can be referenced by using Candy.Boot.preload() and Candy.Boot.create(), respectively.
Candy.Boot.prototype = { // a way to define the contents of Candy.Boot using prototypes
  // But why are we loading an image in the Boot.js file, when Preload.js is supposed to do it for us anyway? Well, we need an image of a loading bar to show the status of all the other images being loaded in the Preload.js file, so it has to be loaded earlier, before everything else.
  preload: function () { // preload the loading indicator first before anything else
    this.load.image('preloaderBar', 'img/loading-bar.png');
  },
  create: function () { // set scale options. create() is called exactly once (after preload()), so you can put the code that will be used as a setup for the object there, such as for defining variables or adding sprites.
    this.input.maxPointers = 1; // defines that we won't use multi-touch, as we don't need it in our game. 
    // EXACT_FIT, NO_SCALE and SHOW_ALL. The first option will scale the game to all the available space (100% width and height, no ratio preserved); the second will disable scaling completely; and the third will make sure that the game fits in the given dimensions, but everything will be shown on the screen without hiding any fragments (and the ratio will be preserved). 
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // Setting scale.pageAlignHorizontally and scale.pageAlignVertically to true will align our game both horizontally and vertically, so there will be the same amount of free space on the left and right side of the Canvas element; the same goes for top and bottom. 
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true); // "activates" our scaling
    this.state.start('Preloader'); // start the Preloader state
  }
};