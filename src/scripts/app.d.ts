
interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}


// declare module VirtualJoystick {}
declare class VirtualJoystick {
    constructor(any)
    addEventListener(str: string, cb)
    VirtualJoystick (opts)
    __bind	(fn, me)
    destroy	()
    touchScreenAvailable	()
    addEventListener	(event, fct)
    removeEventListener	(event, fct)
    deltaX	()
    deltaY	()
    up	()
    down	()
    right	()
    left	()
    _onUp	()
    _onDown	(x, y)
    _onMove	(x, y)
    _onMouseUp	(event)
    _onMouseDown	(event)
    _onMouseMove	(event)
    _onTouchStart	(event)
    _onTouchEnd	(event)
    _onTouchMove	(event)
    _buildJoystickBase	()
    _buildJoystickStick	()
    _move (style, x, y)
    _getTransformProperty ()
    _check3D ()
}

declare module Phaser {
        class VirtualJoystick extends Phaser.Plugin {

            constructor(game: Phaser.Game, parent: PIXI.DisplayObject);

            active: boolean;
            game: Phaser.Game;
            hasPostRender: boolean;
            hasPostUpdate: boolean;
            hasPreUpdate: boolean;
            hasRender: boolean;
            hasUpdate: boolean;
            parent: PIXI.DisplayObject;
            visible: boolean;

            destroy(): void;
            postRender(): void;
            preUpdate(): void;
            render(): void;
            update(): void;
        }
}