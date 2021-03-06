var myGame = myGame || {};
myGame.Menu = function(){};


var style = { font: "24px Arial", fill: "#000"};

var settings_opened=false;
var sound;
var shop_opened=false;

myGame.Menu.prototype = {
  create: function() {

    this.bg = this.game.add.sprite(0,-600, 'background');
    this.table = this.game.add.sprite(70,-250, 'table');

    // this.panel = this.game.add.sprite(400,300, 'panel');
    // this.panel.anchor.setTo(0.5);
    // this.panel.scale.setTo(0.8);

    //Texts

    this.click = this.game.add.audio('click');

    this.trophy = this.game.add.sprite(60,70, 'highscore');
    this.trophy.anchor.setTo(0.5);
    this.trophy.scale.setTo(1);

    this.score_text = this.game.add.bitmapText(100, 55, 'myFont3', '0', 34)
    this.score_text.align = 'center';
    // this.score_text.x = this.game.width / 2 - this.score_text.textWidth / 2;

    this.cheese = this.game.add.sprite(60,130, 'cheese');
    this.cheese.anchor.setTo(0.5);
    this.cheese.scale.setTo(0.8);

    this.cheese_text = this.game.add.bitmapText(100, 115, 'myFont3', '0', 34)
    this.cheese_text.align = 'center';
    // this.cheese_text.x = this.game.width / 2 - this.cheese_text.textWidth / 2;

    this.setData();


    playbtn = this.game.add.button(400, 300, 'play_btn', this.startGame, this);
    playbtn.anchor.setTo(0.5);

    playbtn.onInputOver.add(function(){playbtn.tint = "0xA6A6A6"}, this);
    playbtn.onInputOut.add(function(){playbtn.tint = "0xffffff"}, this);
    // playbtn.scale.setTo(1.5);

    helpbtn = this.game.add.button(300, 300, 'help_btn', this.help, this);
    helpbtn.anchor.setTo(0.5);
    helpbtn.scale.setTo(0.7);

    helpbtn.onInputOver.add(function(){helpbtn.tint = "0xA6A6A6"}, this);
    helpbtn.onInputOut.add(function(){helpbtn.tint = "0xffffff"}, this);

    shopbtn = this.game.add.button(500, 300, 'shop_btn', this.shop, this);
    shopbtn.anchor.setTo(0.5);
    shopbtn.scale.setTo(0.7);

    shopbtn.onInputOver.add(function(){shopbtn.tint = "0xA6A6A6"}, this);
    shopbtn.onInputOut.add(function(){shopbtn.tint = "0xffffff"}, this);

    ssense = this.game.add.button(70, 470, 'danger', this.sixthSense, this);
    ssense.anchor.setTo(0.5);
    ssense.scale.setTo(0.5);

    ssense.onInputOver.add(function(){ssense.tint = "0xF5512C"}, this);
    ssense.onInputOut.add(function(){ssense.tint = "0xffffff"}, this);

    if(localStorage.getItem("sound")=="true"){
      soundbtn = this.game.add.button(70, 530, 'sound_btn', this.toggleSound, this);
    }else{
      soundbtn = this.game.add.button(70, 530, 'muted_btn', this.toggleSound, this);
    }

    soundbtn.anchor.setTo(0.5);
    soundbtn.scale.setTo(0.5);
    soundbtn.onInputOver.add(function(){soundbtn.tint = "0xA6A6A6"}, this);
    soundbtn.onInputOut.add(function(){soundbtn.tint = "0xffffff"}, this);


    // helpbtn = this.game.add.button(400, 425, 'help_button', this.help, this);
    // helpbtn.anchor.setTo(0.5);

    // if(localStorage.getItem("sound")=="true"){
    //   soundbtn = this.game.add.button(600, 425, 'sound_btn', this.toggleSound, this);
    // }else{
    //   soundbtn = this.game.add.button(600, 425, 'muted_btn', this.toggleSound, this);
    // }
    // soundbtn.anchor.setTo(0.5);
    // bgmusic = this.game.add.audio('bgm1');

    // bgmusic.play();
  },


  toggleSound: function() {
    this.click.play();

    if(localStorage.getItem("sound")=="true"){
      localStorage.setItem("sound",false);
    }else if(localStorage.getItem("sound")=="false"){
      localStorage.setItem("sound",true);
    }

    this.game.state.start('Menu');
  },

  shop: function() {
    this.playSound(this.click);

    helpbtn.destroy();
    playbtn.destroy();
    shopbtn.position.x = 400;
    if(!shop_opened){
      this.game.add.tween(this.bg).to({ y: -1200}, 800, Phaser.Easing.Linear.None, true, 0);

      this.game.time.events.add(900, function(){
        shop1 = this.game.add.button(400, 450, 'beetle1', function(){this.select(1)}, this);
        shop1.anchor.setTo(0.5);
        this.anim_walk = shop1.animations.add('walk');
        shop1.animations.play('walk',35,true);
        shop1.onInputOver.add(function(){shop1.tint = "0x575757"}, this);
        shop1.onInputOut.add(function(){shop1.tint = "0xffffff"}, this);

        shop2 = this.game.add.button(300, 450, 'beetle2', function(){this.select(2)}, this);
        shop2.anchor.setTo(0.5);
        this.anim_walk2 = shop2.animations.add('walk2');
        shop2.animations.play('walk2',30,true);
        shop2.onInputOver.add(function(){shop2.tint = "0x575757"}, this);
        shop2.onInputOut.add(function(){shop2.tint = "0xffffff"}, this);

        shop3 = this.game.add.button(500, 450, 'beetle3', function(){this.select(3)}, this);
        shop3.anchor.setTo(0.5);
        this.anim_walk3 = shop3.animations.add('walk3');
        shop3.animations.play('walk3',40,true);
        shop3.onInputOver.add(function(){shop3.tint = "0x575757"}, this);
        shop3.onInputOut.add(function(){shop3.tint = "0xffffff"}, this);

        shop4 = this.game.add.button(200, 450, 'beetle4', function(){this.select(4)}, this);
        shop4.anchor.setTo(0.5);
        this.anim_walk4 = shop4.animations.add('walk4');
        shop4.animations.play('walk4',40,true);
        shop4.onInputOver.add(function(){shop4.tint = "0x575757"}, this);
        shop4.onInputOut.add(function(){shop4.tint = "0xffffff"}, this);

        shop5 = this.game.add.button(600, 450, 'beetle5', function(){this.select(5)}, this);
        shop5.anchor.setTo(0.5);
        this.anim_walk5 = shop5.animations.add('walk5');
        shop5.animations.play('walk5',40,true);
        shop5.onInputOver.add(function(){shop5.tint = "0x575757"}, this);
        shop5.onInputOut.add(function(){shop5.tint = "0xffffff"}, this);
      }, this);

      shop_opened=true;
    }else{
      this.game.add.tween(this.bg).to({ y: -600}, 800, Phaser.Easing.Linear.None, true, 0);
      shop_opened=false;
      shop1.destroy();
      shop2.destroy();
      shop3.destroy();
      shop4.destroy();
      shop5.destroy();

      shopbtn.position.x = 500;

      playbtn = this.game.add.button(400, 300, 'play_btn', this.startGame, this);
      playbtn.anchor.setTo(0.5);

      playbtn.onInputOver.add(function(){playbtn.tint = "0xA6A6A6"}, this);
      playbtn.onInputOut.add(function(){playbtn.tint = "0xffffff"}, this);
      // playbtn.scale.setTo(1.5);

      helpbtn = this.game.add.button(300, 300, 'help_btn', this.help, this);
      helpbtn.anchor.setTo(0.5);
      helpbtn.scale.setTo(0.7);

      helpbtn.onInputOver.add(function(){helpbtn.tint = "0xA6A6A6"}, this);
      helpbtn.onInputOut.add(function(){helpbtn.tint = "0xffffff"}, this);
    }
  },

  select: function(n) {
     this.playSound(this.click);
    
    shop1.tint = "0xffffff";
    shop2.tint = "0xffffff";
    shop3.tint = "0xffffff";
    shop4.tint = "0xffffff";
    shop5.tint = "0xffffff";

    if(localStorage.getItem("type"+n.toString())=="true"){
      localStorage.setItem("type",n);
      sweetAlert("Done!", "Bug selected", "success");

      
    }else{
      swal({   title: "Confirm",   text: "Do you want to unlock this bug? It costs 25 cheeses",   type: "success",   showCancelButton: true,   confirmButtonColor: "#43BF36",   confirmButtonText: "Buy!",   closeOnConfirm: false }, function(){
        var temp_money = parseInt(localStorage.getItem("cheeses"));
        temp_money-=25;
        if(temp_money>=0){
          swal("Hurray!", "Your bug is unlocked and selected...", "success");
          localStorage.setItem("type",n);
          localStorage.setItem("type"+n.toString(),true);
          localStorage.setItem("cheeses",temp_money);
        }else{
          sweetAlert("Fail!", "You don't have enough money...", "error");
        }
        
      });
    }
  },

  help: function() {
    helpbtn.tint = "0xffffff";
     this.playSound(this.click);
    swal({   title: "Help",
      text: "<b>How to play?</b><br><p><b>Left</b> and <b>right</b> arrow keys or <b>W</b> and <b>D</b> keys to move left and right.<br>Collect cheese<br>Be aware of the evil arm!<br>You can unlock other bugs using your cheeses<br><b>After some time you will develop the sixth sense skill</b><br><br><i>Made by Reinards Jānis Saulītis 2016<br>Sounds are taken from freesound.org<i>",
      html: true });
  },

  sixthSense: function() {
    ssense.tint = "0xffffff";
    this.playSound(this.click);

    swal({   title: "Sixth sense",   text: "This is the <i>Sixth sense</i> skill that allows you to see from where the evil arm will come from.<br>You can unlock this if you have the following requirements met:<br><br><b>Cheese:</b> "+localStorage.getItem("cheeses")+"/50<br><b>Games played:</b> "+localStorage.getItem("total_games")+"/50",   type: "success",   showCancelButton: true,   confirmButtonColor: "#43BF36",   confirmButtonText: "Unlock!",   closeOnConfirm: false, html: true }, function(){
        var temp_money = parseInt(localStorage.getItem("cheeses"));
        temp_money-=50;
        if(temp_money>=0 && parseInt(localStorage.getItem("total_games"))>=50){
          swal("Hurray!", "You unlocked the sixth sense skill!", "success");
          localStorage.setItem("cheeses", temp_money);
          localStorage.setItem("sense", true);
        }else{
          sweetAlert("Fail!", "You don't have the resources yet...", "error");
        }
        
      });

  },

  settings: function() {

    if(!settings_opened){

      if(localStorage.getItem("sound")=="true"){
        sound = this.game.add.button(130, 530, 'sound_btn', this.toggleSound, this);
      }else{
        sound = this.game.add.button(130, 530, 'muted_btn', this.toggleSound, this);
      }
      sound.anchor.setTo(0.5);
      sound.scale.setTo(0.5);
      settings_opened=true;
    }else{
      sound.destroy();
      settings_opened=false;
    }

  },

  startGame: function() {
    this.playSound(this.click);

    this.game.add.tween(this.bg).to({ y: 0}, 800, Phaser.Easing.Linear.None, true, 0);
    this.game.add.tween(this.table).to({ y: 400}, 800, Phaser.Easing.Linear.None, true, 0);
    
    playbtn.destroy();
    helpbtn.destroy();
    shopbtn.destroy();
    soundbtn.destroy();
    ssense.destroy();
    this.score_text.destroy();
    this.trophy.destroy();
    this.cheese.destroy();
    this.cheese_text.destroy();

    if(shop_opened)this.shop();

    this.game.time.events.add(900, function(){
      this.game.state.start('Game');
    }, this);
  },

  update: function() {
    this.cheese_text.text = localStorage.getItem("cheeses");
  },

  setData: function() {
    if(localStorage.getItem("sound")==null){
      localStorage.setItem("sound", true);
    }
    if(localStorage.getItem("highscore")==null){
      localStorage.setItem("highscore", 0);
    }
    if(localStorage.getItem("total_games")==null){
      localStorage.setItem("total_games", 0);
    }
    if(localStorage.getItem("cheeses")==null){
      localStorage.setItem("cheeses", 0);
    }
    if(localStorage.getItem("sense")==null){
      localStorage.setItem("sense", false);
    }

    if(localStorage.getItem("type")==null){
      localStorage.setItem("type", 1);
    }

    if(localStorage.getItem("type1")==null){
      localStorage.setItem("type1", true);
    }
    if(localStorage.getItem("type2")==null){
      localStorage.setItem("type2", false);
    }
    if(localStorage.getItem("type3")==null){
      localStorage.setItem("type3", false);
    }
    if(localStorage.getItem("type4")==null){
      localStorage.setItem("type4", false);
    }
    if(localStorage.getItem("type5")==null){
      localStorage.setItem("type5", false);
    }

    this.score_text.text = localStorage.getItem("highscore");
    this.cheese_text.text = localStorage.getItem("cheeses");
  },

  playSound: function(n){
    if(localStorage.getItem("sound")=="true"){
      n.play();
    }
  }
};