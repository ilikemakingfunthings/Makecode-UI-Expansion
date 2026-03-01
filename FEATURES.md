# 🎮 UI Expansion Extension - Feature Guide

## Overview

The **UI Expansion Extension** for MakeCode Arcade is a powerful, easy-to-use library that makes creating professional-looking UI elements incredibly simple. Whether you're building a menu system, game interface, or interactive controls, this extension has you covered!

## ✨ Core Features

### 1. **Cursor System** 🎯
Transform your game's input into a visual cursor!

**Key Capabilities:**
- ✅ Custom cursor sprite support
- ✅ Automatic position tracking based on controller input
- ✅ Show/hide functionality
- ✅ Get cursor coordinates anytime
- ✅ Sprite swapping for different cursor states

**Example:**
```typescript
// Show custom cursor
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)

// Get cursor position for collision detection
let x = ui.getCursorX()
let y = ui.getCursorY()

// Change cursor dynamically
ui.setCursorSprite(pointerSprite)

// Hide when needed
ui.hideCursor()
```

---

### 2. **Interactive Buttons** 🔘
Create responsive buttons with minimal code!

**Features:**
- ✅ Automatic hover detection
- ✅ Smooth scale animations
- ✅ Custom sprite support
- ✅ Multiple event handlers
- ✅ Easy positioning
- ✅ Text display support
- ✅ Chainable event API

**Button States:**
- **Normal**: Default appearance
- **Hover**: Larger (1.1x scale) with hover sprite
- **Active**: Can be triggered with A button or spacebar

---

### 3. **Hover Animations** ✨
Smooth, automatic animations for better UX!

**What's Included:**
- ✅ Smooth scale transitions (0.1 scale increase on hover)
- ✅ Sprite swapping for hover effects
- ✅ 30 FPS frame-perfect animation
- ✅ Configurable hover speeds

**How It Works:**
```python
Scale progression on hover:
Frame 0: 1.0x (normal)
Frame 1: 1.02x
Frame 2: 1.04x
...
Frame 5: 1.10x (hover state reached)
Frame 0 (on leave): 1.10x
...
Frame 5: 1.0x (normal state reached)
```

---

### 4. **Easy-to-Use API** 📚
Designed for beginners but powerful enough for experts!

**Simple Button Creation:**
```typescript
// 3-line setup for a complete button!
let btn = ui.createButton(x, y, width, height, "Text", color)
btn.onClicked(() => { /* do something */ })
btn.onHover(() => { /* visual feedback */ })
```

**Advanced Custom Buttons:**
```typescript
let btn = ui.createCustomButton(x, y, normalSprite, hoverSprite, "Text")
btn.setSprites(newNormalSprite, newHoverSprite)
btn.setButtonText("New Text")
```

---

## 🎨 Customization Options

### Button Colors
Use color indices 0-15 for createButton():
```
0=Transparent, 1=White, 2=Red, 3=Pink, 4=Orange, 5=Yellow
6=Teal, 7=Green, 8=Blue, 9=LightBlue, 10=Purple, 11=LightPurple
12=DarkPurple, 13=Tan, 14=Brown, 15=Black
```

### Custom Sprites
Create your own button appearances:
```typescript
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

let btn = ui.createCustomButton(100, 100, normalButton, hoverButton, "Click!")
```

---

## 🎯 Advanced Usage Patterns

### Pattern 1: Menu System
```typescript
function createMainMenu() {
    let playBtn = ui.createButton(50, 40, 80, 25, "Play", 7)
    let settingsBtn = ui.createButton(50, 75, 80, 25, "Settings", 5)
    let quitBtn = ui.createButton(50, 110, 80, 25, "Quit", 2)
    
    playBtn.onClicked(startGame)
    settingsBtn.onClicked(showSettings)
    quitBtn.onClicked(quitGame)
}
```

### Pattern 2: Dynamic Button States
```typescript
let buttons = [
    ui.createButton(30, 30, 50, 20, "1", 7),
    ui.createButton(90, 30, 50, 20, "2", 7),
    ui.createButton(150, 30, 50, 20, "3", 7)
]

buttons.forEach((btn, index) => {
    btn.onClicked(() => {
        game.splash(`Clicked button ${index + 1}`)
    })
})
```

