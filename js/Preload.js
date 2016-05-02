var myGame = myGame || {};

myGame.Preload = function(){};

myGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.icon = this.add.sprite(400,150, 'icon');
    this.icon.anchor.setTo(0.5);

    this.progress = this.game.add.bitmapText(400, 350, 'myFont3', 'Files loaded: ', 20)
    this.progress.align = 'center';
    this.progress.x = this.game.width / 2 - this.progress.textWidth / 2 -25;

    this.hint = this.game.add.bitmapText(400, 500, 'myFont3', 'Game not loading? Check if you have cookies enabled :P', 20)
    this.hint.align = 'center';
    this.hint.x = this.game.width / 2 - this.hint.textWidth / 2;

    this.author = this.game.add.bitmapText(400, 550, 'myFont3', 'Made by Reinards 2016', 20)
    this.author.align = 'center';
    this.author.x = this.game.width / 2 - this.author.textWidth / 2;

    this.load.setPreloadSprite(this.preloadBar);
    this.game.load.onFileComplete.add(this.fileComplete, this);



    //load game assets

    // this.load.spritesheet('player1', 'assets/images/player1.png', 110, 160, 19);



    //Environment
    this.load.image('background', 'assets/images/background.png');

    //Main
    this.load.image('table', 'assets/images/table.png');
    this.load.image('arm', 'assets/images/arm.png');
    this.load.image('arm2', 'assets/images/arm2.png');
    this.load.image('danger', 'assets/images/danger.png');
    this.load.image('cheese', 'assets/images/cheese.png');
    this.load.image('highscore', 'assets/images/highscore.png');

    //Bugs
    this.load.spritesheet('beetle1', 'assets/images/beetle.png', 80, 40, 9);
    this.load.spritesheet('beetle2', 'assets/images/beetle2.png', 80, 40, 9);
    this.load.spritesheet('beetle3', 'assets/images/beetle3.png', 80, 40, 9);
    this.load.spritesheet('beetle4', 'assets/images/beetle4.png', 80, 40, 9);
    this.load.spritesheet('beetle5', 'assets/images/beetle5.png', 80, 40, 9);
    //GUI
    this.load.image('panel', 'assets/images/panel.png');
    this.load.image('panel2', 'assets/images/panel2.png');

    this.load.image('play_btn', 'assets/images/play.png');
    this.load.image('shop_btn', 'assets/images/shop.png');
    this.load.image('settings_btn', 'assets/images/settings.png');
    this.load.image('sound_btn', 'assets/images/sound.png');
    this.load.image('muted_btn', 'assets/images/muted.png');
    this.load.image('help_btn', 'assets/images/help.png');


    //Fonts
    this.load.bitmapFont('myFont', 'assets/desyrel.png', 'assets/desyrel.xml');
    this.load.bitmapFont('myFont2', 'assets/gem.png', 'assets/gem.xml');
    this.load.bitmapFont('myFont3', 'assets/nokia.png', 'assets/nokia.xml');
    
    //Sounds
    this.load.audio('hit', 'assets/audio/hit.ogg');
    this.load.audio('death', 'assets/audio/death.ogg');
    this.load.audio('nom', 'assets/audio/nom.ogg');
    this.load.audio('click', 'assets/audio/click.ogg');

    this.load.audio('music', 'assets/audio/music.ogg');


  },
  fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = "Files loaded: "+totalLoaded+"/"+totalFiles;
  },
  create: function() {
    // music = new Phaser.Sound(this.game,'music',1,true);
    // this.playSound(music);
    // // music.play();
    // music.volume = 0.6;

    this.state.start('Menu');
  },
  playSound: function(n){
    if(localStorage.getItem("sound")=="true"){
      n.play();
    }
  }
};

