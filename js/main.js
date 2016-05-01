//App42.initialize("779990d8946f32a25966ace5e48831f457a0b17a301764d52c36272937af345e","33a419adbb18720197ab82a23f962d79576cf2e8b43b435f5650c2041f7f95e0"); 


var myGame = myGame || {};

myGame.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

myGame.game.state.add('Boot', myGame.Boot);
myGame.game.state.add('Preload', myGame.Preload);
myGame.game.state.add('Game', myGame.Game);
myGame.game.state.add('Menu', myGame.Menu);

myGame.game.state.start('Boot');
