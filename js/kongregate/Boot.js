kongregateAPI.loadAPI(function(){
  window.kongregate = kongregateAPI.getAPI();
});

var myGame = myGame || {};

myGame.Boot = function(){};


myGame.Boot.prototype = {
  preload: function() {
    //Loading screen assets
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    this.load.image('icon', 'assets/images/icon.png');
    this.load.bitmapFont('myFont3', 'assets/nokia.png', 'assets/nokia.xml');
  },
  create: function() {
    this.game.stage.backgroundColor = '#570000';

    //Centering
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;


    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
    this.state.start('Preload');
  }
};