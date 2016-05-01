// kongregateAPI.loadAPI(function(){
//   window.kongregate = kongregateAPI.getAPI();
// });

var myGame = myGame || {};

myGame.Boot = function(){};


myGame.Boot.prototype = {
  preload: function() {
    //Loading screen assets
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    // this.load.image('icon', 'assets/images/game_icon.png');
    this.load.bitmapFont('myFont3', 'assets/nokia.png', 'assets/nokia.xml');
  },
  create: function() {
    this.game.stage.backgroundColor = '#1F0045';

    //Centering
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    // this.game.stage.disableVisibilityChange = true;


    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
    this.state.start('Preload');
  }
};