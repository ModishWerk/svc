'use strict';

var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback, group) {
    var optionStyle = {
      font: '30pt Modak',
      fill: cs.heading_color,
      align: 'left',
      stroke: 'rgba(0,0,0,0)',
      srokeThickness: 4
    };

    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = cs.accent_hover_color;
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = cs.accent_color;
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
    if (group) {
      group.add(txt)
    }
  },

  create: function () {
    // game.add.sprite(0, 0, 'gameover-bg');
    // var titleStyle = { font: '60pt Modak', fill: cs.heading_color, align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "Game Over", style.title.default);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);

    this.menuGroup = game.add.group();
    this.addMenuOption('Play Again', function (e) {
      this.game.state.start("Game");
    }, this.menuGroup);

    this.addMenuOption('Main Menu', function (e) {
      this.game.state.start("GameMenu");
    }, this.menuGroup)

    this.adjustBottom(20, game.world.centerX - this.menuGroup.width/2, this.menuGroup)
  }
};

Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
