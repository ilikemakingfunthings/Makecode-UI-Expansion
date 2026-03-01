# ⚡ Quick Start Guide - UI Expansion

**Get started with UI buttons in under 5 minutes!**

## Step 1: Show a Cursor (30 seconds)
```typescript
// Add this line to your main.ts
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)
```
That's it! You now have a cursor that follows D-pad input.

---

## Step 2: Create Your First Button (1 minute)
```typescript
// Create a button at position (80, 60)
let myButton = ui.createButton(80, 60, 60, 20, "Click Me", 7)

// Make it do something when clicked
myButton.onClicked(() => {
    game.splash("Button works!")
})
```

Done! Press the A button while hovering over it to trigger the click.

---

## Step 3: Add Multiple Buttons (2 minutes)
```typescript
// Create a button for each action
let playBtn = ui.createButton(40, 40, 80, 25, "► Play", 7)
let menuBtn = ui.createButton(40, 75, 80, 25, "☰ Menu", 5)
let quitBtn = ui.createButton(40, 110, 80, 25, "✕ Quit", 2)

// Handle clicks
playBtn.onClicked(startGame)
menuBtn.onClicked(showMenu)
quitBtn.onClicked(() => game.over(LOSE))
```

---

## Step 4: Custom Sprites (Optional, 1-2 minutes)
```typescript
// Create custom button images
let normalImg = img`
    1111111
    1fff01
    1111111
`

let hoverImg = img`
    1111111
    1111111
    1111111
`

// Use them!
let customBtn = ui.createCustomButton(80, 60, normalImg, hoverImg, "Go")
customBtn.onClicked(() => game.splash("Custom!"))
```

---

## 📝 Complete Minimal Example
```typescript
// Show cursor
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)

// Create button
let btn = ui.createButton(80, 60, 60, 20, "Click", 7)

// Handle click
btn.onClicked(() => {
    game.splash("You clicked!")
})

// Game loop
game.onUpdate(() => {
    // Your game code here
})
```

Copy this, run it, and you have a fully functional button!

---

## 🎨 Color Quick Reference
```
Red: 2        Green: 7       Orange: 4
Blue: 8       Purple: 10     Yellow: 5
Pink: 3       Black: 15      White: 1
```

---

## 🔥 Pro Tips

1. **Stack buttons vertically:**
   ```typescript
   let btn1 = ui.createButton(50, 40, 80, 25, "Top", 7)
   let btn2 = ui.createButton(50, 75, 80, 25, "Middle", 7)
   let btn3 = ui.createButton(50, 110, 80, 25, "Bottom", 7)
   ```

2. **Add hovering feedback:**
   ```typescript
   btn.onHover(() => effects.spray.startScreenEffect(50))
   ```

3. **Change button sprites dynamically:**
   ```typescript
   btn.setSprites(newNormalSprite, newHoverSprite)
   ```

4. **Clear all buttons:**
   ```typescript
   ui.clearButtons()
   ```

---

## ❓ Common Questions

**Q: What's the default cursor?**
A: A small red dot. Pass null to `showCursor()` or your own sprite.

**Q: How do I make clickable text only?**
A: Create a button with a transparent background image.

**Q: Can I reuse sprites for multiple buttons?**
A: Yes! Sprite objects are efficient and can be reused.

**Q: How many buttons can I have?**
A: Up to 20+ without performance issues.

**Q: Works on mobile?**
A: Works with keyboard D-pad input. Mobile support depends on the device.

---

**That's it! You're ready! Go build amazing UIs! 🚀**

*For more advanced features, see README.md and FEATURES.md*
