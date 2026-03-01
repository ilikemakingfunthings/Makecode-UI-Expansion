/**
 * UI Expansion Extension - Simple cursor and button blocks
 */
declare namespace ui {
    class UIButton {
        sprite: Sprite;
        isHovered: boolean;
        onClickHandler: () => void;
        
        constructor(x: number, y: number, img: Image);
        onClick(handler: () => void): void;
        destroy(): void;
    }
    
    /**
     * Show a cursor on the screen
     */
    function showCursor(img: Image): Sprite;
    
    /**
     * Hide the cursor
     */
    function hideCursor(): void;
    
    /**
     * Create a button
     */
    function createButton(x: number, y: number, img: Image): UIButton;
    
    /**
     * Set what happens when button is clicked
     */
    function onButtonClick(btn: UIButton, handler: () => void): void;
    
    /**
     * Clear all buttons
     */
    function clearButtons(): void;
}
