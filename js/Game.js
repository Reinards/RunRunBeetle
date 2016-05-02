var myGame = myGame || {};
myGame.Game = function(){};
//Game variabels
var ended=false;
var button_jump;
var facing="right";

var score=0;
var cheeses;

var sense6;
var senseEnabled=false;

var style = { font: "24px Arial", fill: "#000"};


myGame.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {
    score=0;
    if(localStorage.getItem("sense")=="true"){
      senseEnabled=true;
    }
    cheeses=parseInt(localStorage.getItem("cheeses"))
    //create Environment
    this.bg = this.game.add.sprite(0,0, 'background');
    this.table = this.game.add.sprite(70,400, 'table');
    this.beetle = this.game.add.sprite(400,300, 'beetle'+localStorage.getItem("type"));
    this.beetle.anchor.setTo(0.5);

    // //Create arm and cheeses
    this.arm;
    this.cheeses = this.game.add.group();

    //Enable physics
    this.game.physics.enable( [ this.table, this.beetle], Phaser.Physics.ARCADE);


    this.beetle.body.gravity.y = 1500;
    this.beetle.body.maxVelocity.y = 500;
    this.beetle.scale.setTo(1);
    this.beetle.checkWorldBounds = true;

    this.anim_walk = this.beetle.animations.add('walk');
    this.beetle.body.setSize(75, 40, 5, 0);
    
    this.table.body.immovable = true;
    this.table.body.setSize(560, 100, 45, 50);
    //Set keys
    
    this.cursors = this.game.input.keyboard.createCursorKeys();

    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    //sounds
    this.hit = this.game.add.audio('hit');
    this.death = this.game.add.audio('death');
    this.nom = this.game.add.audio('nom');

    

    //Texts
    // /this.score_text = this.game.add.text(10, 10, "Score: 0", style);
    this.trophy = this.game.add.sprite(40,40, 'highscore');
    this.trophy.anchor.setTo(0.5);
    this.trophy.scale.setTo(1);

    this.score_text = this.game.add.bitmapText(70, 30, 'myFont3', '0', 34)
    this.score_text.align = 'center';
    // this.score_text.x = this.game.width / 2 - this.score_text.textWidth / 2;

    this.cheese = this.game.add.sprite(40,100, 'cheese');
    this.cheese.anchor.setTo(0.5);
    this.cheese.scale.setTo(0.8);

    this.cheese_text = this.game.add.bitmapText(70, 85, 'myFont3', localStorage.getItem("cheeses"), 34)
    this.cheese_text.align = 'center';
    // this.coin_icon = this.game.add.sprite(25, 60, 'coin');
    // this.coin_icon.scale.setTo(0.6);
    // this.coin_icon.anchor.setTo(0.5);

    this.game.time.events.add(1000, this.newArm, this);
    this.game.time.events.add(2000, this.spawnCheese, this);
  },


  update: function() {

    this.game.physics.arcade.collide(this.table, this.beetle);
    this.game.physics.arcade.collide(this.table, this.cheeses); 
    
    this.game.physics.arcade.collide(this.table, this.arm, this.armAction, null, this);
    this.game.physics.arcade.collide(this.beetle, this.cheeses, this.collectCheese, null, this);
    this.game.physics.arcade.collide(this.arm, this.cheeses, this.killCheese, null, this);


    if(!ended){
    if(this.beetle.position.y>590){
      ended=true;
      this.gameOver();
    }
    this.beetle.body.velocity.x = 0;
    this.game.physics.arcade.collide(this.beetle, this.arm, this.gameOver, null, this);
      // this.beetle.body.velocity.y = 0;

      if (this.cursors.left.isDown || aKey.isDown){
          this.beetle.body.velocity.x = -500;
          this.beetle.scale.x = -1;
          this.beetle.animations.play('walk');

      }else if (this.cursors.right.isDown || dKey.isDown){
          this.beetle.body.velocity.x = 500;
          this.beetle.scale.setTo(-1,1);
          this.beetle.scale.x = 1;
          this.beetle.animations.play('walk');
      }

    }
      // this.game.physics.arcade.overlap(this.house, this.bears, this.houseAttack, null, this);
  },

  newArm: function(){
    var choice = rint(1,2);
    if(choice==1){
      this.arm = this.game.add.sprite(rint(200,650), -10, 'arm');
    }else{
      this.arm = this.game.add.sprite(rint(200,650), -10, 'arm2');
    }
    
    // this.arms.add(arm);

    this.game.physics.arcade.enable(this.arm);
    this.arm.body.velocity.y = 500;
    this.arm.anchor.setTo(0.5,1);

    if(senseEnabled){
      sense6 = this.game.add.sprite(this.arm.position.x,70, 'danger');
      sense6.anchor.setTo(0.5);
      sense6.scale.set(0.6);
    }
  },
  armAction: function(table,arm){

    if(senseEnabled)sense6.destroy();

    if(!ended){
      this.playSound(this.hit);
      score++;
      this.score_text.text = score;

      this.game.camera.shake(0.01,150,0);
      arm.body.velocity.y=-1500;
      this.game.time.events.add(rint(600,2500), function(){
        arm.body.velocity.y = 1200;
        var choice = rint(1,2);
        if(choice==1){
         arm.position.x = rint(200,650);
         arm.position.y = -100; 
        }else{
          arm.position.x = this.beetle.position.x;
          arm.position.y = -500;
        }
         if(arm.position.x > 400){
          arm.scale.setTo(-1,1);
         }else{
          arm.scale.setTo(1,1);
         }

        if(senseEnabled){
          sense6 = this.game.add.sprite(arm.position.x,70, 'danger');
          sense6.anchor.setTo(0.5);
          sense6.scale.set(0.6);
        }

      }, this);
    }
  },

  spawnCheese: function() {
    if(!ended){
      var cheese = this.game.add.sprite(rint(150,700), -10, 'cheese');
      this.cheeses.add(cheese);

      this.game.physics.arcade.enable(cheese);
      cheese.body.gravity.y = 1200;
      cheese.anchor.setTo(0.5);
      cheese.body.bounce.set(0.2);

      this.game.time.events.add(3000, this.spawnCheese, this);
    }
  },
  killCheese: function(arm,cheese) {
    cheese.destroy();
    this.playSound(this.death);
  },

  collectCheese: function(beetle,cheese) {
    cheese.destroy();
    cheeses++;
    this.cheese_text.text = cheeses;
    this.playSound(this.nom);
  },

  render: function(){
    // this.game.debug.body(this.beetle);
    // this.game.debug.body(this.table);
  },

  gameOver: function() {
    this.playSound(this.hit);
    this.playSound(this.death);

    localStorage.setItem("total_games",1+parseInt(localStorage.getItem("total_games")));

    this.game.camera.flash("0xE83838");
    ended=true;
    this.game.add.tween(this.bg).to({ y: -600}, 800, Phaser.Easing.Linear.None, true, 0);
    this.game.add.tween(this.table).to({ y: -250}, 800, Phaser.Easing.Linear.None, true, 0);
    this.game.add.tween(this.arm).to({ y: -250}, 800, Phaser.Easing.Linear.None, true, 0);

    this.cheeses.removeAll();

    this.cheese.destroy();
    this.trophy.destroy();
    this.cheese_text.destroy();
    this.score_text.destroy();
    // this.beetle.destroy();

    var temp_score = parseInt(localStorage.getItem("highscore"));
    if(score>temp_score){
      localStorage.setItem("highscore",score);
    }
    localStorage.setItem("cheeses",cheeses);

    this.game.time.events.add(810, function(){
      this.beetle.destroy();
      ended=false;
      this.toMenu();
    }, this);

    // arm.body.velocity.y=-1500;
    //this.game.time.events.add(1000, function(){arm.destroy();}, this);
  },


  openPanel: function() {
    this.panel = this.game.add.sprite(400,300, 'panel');
    this.panel.anchor.setTo(0.5);
    this.panel.scale.setTo(0.8);

    menubtn = this.game.add.button(250, 400, 'menu_btn', this.toMenu, this);
    menubtn.anchor.setTo(0.5);

    againbtn = this.game.add.button(550, 400, 'again_btn', this.startGame, this);
    againbtn.anchor.setTo(0.5);


    this.score_text2 = this.game.add.bitmapText(400, 100, 'myFont3', "Your record: "+localStorage.getItem("max_score"), 36)
    this.score_text2.align = 'center';
    this.score_text2.x = this.game.width / 2 - this.score_text2.textWidth / 2;
    
    // var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // spaceKey.onDown.add(this.startGame, this);

  },

  toMenu: function() {
    this.game.state.start('Menu');
  },


  playSound: function(n){
    if(localStorage.getItem("sound")=="true"){
      n.play();
    }
  }
};

function rint(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}