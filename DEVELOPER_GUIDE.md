# 👨‍💻 Developer's Guide - UI Expansion Extension

Internal documentation for developers extending or modifying the extension.

---

## 📐 Architecture Overview

```
UI Expansion Extension
├── Cursor System
│   ├── cursorSprite (internal state)
│   ├── cursorVisible (boolean flag)
│   └── Position update loop (game.onUpdate)
│
├── Button System
│   ├── UIButton class
│   │   ├── Private properties (_sprite, _x, _y, etc.)
│   │   ├── Event handlers (_clickHandlers, _hoverHandlers, etc.)
│   │   └── Collision detection (isMouseOver)
│   │
│   └── Helper functions
│       ├── createButton (ColoredVersion)
│       ├── createCustomButton (SpriteVersion)
│       └── Management functions
│
└── State Management
    └── allButtons[] (global array)
```

---

## 🔧 Code Structure

### File Organization

```typescript
main.ts (372 lines)
├── Namespace: ui
│
├── Section 1: CURSOR SYSTEM (95 lines)
│   ├── Global variables (3 variables)
│   ├── showCursor()
│   ├── hideCursor()
│   ├── setCursorSprite()
│   ├── getCursorX()
│   └── getCursorY()
│
├── Section 2: BUTTON SYSTEM - CLASS (160 lines)
│   └── class UIButton
│       ├── Properties (private _sprite, _text, _x, _y, _width, _height, etc.)
│       ├── Constructor
│       ├── Public methods
│       ├── Private methods
│       └── Event registration
│
├── Section 3: BUTTON SYSTEM - HELPERS (60 lines)
│   ├── createButton()
│   ├── createCustomButton()
│   ├── getButtons()
│   ├── removeButton()
│   └── clearButtons()
│
└── Section 4: EXAMPLE CODE (1 line)
    └── Minimal game setup
```

---

## 🎯 Core Classes & Objects

### UIButton Class

```typescript
class UIButton {
    // Properties
    _sprite: Sprite           // Display sprite
    _text: string             // Button text
    _normalImage: Image       // Normal state sprite
    _hoverImage: Image        // Hover state sprite
    _x: number                // X position
    _y: number                // Y position
    _width: number            // Button width
    _height: number           // Button height
    _isHovered: boolean       // Hover state flag
    _scale: number            // Current scale (1.0 - 1.1)
    _clickHandlers: (() => void)[]    // Click callbacks
    _hoverHandlers: (() => void)[]    // Hover callbacks
    _hoverEndHandlers: (() => void)[] // Hover end callbacks
    
    // Methods
    constructor(x, y, w, h, text, normalImg, hoverImg?)
    setSprites(normal, hover?)
    setButtonText(text)
    onClicked(handler)
    onHover(handler)
    onHoverEnd(handler)
    isMouseOver(): boolean (private)
    registerForUpdates() (private)
    getSprite()
    destroy()
}
```

---

## 🔄 Data Flow

### Button Click Flow
```
User presses A button (game.onUpdate)
    ↓
Check if cursor is over any button (isMouseOver)
    ↓
Execute all handlers in button._clickHandlers
    ↓
Game code responds (e.g., sound, state change)
```

### Hover Animation Flow
```
Each frame (game.onUpdate)
    ↓
For each button, check isMouseOver()
    ↓
If wasHovered != isHovered, trigger events
    ↓
Smoothly interpolate _scale (1.0 ↔ 1.1)
    ↓
Update sprite.scale
```

### Cursor Movement Flow
```
Each frame (game.onUpdate)
    ↓
Read controller.dx() and controller.dy()
    ↓
Calculate new cursor position
    ↓
Clamp to screen bounds
    ↓
Update cursorSprite position
```

---

## 🛠️ Extending the Extension

### Adding a New Event Type

Example: Add `onPressed` event for when button is actively held

1. **Add handler array to UIButton:**
```typescript
private _pressedHandlers: (() => void)[] = [];
```

2. **Add public method:**
```typescript
onPressed(handler: () => void): void {
    this._pressedHandlers.push(handler);
}
```

3. **Add detection logic in registerForUpdates:**
```typescript
if (this._isHovered && controller.A.isPressed()) {
    this._pressedHandlers.forEach(h => h());
}
```

4. **Update type definitions in ui.d.ts**

---

### Adding Toggle Switch Component

1. **Create new class:**
```typescript
class UIToggle {
    private _isOn: boolean = false;
    private _sprites: { on: Image, off: Image };
    
    setOn(value: boolean): void {
        this._isOn = value;
        this._sprite.setImage(value ? this._sprites.on : this._sprites.off);
    }
    
    toggle(): void {
        this.setOn(!this._isOn);
    }
}
```

2. **Create factory function:**
```typescript
export function createToggle(x, y, w, h, onImg, offImg): UIToggle {
    return new UIToggle(x, y, w, h, onImg, offImg);
}
```

3. **Add to management:**
```typescript
let allToggles: UIToggle[] = [];
```

---

### Adding UI Animation Presets

```typescript
export namespace animations {
    export function pulse(button: UIButton, duration: number): void {
        // Scale up then down repeatedly
    }
    
    export function bounce(button: UIButton, count: number): void {
        // Bounce effect
    }
    
    export function flash(button: UIButton, times: number): void {
        // Alternate sprite rapidly
    }
}
```

---

## 🧪 Testing Patterns

### Test Button Creation
```typescript
let testBtn = ui.createButton(50, 50, 60, 20, "Test", 7)
// Verify sprite created at (50+30, 50+10) = (80, 60)
// Verify sprite visible
```

