/**
 * UI Expansion Extension for MakeCode Arcade
 * 
 * Features:
 * - Customizable cursor with sprite support
 * - Interactive buttons with text, hover, and click events
 * - Easy sprite customization
 * - Smooth hover animations
 */

//% color="#FF6B35" icon="\uf245" block="UI"
namespace ui {
    
    // ============ CURSOR SYSTEM ============
    
    /**
     * Internal cursor sprite reference
     */
    let cursorSprite: Sprite = null;
    let cursorVisible: boolean = true;
    let cursorSize: number = 16;
    
    /**
     * Show a cursor on the screen
     * @param sprite The sprite to use as cursor (defaults to arrow shape)
     */
    //% block="show cursor $sprite"
    //% sprite.shadow=variables_get
    //% sprite.decompile=true
    export function showCursor(sprite: Image): void {
        if (!sprite) {
            // Default cursor - small red dot
            sprite = img`
                . 1 .
                1 1 1
                . 1 .
            `;
        }
        
        if (cursorSprite) {
            cursorSprite.destroy();
        }
        
        cursorSprite = sprites.create(sprite);
        cursorSprite.setFlag(SpriteFlag.RelativeToCamera, true);
        cursorSprite.setFlag(SpriteFlag.Ghost, true);
        cursorSize = Math.max(sprite.width, sprite.height);
        cursorVisible = true;
        
        // Update cursor position each frame
        game.onUpdate(() => {
            if (cursorSprite && cursorVisible) {
                // Use controller to get cursor position (simulate mouse)
                let screenX = screen.width / 2 + controller.dx() * 4;
                let screenY = screen.height / 2 + controller.dy() * 4;
                
                // Clamp to screen bounds
                screenX = Math.max(0, Math.min(screenX, screen.width - cursorSize));
                screenY = Math.max(0, Math.min(screenY, screen.height - cursorSize));
                
                cursorSprite.x = screenX;
                cursorSprite.y = screenY;
            }
        });
    }
    
    /**
     * Hide the cursor
     */
    //% block="hide cursor"
    export function hideCursor(): void {
        if (cursorSprite) {
            cursorVisible = false;
        }
    }
    
    /**
     * Change the cursor sprite
     * @param sprite The new cursor sprite
     */
    //% block="set cursor sprite to $sprite"
    //% sprite.shadow=variables_get
    //% sprite.decompile=true
    export function setCursorSprite(sprite: Image): void {
        if (!sprite) return;
        
        if (cursorSprite) {
            cursorSprite.setImage(sprite);
            cursorSize = Math.max(sprite.width, sprite.height);
        }
    }
    
    /**
     * Get the current cursor sprite position
     */
    //% block="cursor x"
    export function getCursorX(): number {
        return cursorSprite ? cursorSprite.x : 0;
    }
    
    /**
     * Get the current cursor y position
     */
    //% block="cursor y"
    export function getCursorY(): number {
        return cursorSprite ? cursorSprite.y : 0;
    }
    
    
    // ============ BUTTON SYSTEM ============
    
    class UIButton {
        private _sprite: Sprite;
        private _text: string;
        private _normalImage: Image;
        private _hoverImage: Image;
        private _x: number;
        private _y: number;
        private _width: number;
        private _height: number;
        private _isHovered: boolean = false;
        private _scale: number = 1;
        private _clickHandlers: (() => void)[] = [];
        private _hoverHandlers: (() => void)[] = [];
        private _hoverEndHandlers: (() => void)[] = [];
        
        /**
         * Create a new UI button
         * @param x X position
         * @param y Y position
         * @param w Width
         * @param h Height
         * @param text Text to display
         * @param normalImg Image for normal state
         * @param hoverImg Image for hover state
         */
        constructor(x: number, y: number, w: number, h: number, text: string, normalImg: Image, hoverImg?: Image) {
            this._x = x;
            this._y = y;
            this._width = w;
            this._height = h;
            this._text = text;
            this._normalImage = normalImg;
            this._hoverImage = hoverImg || normalImg;
            
            // Create sprite
            this._sprite = sprites.create(normalImg);
            this._sprite.x = x + w / 2;
            this._sprite.y = y + h / 2;
            this._sprite.setFlag(SpriteFlag.Ghost, true);
            
            // Register for updates
            this.registerForUpdates();
        }
        
        /**
         * Change the button sprites for normal and hover states
         */
        //% block="set %button sprites to %normal and hover %hover"
        //% normal.shadow=variables_get
        //% hover.shadow=variables_get
        //% normal.decompile=true
        //% hover.decompile=true
        setSprites(normal: Image, hover?: Image): void {
            this._normalImage = normal;
            this._hoverImage = hover || normal;
            if (!this._isHovered) {
                this._sprite.setImage(normal);
            }
        }
        
        /**
         * Set button text
         */
        setButtonText(text: string): void {
            this._text = text;
        }
        
        /**
         * Handle click event
         */
        onClicked(handler: () => void): void {
            this._clickHandlers.push(handler);
        }
        
