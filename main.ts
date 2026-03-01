//% color="#FF6B35" icon="\uf245" block="UI"
namespace ui {
    let cursorSprite: Sprite = null
    let cursorVisible: boolean = true
    let allButtons: UIButton[] = []

    export class UIButton {
        sprite: Sprite
        isHovered: boolean = false
        onClickHandler: () => void = null

        constructor(x: number, y: number, img: Image) {
            this.sprite = sprites.create(img)
            this.sprite.setPosition(x, y)
            this.sprite.setFlag(SpriteFlag.Ghost, true)
        }

        onClick(handler: () => void) {
            this.onClickHandler = handler
        }

        destroy() {
            this.sprite.destroy()
        }
    }

    //% block="show cursor $img"
    //% img.shadow=variables_get
    //% img.decompile=true
    export function showCursor(img: Image): Sprite {
        if (cursorSprite) {
            cursorSprite.destroy()
        }
        cursorSprite = sprites.create(img)
        cursorSprite.setFlag(SpriteFlag.Ghost, true)
        cursorVisible = true
        
        game.onUpdate(() => {
            if (cursorSprite && cursorVisible) {
                cursorSprite.x = screen.width / 2 + controller.dx() * 4
                cursorSprite.y = screen.height / 2 + controller.dy() * 4
            }
        })
        return cursorSprite
    }

    //% block="hide cursor"
    export function hideCursor(): void {
        if (cursorSprite) {
            cursorVisible = false
        }
    }

    //% block="create button at x $x y $y image $img"
    //% x.defl=80
    //% y.defl=60
    //% img.shadow=variables_get
    //% img.decompile=true
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

    //% block="$btn on click $handler"
    //% btn.decompile=true
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
}
