// @ts-nocheck

//% color="#FF6B35" icon="\uf245"
namespace ui {
    let cursorSprite: Sprite = null
    let lastButton: UIButton = null
    let allButtons: UIButton[] = []
    let cursorSpeed: number = 2
    let clickButton: ControllerButton = null
    let currentPage: UIPage = null
    let allPages: UIPage[] = []

    export class UIButton {
        sprite: Sprite
        onClickHandler: () => void
        page: UIPage

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

        hide() {
            this.sprite.setFlag(SpriteFlag.Invisible, true)
        }

        show() {
            this.sprite.setFlag(SpriteFlag.Invisible, false)
        }
    }

    export class UIPage {
        buttons: UIButton[] = []
        name: string

        constructor(pageName: string) {
            this.name = pageName
            allPages.push(this)
        }

        addButton(btn: UIButton) {
            this.buttons.push(btn)
            btn.page = this
        }

        show() {
            currentPage = this
            for (let btn of allButtons) {
                if (btn.page === this) {
                    btn.show()
                } else {
                    btn.hide()
                }
            }
        }

        hide() {
            for (let btn of this.buttons) {
                btn.hide()
            }
        }
    }

    //% block="set cursor speed to $speed"
    //% speed.defl=2
    export function setCursorSpeed(speed: number): void {
        cursorSpeed = speed
    }

    //% block="show cursor with $img"
    //% img.shadow=screen_image_picker
    export function showCursor(img: Image): void {
        if (cursorSprite) {
            cursorSprite.destroy()
        }
        cursorSprite = sprites.create(img)
        
        game.onUpdate(() => {
            if (cursorSprite) {
                cursorSprite.x += controller.dx() * cursorSpeed
                cursorSprite.y += controller.dy() * cursorSpeed
                
                if (cursorSprite.x < 0) cursorSprite.x = 0
                if (cursorSprite.x > screen.width) cursorSprite.x = screen.width
                if (cursorSprite.y < 0) cursorSprite.y = 0
                if (cursorSprite.y > screen.height) cursorSprite.y = screen.height
            }
        })
    }

    //% block="hide cursor"
    export function hideCursor(): void {
        if (cursorSprite) {
            cursorSprite.destroy()
            cursorSprite = null
        }
    }

    //% block="set click button to $btn"
    export function setClickButton(btn: ControllerButton): void {
        clickButton = btn
    }

    //% block="create button at x $x y $y with $img"
    //% x.defl=80
    //% y.defl=60
    //% img.shadow=screen_image_picker
    export function createButton(x: number, y: number, img: Image): void {
        let btn = new UIButton(x, y, img)
        lastButton = btn
        allButtons.push(btn)
        
        if (!clickButton) {
            clickButton = controller.A
        }
        
        clickButton.onEvent(ControllerButtonEvent.Pressed, () => {
            if (cursorSprite && btn.onClickHandler) {
                let dx = Math.abs(cursorSprite.x - btn.sprite.x)
                let dy = Math.abs(cursorSprite.y - btn.sprite.y)
                if (dx < 20 && dy < 20) {
                    btn.onClickHandler()
                }
            }
        })
    }

    //% block="on button click $handler"
    export function onButtonClick(handler: () => void): void {
        if (lastButton) {
            lastButton.onClick(handler)
        }
    }

    //% block="clear all buttons"
    export function clearButtons(): void {
        for (let btn of allButtons) {
            btn.destroy()
        }
        allButtons = []
        lastButton = null
    }

    //% block="create page named $name"
    export function createPage(name: string): UIPage {
        return new UIPage(name)
    }

    //% block="show page $page"
    export function showPage(page: UIPage): void {
        page.show()
    }

    //% block="hide page $page"
    export function hidePage(page: UIPage): void {
        page.hide()
    }

    //% block="add button to page $page"
    export function addButtonToPage(page: UIPage): void {
        if (lastButton) {
            page.addButton(lastButton)
        }
    }
}
