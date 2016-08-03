'use strict';


/** inner color scheme defining the default color of the menue*/
var _cs = {
    defaultColor: "white",
    highlightColor: "#FEFFD5",

    /* Color Scheme*/
    heading_color: "#E6E2AF",
    base_color: "#FFB03B",
    background_color: "#31152B",

    text_color: "#F9E4AD",
    accent_color: "#CC4452",
    accent_hover_color: "#F9E4AD",
    heading_fontFamily: "Modak",
    body_fontFamily: "Modak",
}

// cs = color scheme
export var cs = {
    color: _cs,
    title: {
        default: {
            font: '60pt '+_cs.heading_fontFamily,
            fill: _cs.heading_color,
            align: 'center'
        }
    },
    navitem: {
        base: {
            font: '30pt '+_cs.body_fontFamily,
            align: 'left',
            srokeThickness: 4
        },
        default: {
            fill: _cs.text_color,
            stroke: 'rgba(0,0,0,0)'
        },
        inverse: {
            fill: _cs.accent_color,
            stroke: _cs.accent_color
        },
        hover: {
            fill: _cs.accent_color,
            stroke: 'rgba(200,200,200,0.5)'
        }
    }

}

/***********************************************************/
/*********************** FONT AWESOME **********************/
/***********************************************************/
var _fa_cs = {
    defaultColor: "white",
    highlightColor: "#FEFFD5",

    /* Color Scheme*/
    heading_color: "#E6E2AF",
    base_color: "#FFB03B",
    background_color: "#31152B",

    text_color: "#F9E4AD",
    accent_color: "#CC4452",
    accent_hover_color: "#F9E4AD",
    fontFamily: "FontAwesome",

}

// FontAwesome Color Scheme
export var fa_cs = {
    btn: {
        pause: {
            fill: _fa_cs.accent_color,
            font: '40px FontAwesome',
            // backgroundColor: 'rgba(222,0,0,0.25)'
        },
    },
    navitem: {
        base: {
            font: '40px FontAwesome',
            align: 'left',
            srokeThickness: 4
        },
        default: {
            fill: _fa_cs.base_color,
            stroke: 'rgba(0,0,0,0)'
        },
        inverse: {
            fill: _cs.accent_hover_color,
            stroke: _cs.accent_color
        },
        hover: {
            fill: _cs.highlightColor,
            stroke: 'rgba(200,200,200,0.5)'
        },
        randomCustom: {
            font: "60px FontAwesome",
            align: 'right',
            srokeThickness: 10,
            fill: '#AFFFF8',
            stroke: "#57B2AB",
            "-ms-transform": 'translate(50px,100px)', /* IE 9 */
            "-webkit-transform": 'translate(50px,100px)', /* Safari */
            "transform": 'translate(50px,100px)',
        }
    },
    icon: {
        base: {
            font: '40px FontAwesome',
            align: 'left',
        },
        default: {
            fill: _fa_cs.defaultColor,
            stroke: 'rgba(0,0,0,0)'
        },
        inverse: {
            fill: 'black',
            stroke: 'black'
        },
        hover: {
            fill: _fa_cs.accent_color,
            stroke: 'rgba(200,200,200,0.5)'
        },

    }
};

for (var key in cs.navitem) {
    if (key !== "base") {
        Object.assign(cs.navitem[key], cs.navitem.base)
    }
}

for (var key in fa_cs.navitem) {
    if (key !== "base") {
        Object.assign(fa_cs.navitem[key], fa_cs.navitem.base)
    }
}
export default cs
