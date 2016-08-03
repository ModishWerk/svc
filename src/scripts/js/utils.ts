"use strict";

var utils = {
    centerGameObjects: function centerGameObjects(objects) {
        objects.forEach(function(object) {
            object.anchor.setTo(0.5);
        });
    },

    interleaveArrays: function interleaveArrays(array1: [any], array2: [any]) {
        var a1, a2;
        if (array1.length > array2.length) {
            a1 = array1
            a2 = array2
        } else {
            a1 = array2
            a2 = array1
        }
        return a1.reduce(function(arr, v, i) {
            console.log(v, i)
            return arr.concat(v, a2[i]);
        }, []).filter((x)=> x != undefined);
    },
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
    }
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
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map
