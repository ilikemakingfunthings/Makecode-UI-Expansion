# 🎮 UI Expansion Extension for MakeCode Arcade

A powerful and easy-to-use UI extension for MakeCode Arcade that provides interactive buttons, custom cursors, and UI animations.

## ✨ Features

- **Custom Cursor System** - Add a custom cursor sprite that follows controller input
- **Interactive Buttons** - Create buttons with text, custom sprites, and hover effects
- **Easy Sprite Customization** - Change sprites for normal and hover states
- **Smooth Hover Animations** - Automatic scaling and smooth transitions
- **Event Handling** - Handle click, hover, and hover-end events
- **Simple API** - Beginner-friendly blocks and TypeScript functions

## 🚀 Quick Start

### 1. Show a Cursor

```typescript
// Create a default cursor
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)

// Or use the simplified version (will use default red dot)
ui.showCursor(null)
```

### 2. Create a Button

```typescript
// Create a simple button at position (80, 60)
let myButton = ui.createButton(80, 60, 60, 20, "Click Me")

// Handle button clicks
myButton.onClicked(() => {
    game.showTip("Button clicked!")
})

// Handle hover event (when mouse enters button)
myButton.onHover(() => {
    game.showTip("Hovering over button")
})

// Handle hover end event (when mouse leaves button)
myButton.onHoverEnd(() => {
    game.showTip("Left button")
})
```

### 3. Customize Button Sprites

```typescript
// Create custom sprite images
let normalButton = img`
    1111111111
    1ffffff01
    1ffffff01
    1111111111
`

let hoverButton = img`
    1111111111
    1111111011
    1111111011
    1111111111
`

// Create button with custom sprites
let customBtn = ui.createCustomButton(100, 100, normalButton, hoverButton, "Play")

customBtn.onClicked(() => {
    game.splash("Game Started!")
})
```

## 📚 API Reference

### Cursor Functions

#### `ui.showCursor(sprite: Image)`
Displays a cursor on screen that follows controller input.
- **Parameters:**
  - `sprite`: The image to use as cursor (Image)
- **Example:** `ui.showCursor(assets.image\`myCursor\`)`

#### `ui.hideCursor()`
Hides the cursor from the screen.

#### `ui.setCursorSprite(sprite: Image)`
Changes the current cursor sprite.
- **Parameters:**
  - `sprite`: The new cursor image (Image)

#### `ui.getCursorX()`
Returns the X position of the cursor.
- **Returns:** number

#### `ui.getCursorY()`
Returns the Y position of the cursor.
- **Returns:** number

### Button Creation Functions

#### `ui.createButton(x, y, width, height, text, color?)`
Creates a simple rectangular button with optional color.
- **Parameters:**
  - `x`: X position (number)
  - `y`: Y position (number)
  - `width`: Button width in pixels (number)
  - `height`: Button height in pixels (number)
  - `text`: Display text (string)
  - `color`: Optional color index (0-15, default: 3=red)
- **Returns:** UIButton
- **Example:** 
  ```typescript
  let btn = ui.createButton(50, 50, 80, 25, "Start Game", 7)
  ```

#### `ui.createCustomButton(x, y, normal, hover?, text?)`
Creates a button with custom sprite images.
- **Parameters:**
  - `x`: X position (number)
  - `y`: Y position (number)
  - `normal`: Normal state sprite (Image)
  - `hover`: Hover state sprite - optional (Image)
  - `text`: Button text - optional (string)
- **Returns:** UIButton

### UIButton Class Methods

#### `setSprites(normal: Image, hover?: Image)`
Changes the button's sprites for normal and hover states.
```typescript
btn.setSprites(newNormalSprite, newHoverSprite)
```

#### `setButtonText(text: string)`
Changes the button's display text.
```typescript
btn.setButtonText("New Text")
```

#### `onClicked(handler: () => void)`
Registers a handler function for when button is clicked.
```typescript
btn.onClicked(() => {
    // Code runs when button is clicked
    myScore += 10
})
```

#### `onHover(handler: () => void)`
Registers a handler function for when mouse enters the button.
```typescript
btn.onHover(() => {
    effects.spray.startScreenEffect(100)
})
```

#### `onHoverEnd(handler: () => void)`
Registers a handler function for when mouse leaves the button.
```typescript
btn.onHoverEnd(() => {
    effects.spray.endScreenEffect()
})
```

#### `getSprite()`
Returns the internal sprite object.
```typescript
let sprite = btn.getSprite()
```

#### `destroy()`
Removes the button from the screen and cleans up resources.
```typescript
btn.destroy()
```

### UI Management

#### `ui.getButtons()`
Returns array of all active buttons.
```typescript
let buttons = ui.getButtons()
```

#### `ui.removeButton(button: UIButton)`
Removes a specific button from the UI.
```typescript
ui.removeButton(myButton)
```

#### `ui.clearButtons()`
Removes all buttons and clears the UI.
```typescript
ui.clearButtons()
```

## 💡 Complete Example

```typescript
namespace SpriteKind {
    export const Player = SpriteKind.Player
}

// Create cursor
ui.showCursor(img`
    1 . 1
    . 1 .
    1 . 1
`)

// Create main menu buttons
let playBtn = ui.createButton(30, 30, 70, 25, "Play", 7)
let settingsBtn = ui.createButton(30, 70, 70, 25, "Settings", 5)
let quitBtn = ui.createButton(30, 110, 70, 25, "Quit", 2)

// Play button
playBtn.onClicked(() => {
    ui.clearButtons()
    game.splash("Starting Game...")
})

playBtn.onHover(() => {
    effects.spray.startScreenEffect(50)
})

// Settings button
settingsBtn.onClicked(() => {
    game.splash("Settings Menu")
})

// Quit button
quitBtn.onClicked(() => {
    game.over(LOSE)
})

// Game update loop
game.onUpdate(() => {
    // Your game logic here
})
```

## 🎨 Color Reference

Common colors you can use with `createButton`:
- `0` - Transparent
- `1` - White
- `2` - Red
- `3` - Pink
- `4` - Orange
- `5` - Yellow
- `6` - Teal
- `7` - Green
- `8` - Blue
- `9` - Light Blue
- `10` - Purple
- `11` - Light Purple
- `12` - Dark Purple
- `13` - Tan
- `14` - Brown
- `15` - Black

## 🎯 Tips & Tricks

1. **Button Positioning**: Use consistent x/y values for button layouts
2. **Sprite States**: Create two images (normal and hover) for better UX
3. **Event Chaining**: Link button clicks to create game flow
4. **Hover Effects**: Use `onHover()` to add visual feedback
5. **Cursor Feedback**: Change cursor sprite based on game state

## 🔮 Future Features (Planned)

- ✅ Text rendering on buttons
- ✅ Click and hover events
- 🔄 Toggle switches
- 🔄 Dropdowns/menus
- 🔄 Text input fields
- 🔄 UI animations library
- 🔄 Layout grid system
- 🔄 Button states (disabled/selected)
- 🔄 Sound effects on interaction

## 📝 License

This extension is part of MakeCode Arcade and follows Microsoft's licensing terms.

## 🤝 Contributing

Found a bug or have a feature request? Feel free to contribute!

---

**Happy Building! 🎮✨**
