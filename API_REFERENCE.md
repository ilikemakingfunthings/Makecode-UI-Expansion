# 📋 API Reference Card - UI Expansion

Quick reference for all UI Expansion functions and methods.

---

## 🎯 CURSOR API

### `ui.showCursor(sprite: Image): void`
Display a cursor on screen that follows D-pad input.
```typescript
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)
```
- **Use:** At start of your game
- **Returns:** void
- **Note:** Pass `null` or nothing for default red dot

---

### `ui.hideCursor(): void`
Hide the cursor from view.
```typescript
ui.hideCursor()
```
- **Use:** When you don't need the cursor
- **Returns:** void

---

### `ui.setCursorSprite(sprite: Image): void`
Change the cursor sprite dynamically.
```typescript
ui.setCursorSprite(pointerImage)
```
- **Parameters:** sprite (Image) - new cursor image
- **Returns:** void
- **Example:** Change cursor when hovering over special areas

---

### `ui.getCursorX(): number`
Get cursor's X position.
```typescript
let x = ui.getCursorX()
```
- **Returns:** number (0 to 160)
- **Use:** For collision detection, UI positioning

---

### `ui.getCursorY(): number`
Get cursor's Y position.
```typescript
let y = ui.getCursorY()
```
- **Returns:** number (0 to 120)
- **Use:** For collision detection, UI positioning

---

## 🔘 BUTTON CREATION API

### `ui.createButton(x, y, width, height, text, color?): UIButton`
Create a simple colored rectangular button.
```typescript
let btn = ui.createButton(50, 50, 80, 25, "Click", 7)
```

**Parameters:**
| Param | Type | Example | Notes |
|-------|------|---------|-------|
| x | number | 50 | X position in pixels |
| y | number | 50 | Y position in pixels |
| width | number | 80 | Button width in pixels |
| height | number | 25 | Button height in pixels |
| text | string | "Click" | Display text |
| color | number | 7 | Optional color (0-15) |

**Returns:** UIButton object

**Color Reference:**
0=Transparent, 1=White, 2=Red, 3=Pink, 4=Orange, 5=Yellow, 6=Teal, 7=Green, 8=Blue, 9=LightBlue, 10=Purple, 11=LightPurple, 12=DarkPurple, 13=Tan, 14=Brown, 15=Black

---

### `ui.createCustomButton(x, y, normal, hover?, text?): UIButton`
Create a button with custom sprites.
```typescript
let btn = ui.createCustomButton(80, 60, normalImg, hoverImg, "Go")
```

**Parameters:**
| Param | Type | Example | Required |
|-------|------|---------|----------|
| x | number | 80 | Yes |
| y | number | 60 | Yes |
| normal | Image | normalImg | Yes |
| hover | Image | hoverImg | No |
| text | string | "Go" | No |

**Returns:** UIButton object

---

## 🎮 BUTTON CLASS API

### `button.onClicked(handler: () => void): void`
Register function to run when button is clicked.
```typescript
btn.onClicked(() => {
    game.splash("Clicked!")
})
```
- **Trigger:** When cursor is over button and A button pressed
- **Multiple handlers:** You can register multiple handlers

---

### `button.onHover(handler: () => void): void`
Register function to run when cursor enters button.
```typescript
btn.onHover(() => {
    game.splash("Hovering!")
})
```
- **Trigger:** When cursor first enters button area
- **Auto animation:** Scale increases to 1.1x

---

### `button.onHoverEnd(handler: () => void): void`
Register function to run when cursor leaves button.
```typescript
btn.onHoverEnd(() => {
    game.splash("Left button")
})
```
- **Trigger:** When cursor leaves button area
- **Auto animation:** Scale decreases back to 1.0x

---

### `button.setSprites(normal: Image, hover?: Image): void`
Change button sprites after creation.
```typescript
btn.setSprites(newNormalSprite, newHoverSprite)
```
- **Use:** To change button appearance dynamically
- **Parameters:**
  - normal (Image) - sprite for normal state (required)
  - hover (Image) - sprite for hover state (optional)

---

### `button.setButtonText(text: string): void`
Change button display text.
```typescript
btn.setButtonText("New Text")
```
- **Use:** To update button label
- **Note:** Text rendering depends on sprite size

---

### `button.getSprite(): Sprite`
Get the internal sprite object.
```typescript
let sprite = btn.getSprite()
sprite.x = 100
```
- **Returns:** Sprite object
- **Advanced use:** Direct sprite manipulation