### Pattern 3: Hover Sound Feedback
```typescript
let btn = ui.createButton(80, 60, 60, 25, "Click")

btn.onHover(() => {
    music.play(music.noteSequence`C5 C5`, music.PlaybackMode.InBackground)
})
```

### Pattern 4: Click Animation Feedback
```typescript
let btn = ui.createButton(80, 60, 60, 25, "Blast")

btn.onClicked(() => {
    effects.spray.startScreenEffect(100)
    game.splash("BOOM!")
})
```

### Pattern 5: Button Enable/Disable Logic
```typescript
let myBtn = ui.createButton(80, 60, 60, 25, "Continue")

// Disable by removing and recreating with different UX
let isEnabled = true

myBtn.onClicked(() => {
    if (isEnabled) {
        startNextLevel()
    }
})
```

---

## 🚀 Performance Considerations

✅ **Optimized for MakeCode Arcade:**
- Minimal memory overhead per button
- Efficient collision detection
- 30 FPS compatible
- No external dependencies needed
- Event-driven architecture

**Performance Tips:**
1. Use `ui.clearButtons()` to clean up unused buttons
2. Keep button count under 20 for smoothest performance
3. Use sprite reuse when possible
4. Avoid heavy computations in event handlers

---

## 🔮 Future Planned Features

### Phase 2:
- [ ] Toggle switches
- [ ] Dropdown menus
- [ ] Slider controls
- [ ] Text input fields

### Phase 3:
- [ ] UI animation presets
- [ ] Layout grid system
- [ ] Focus/tab navigation
- [ ] Keyboard shortcuts

### Phase 4:
- [ ] UI themes
- [ ] Button states (disabled, selected, loading)
- [ ] Tooltip system
- [ ] Drag & drop support

---

## 🎓 Learning Outcomes

After using this extension, you'll understand:
- ✅ Object-oriented UI programming
- ✅ Event-driven architecture
- ✅ State management
- ✅ Sprite manipulation
- ✅ Collision detection
- ✅ Frame-based animation

---

## 🤝 Best Practices

1. **Always show a cursor** - Users need visual feedback on where they're clicking
2. **Use hover animations** - Gives immediate feedback that button is clickable
3. **Test on device** - Button hit detection works best with actual input
4. **Keep text short** - MakeCode Arcade has limited screen space
5. **Use consistent spacing** - Professional look comes from alignment
6. **Provide audio feedback** - Combine visual and audio feedback
7. **Clean up old buttons** - Use `removeButton()` or `clearButtons()`

---

## 📊 Comparison to Other Solutions

| Feature | UI Expansion | Sprites Only | Game.Splash |
|---------|---|---|---|
| Custom cursors | ✅ | ❌ | ❌ |
| Click detection | ✅ | ⚠️ Manual | ❌ |
| Hover animations | ✅ | ❌ | ❌ |
| Custom sprites | ✅ | ✅ | ❌ |
| Multiple buttons | ✅ | ⚠️ Complex | ❌ |
| Event handlers | ✅ | ❌ | ❌ |
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |

---

## 🐛 Troubleshooting

**Q: Button doesn't respond to clicks**
A: Make sure you've called `ui.showCursor()` first!

**Q: Cursor doesn't move**
A: Check that controller left/right D-pad works. Cursor follows D-pad input.

**Q: Buttons overlap and are hard to click**
A: Use proper spacing: `y = previousY + height + 10`

**Q: Hover animation seems jerky**
A: This is normal on older devices. Performance is prioritized.

**Q: Can I use this on multiplayer?**
A: Currently designed for single player. Multiplayer support coming in future!

---

## 💬 Feedback & Support

Found a bug? Have a feature request?
- Check the README.md for comprehensive documentation
- Look at example.ts for common patterns
- Review the API reference for detailed function signatures

---

**Happy Building! 🎮✨**

*UI Expansion Extension v1.0.0*