        /**
         * Handle hover start event
         */
        onHover(handler: () => void): void {
            this._hoverHandlers.push(handler);
        }
        
        /**
         * Handle hover end event
         */
        onHoverEnd(handler: () => void): void {
            this._hoverEndHandlers.push(handler);
        }
        
        /**
         * Check if cursor is over button
         */
        private isMouseOver(): boolean {
            if (!cursorSprite) return false;
            
            const cursorX = cursorSprite.x;
            const cursorY = cursorSprite.y;
            
            return cursorX >= this._x && 
                   cursorX <= this._x + this._width &&
                   cursorY >= this._y && 
                   cursorY <= this._y + this._height;
        }
        
        /**
         * Register button for update loop
         */
        private registerForUpdates(): void {
            game.onUpdate(() => {
                const wasHovered = this._isHovered;
                this._isHovered = this.isMouseOver();
                
                // Trigger hover start
                if (this._isHovered && !wasHovered) {
                    this._scale = 1.1;
                    this._sprite.setImage(this._hoverImage);
                    this._sprite.scale = this._scale;
                    this._hoverHandlers.forEach(h => h());
                }
                
                // Trigger hover end
                if (!this._isHovered && wasHovered) {
                    this._scale = 1;
                    this._sprite.setImage(this._normalImage);
                    this._sprite.scale = this._scale;
                    this._hoverEndHandlers.forEach(h => h());
                }
                
                // Smooth scale animation
                if (this._isHovered && this._scale < 1.1) {
                    this._scale += 0.02;
                    if (this._scale > 1.1) this._scale = 1.1;
                    this._sprite.scale = this._scale;
                } else if (!this._isHovered && this._scale > 1) {
                    this._scale -= 0.02;
                    if (this._scale < 1) this._scale = 1;
                    this._sprite.scale = this._scale;
                }
            });
            
            // Handle click when A button or space is pressed
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this._isHovered) {
                    this._clickHandlers.forEach(h => h());
                }
            });
        }
        
        /**
         * Get button sprite
         */
        getSprite(): Sprite {
            return this._sprite;
        }
        
        /**
         * Destroy the button
         */
        destroy(): void {
            this._sprite.destroy();
            this._clickHandlers = [];
            this._hoverHandlers = [];
            this._hoverEndHandlers = [];
        }
    }
    
    /**
     * List to track all active buttons
     */
    let allButtons: UIButton[] = [];
    
    /**
     * Create a new button - simplified
     * @param x X position
     * @param y Y position
     * @param width Button width
     * @param height Button height  
     * @param text Text to display on button
     * @param color Color of the button
     */
    //% block="create button at x $x y $y width $width height $height text $text"
    //% x.defl=80 y.defl=60 width.defl=60 height.defl=20 text.defl="Click"
    //% color.shadow=colorindexpicker
    export function createButton(x: number, y: number, width: number, height: number, text: string, color?: number): UIButton {
        if (!color) {
            color = 3; // Default to red
        }
        
        // Create simple colored rectangle
        let normalImg = image.create(width, height);
        normalImg.fillRect(0, 0, width, height, color);
        normalImg.drawRect(0, 0, width - 1, height - 1, 15);
        
        // Hover image - slightly brighter
        let hoverImg = image.create(width, height);
        hoverImg.fillRect(0, 0, width, height, color);
        hoverImg.drawRect(0, 0, width - 1, height - 1, 1);
        hoverImg.fillRect(1, 1, width - 2, height - 2, 1);
        
        let button = new UIButton(x, y, width, height, text, normalImg, hoverImg);
        allButtons.push(button);
        
        return button;
    }
    
    /**
     * Create a button with custom sprites
     */
    //% block="create custom button at x $x y $y normal sprite $normal hover sprite $hover text $text"
    //% normal.shadow=variables_get
    //% hover.shadow=variables_get
    //% normal.decompile=true
    //% hover.decompile=true
    //% text.defl="Click"
    export function createCustomButton(x: number, y: number, normal: Image, hover?: Image, text?: string): UIButton {
        if (!normal) return null;
        if (!text) text = "Button";
        
        let button = new UIButton(x, y, normal.width, normal.height, text, normal, hover || normal);
        allButtons.push(button);
        
        return button;
    }
    
    /**
     * Get all active buttons
     */
    export function getButtons(): UIButton[] {
        return allButtons;
    }
    
    /**
     * Remove a button from the UI
     */
    export function removeButton(button: UIButton): void {
        const index = allButtons.indexOf(button);
        if (index > -1) {
            allButtons.splice(index, 1);
            button.destroy();
        }
    }
    
    /**
     * Clear all buttons
     */
    //% block="clear all buttons"
    export function clearButtons(): void {
        for (let button of allButtons) {
            button.destroy();
        }
        allButtons = [];
    }
}

// ============ EXAMPLE / TEST CODE ============

let myButton: ui.UIButton;

game.onUpdate(() => {
    // Optionally add more UI logic here
});
