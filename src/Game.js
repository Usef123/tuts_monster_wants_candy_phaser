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