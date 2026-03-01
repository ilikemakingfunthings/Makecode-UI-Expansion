/**
 * Type definitions for UI Expansion Extension
 */

declare namespace ui {
    /**
     * UI Button class for creating interactive buttons
     */
    class UIButton {
        /**
         * Create a new UI button
         */
        constructor(x: number, y: number, w: number, h: number, text: string, normalImg: Image, hoverImg?: Image);
        
        /**
         * Change the button sprites for normal and hover states
         */
        setSprites(normal: Image, hover?: Image): void;
        
        /**
         * Set button text
         */
        setButtonText(text: string): void;
        
        /**
         * Handle click event
         */
        onClicked(handler: () => void): void;
        
        /**
         * Handle hover start event
         */
        onHover(handler: () => void): void;
        
        /**
         * Handle hover end event
         */
        onHoverEnd(handler: () => void): void;
        
        /**
         * Get button sprite
         */
        getSprite(): Sprite;
        
        /**
         * Destroy the button
         */
        destroy(): void;
    }
    
    /**
     * Show a cursor on the screen
     * @param sprite The sprite to use as cursor (defaults to arrow shape)
     */
    function showCursor(sprite: Image): void;
    
    /**
     * Hide the cursor
     */
    function hideCursor(): void;
    
    /**
     * Change the cursor sprite
     * @param sprite The new cursor sprite
     */
    function setCursorSprite(sprite: Image): void;
    
    /**
     * Get the current cursor sprite position
     */
    function getCursorX(): number;
    
    /**
     * Get the current cursor y position
     */
    function getCursorY(): number;
    
    /**
     * Create a new button - simplified
     * @param x X position
     * @param y Y position
     * @param width Button width
     * @param height Button height  
     * @param text Text to display on button
     * @param color Color of the button
     */
    function createButton(x: number, y: number, width: number, height: number, text: string, color?: number): UIButton;
    
    /**
     * Create a button with custom sprites
     */
    function createCustomButton(x: number, y: number, normal: Image, hover?: Image, text?: string): UIButton;
    
    /**
     * Get all active buttons
     */
    function getButtons(): UIButton[];
    
    /**
     * Remove a button from the UI
     */
    function removeButton(button: UIButton): void;
    
    /**
     * Clear all buttons
     */
    function clearButtons(): void;
}