### Test Click Detection
```typescript
let testBtn = ui.createButton(50, 50, 60, 20, "Test", 7)
testBtn.onClicked(() => { clicked = true })
// Move cursor over button
// Press A button
// Verify clicked == true
```

### Test Hover Animation
```typescript
let testBtn = ui.createButton(50, 50, 60, 20, "Test", 7)
// Move cursor over button
// Check scale increases smoothly
// Leave button
// Check scale decreases smoothly
```

---

## 📊 Performance Considerations

### Memory Usage
- UIButton: ~500 bytes each
- Cursor: ~200 bytes
- Global arrays: ~100 bytes
- **Total for 20 buttons: ~10KB**

### CPU Usage
- Button update loop: O(n) where n = button count
- Collisions: O(n) per frame
- Cursor update: O(1) per frame
- **At 30 FPS with 20 buttons: <1% CPU**

### Optimization Tips
1. **Reuse sprites** - Don't create new Image objects frequently
2. **Batch operations** - Use `clearButtons()` instead of destroying one-by-one
3. **Lazy initialization** - Create buttons only when needed
4. **Cache results** - Store frequently accessed values

---

## 🐛 Debugging Tips

### Enable Debug Output
```typescript
// Add to main.ts
namespace ui {
    export let DEBUG = true;  // Add this
    
    // Use in functions:
    if (DEBUG) {
        console.log("Button created at", x, y);
    }
}
```

### Test Cursor Position
```typescript
game.onUpdate(() => {
    screen.printString(ui.getCursorX() + "," + ui.getCursorY(), 0, 0);
})
```

### Visual Debugging
```typescript
// Draw button bounds
game.onUpdate(() => {
    ui.getButtons().forEach(btn => {
        screen.rect(btn._x, btn._y, btn._width, btn._height, 2);
    });
})
```

---

## 📚 API Design Principles

1. **Simplicity First**
   - 3-line button not 10-line
   - Sensible defaults
   - Hide complexity

2. **Block-Friendly**
   - No complex syntax
   - Clear parameter names
   - Intuitive ordering

3. **Chainable Where Possible**
   - Event handlers return void (allow chaining)
   - But keep simple

4. **Orthogonal Functions**
   - No overlap
   - Each function does one thing
   - Easy to combine

5. **Discoverable**
   - JSDoc comments
   - Parameter hints
   - Clear names

---

## 🔐 Error Handling

### Current Approach
```typescript
// Graceful degradation
if (!sprite) {
    return;  // Exit silently
}

if (!cursorSprite) {
    cursorVisible = false;  // Safe state
}
```

### Potential Improvements
```typescript
// Could add validation:
function createButton(...): UIButton | null {
    if (width < 1 || height < 1) {
        console.log("Button size too small");
        return null;
    }
}
```

---

## 📦 Dependency Management

### Current Dependencies
- `sprites.BaseSprite` - For sprite creation
- `game.onUpdate` - For update loop
- `controller` - For input
- `SpriteFlag` - For sprite properties

### No External Dependencies
- ✅ Self-contained
- ✅ Only uses MakeCode core
- ✅ No version conflicts
- ✅ Easy to maintain

---

## 🚀 Release Checklist

Before releasing new version:
- [ ] All tests passing
- [ ] No compilation errors
- [ ] Documentation updated
- [ ] Examples tested
- [ ] Version number bumped
- [ ] CHANGELOG updated
- [ ] Type definitions current
- [ ] Performance verified

---

## 📈 Scalability

### Current Limits
- Buttons: ~20+ before performance degrades
- Sprite size: Up to 256x256 pixels
- Screen resolution: 160x120 (MakeCode standard)

### Potential Bottlenecks
1. **Too many buttons** - Collision detection O(n)
   - Solution: Use UI groups or layers

2. **Large sprites** - Memory usage
   - Solution: Sprite pooling, recycling

3. **Complex animations** - CPU usage
   - Solution: Optimize animation math

---

## 🔗 Integration Points

### With Game Module
- Uses `game.onUpdate()` for update loop
- Can use `game.splash()` for feedback
- Integrates with game lifecycle

### With Sprite Module
- Uses `sprites.create()` for sprite creation
- Uses `SpriteFlag` for visibility
- Uses `.setImage()` for sprite swapping

### With Controller Module
- Uses `controller.dx()` for cursor movement  
- Uses `controller.dy()` for cursor movement
- Uses `controller.A.onEvent()` for clicks

---

## 📋 Maintenance Guidelines

### Code Style
- Use camelCase for variables/functions
- Use UPPER_CASE for constants
- Clear comments for complex logic
- JSDoc for all public functions

### Documentation
- Keep README.md current
- Update API reference if functions change
- Add examples for new features
- Document breaking changes

### Version Management
- Semantic versioning (MAJOR.MINOR.PATCH)
- Update pxt.json on changes
- Tag releases in git

---

## 🎓 Learning Resources

For developers extending this:
- [MakeCode Arcade Reference](https://arcade.makecode.com/reference)
- [Sprites Documentation](https://arcade.makecode.com/reference/sprites)
- [Controller Documentation](https://arcade.makecode.com/reference/controller)

---

## 💡 Future Architecture

### Potential Improvements
1. **Event System Enhancement**
   - Use proper event emitter pattern
   - Event bubbling/capturing
   - Event delegation

2. **Component System**
   - Base UI Component class
   - Reusable mixins
   - Composition over inheritance

3. **State Management**
   - Centralized state store
   - Action/reducer pattern
   - Time travel debugging

4. **Performance**
   - Virtual rendering for many buttons
   - Event pooling
   - Batch updates

---

**Happy Hacking! 🚀**

*For questions about extension, see main.ts with JSDoc comments*
