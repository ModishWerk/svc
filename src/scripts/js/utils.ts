"use strict";

var utils = {
  centerGameObjects: function centerGameObjects(objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    });
  },
  interleaveArrays: function interleaveArrays(array1: [any], array2: [any]) {
    return array1.reduce(function (arr, v, i) {
      console.log(v, i)
      return arr.concat(v, array2[i]);
    }, []).filter((x) => x != undefined);
  },
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0
  },

  // interleaveArrays: function interleaveArrays(array1: [any], array2: [any]) {
  //     var a1, a2;
  //     if (array1.length > array2.length) {
  //         a1 = array1
  //         a2 = array2
  //     } else {
  //         a1 = array2
  //         a2 = array1
  //     }
  //     return a1.reduce(function(arr, v, i) {
  //         console.log(v, i)
  //         return arr.concat(v, a2[i]);
  //     }, []).filter((x)=> x != undefined);
  // },
  /**
 * Fits an array of elements vertically in it's parents
 */
  fitVertically: function fitVertically(eltArr: [Phaser.Sprite], parent, FirstMargin?: number, margin?: number, xPos?: number) {
    // parent = (parent) ? parent : window
    margin = margin | 0
    var offsetY: number = parent.y + FirstMargin | 0;  // current offset
    var sp_bounds = null;
    console.log("parent y = ", parent.y)
    eltArr.map((sp) => {
      sp.anchor.y = 0
      sp.y = offsetY + margin
      offsetY = sp.y + sp.height
      // console.log(offsetY, sp.y, sp.offsetY, sp.height, sp, sp.key, margin)
    })
  },
  adjustFromBottom: function adjustFromBottom(sprite, margin, x?) {
    /*
      if x = 0 => align bottom left
      if x = game.width => align bottom right
      note: sprite can also be a group.
     */
    "undefined" == typeof margin && (margin = 0);
    var game = sprite.game
    var b = sprite.width / 2 + margin,
      c = sprite.height / 2 + margin;

    if (sprite.name == "group") {
      var gp = sprite
      // reset x to 0
      if (x) {
        gp.x = 0
        // p
        gp.x -= gp.getLocalBounds().x

        gp.x += (x != 0 ? (x >= game.width ? game.width - margin : x) : margin)
      }      // reset position to 0
      gp.y = 0
      // place it back to the top
      gp.y = gp.y - gp.getLocalBounds().y
      // now alight to the bottom
      gp.y = gp.y + game.height - gp.height - margin
      // sprite.y +=sprite.game.height-c
    } else {
      sprite.x = (x != 0 ? x - b : b)
      sprite.y = sprite.game.height - c
    }
  },
};


/**
 * Object.assign  Polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

export default utils
