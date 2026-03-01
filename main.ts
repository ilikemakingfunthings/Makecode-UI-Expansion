// @ts-nocheck

//% color="#FF6B35" icon="\uf245"
namespace ui {
    let cursorSprite: Sprite = null
    let allButtons: UIButton[] = []

    export class UIButton {
        sprite: Sprite
        onClickHandler: () => void

        constructor(x: number, y: number, img: Image) {
            this.sprite = sprites.create(img)
            this.sprite.setPosition(x, y)
        }

        onClick(handler: () => void) {
            this.onClickHandler = handler
        }

        destroy() {
            this.sprite.destroy()
        }
    }

    //% block="show cursor with $img"
    //% img.shadow=screen_image_picker
    export function showCursor(img: Image): Sprite {
        if (cursorSprite) {
            cursorSprite.destroy()
        }
        cursorSprite = sprites.create(img)
        
        game.onUpdate(() => {
            if (cursorSprite) {
                cursorSprite.x = screen.width / 2 + controller.dx() * 4
                cursorSprite.y = screen.height / 2 + controller.dy() * 4
            }
        })
        return cursorSprite
    }

    //% block="hide cursor"
    export function hideCursor(): void {
        if (cursorSprite) {
            cursorSprite.destroy()
            cursorSprite = null
        }
    }

    //% block="create button at x $x y $y with $img"
    //% x.defl=80
    //% y.defl=60
    //% img.shadow=screen_image_picker
    export function createButton(x: number, y: number, img: Image): UIButton {
        let btn = new UIButton(x, y, img)
        allButtons.push(btn)
        
        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
            if (cursorSprite && btn.onClickHandler) {
                let dx = Math.abs(cursorSprite.x - btn.sprite.x)
                let dy = Math.abs(cursorSprite.y - btn.sprite.y)
                if (dx < 20 && dy < 20) {
                    btn.onClickHandler()
                }
            }
        })
        
        return btn
    }

    //% block="on $btn click $handler"
    export function onButtonClick(btn: UIButton, handler: () => void): void {
        btn.onClick(handler)
    }

    //% block="clear all buttons"
    export function clearButtons(): void {
        for (let btn of allButtons) {
            btn.destroy()
        }
        allButtons = []
    }

    //% block="create cursor with $img"
    //% img.shadow=screen_image_picker
    export function createCursor(img: Image): Sprite {
        return sprites.create(img)
    }
}