---

### `button.destroy(): void`
Remove button and clean up resources.
```typescript
btn.destroy()
```
- **Use:** Before creating a new button set
- **Note:** Use `ui.clearButtons()` to destroy all

---

## 🎛️ BUTTON MANAGEMENT API

### `ui.getButtons(): UIButton[]`
Get array of all active buttons.
```typescript
let buttons = ui.getButtons()
let count = buttons.length
```
- **Returns:** Array of UIButton objects
- **Use:** To iterate over all buttons

---

### `ui.removeButton(button: UIButton): void`
Remove specific button from UI.
```typescript
ui.removeButton(myButton)
```
- **Parameters:** button (UIButton) - button to remove
- **Use:** To remove button individually

---

### `ui.clearButtons(): void`
Remove all buttons at once.
```typescript
ui.clearButtons()
```
- **Use:** Between menu screens, game states
- **Effect:** Destroys all buttons

---

## 📊 BUTTON STATES & PROPERTIES

### Automatic Button States:
```
STATE          SCALE   SPRITE         TRIGGER
────────────────────────────────────────────────────
Normal         1.0x    normalImg      Initial state
Hover          1.1x    hoverImg       Cursor over button
Hover Anim     1.0→1.1x transition    Smooth interpolation
```

---

## 💡 CODE PATTERNS

### Pattern: Simple Button
```typescript
let btn = ui.createButton(80, 60, 60, 20, "Click", 7)
btn.onClicked(() => game.splash("Clicked!"))
```

### Pattern: Button With Hover Feedback
```typescript
let btn = ui.createButton(80, 60, 60, 20, "Click", 7)
btn.onHover(() => music.playTone(880, music.beat(BeatFraction.Quarter)))
btn.onClicked(() => game.splash("Clicked!"))
```

### Pattern: Multiple Buttons
```typescript
let buttons = [
    ui.createButton(20, 20, 60, 20, "1", 7),
    ui.createButton(20, 50, 60, 20, "2", 5),
    ui.createButton(20, 80, 60, 20, "3", 2)
]

buttons.forEach((btn, i) => {
    btn.onClicked(() => game.splash(`Clicked ${i + 1}`))
})
```

### Pattern: Custom Sprites
```typescript
let normalBtn = img`12122222`
let hoverBtn = img`22211111`

let btn = ui.createCustomButton(80, 60, normalBtn, hoverBtn, "Custom")
btn.onClicked(() => game.splash("Custom button!"))
```

### Pattern: Dynamic Button Updates
```typescript
let btn = ui.createButton(80, 60, 80, 25, "Start", 7)

btn.onClicked(() => {
    btn.setButtonText("Running...")
    game.splash("Game started!")
})
```

### Pattern: Screen Transitions
```typescript
function showMainMenu() {
    ui.clearButtons()
    let playBtn = ui.createButton(50, 40, 80, 25, "Play", 7)
    playBtn.onClicked(showGame)
}

function showGame() {
    ui.clearButtons()
    // Game code here
}

showMainMenu()
```

---

## 🚀 COMPLETE MINIMAL EXAMPLE

```typescript
// 1. Show cursor
ui.showCursor(img`. 1 . 1 1 1 . 1 .`)

// 2. Create button
let btn = ui.createButton(80, 60, 60, 20, "Click", 7)

// 3. Add click handler
btn.onClicked(() => game.splash("Clicked!"))

// 4. Game loop
game.onUpdate(() => {
    // Your game code
})
```

Copy, paste, done! ✨

---

## ⚠️ COMMON ISSUES & FIXES

| Problem | Solution |
|---------|----------|
| Button doesn't respond | Call `ui.showCursor()` first |
| Cursor doesn't move | Check D-pad input works |
| Buttons overlap awkwardly | Use proper spacing: `y = prevY + height + 10` |
| Performance drops | Keep button count under 20 |
| Can't click button | Make sure button is in visible screen area |
| Text doesn't show | Sprite might be too small for text |

---

## 📦 DEPENDENCIES

- MakeCode Arcade (latest)
- Sprites module (built-in)
- Game module (built-in)
- Controller module (built-in)

No additional dependencies needed!

---

## 🔄 VERSION HISTORY

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial release with cursor, buttons, animations |

---

**For more examples, see example.ts and FEATURES.md**

**Questions? Check README.md and QUICKSTART.md**

---

*UI Expansion Extension API Reference v1.0.0*
