"use strict";

var utils = {
  centerGameObjects: function centerGameObjects(objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    });
  },

  interleaveArrays: function interleaveArrays(array1, array2) {
    return array1.reduce(function (arr, v, i) {
      return arr.concat(v, array2[i]);
    }, []);
  },
  /**
 * Fits an array of elements vertically in it's parents
 */
  fitVertically: function fitVertically(eltArr:[Phaser.Sprite], parent, FirstMargin?:number, margin?:number, xPos?:number) {
    // parent = (parent) ? parent : window
    margin = margin | 0
    var offsetY: number = parent.y +  FirstMargin | 0;  // current offset
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

export default utils
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map
