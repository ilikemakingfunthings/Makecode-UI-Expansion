// @ts-nocheck

//% color="#FF6B35" icon="\uf245"
namespace ui {
    //% block="create cursor with $img"
    //% img.shadow=screen_image_picker
    export function createCursor(img: Image): Sprite {
        return sprites.create(img)
    }
}
