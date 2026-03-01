# 🎮 UI Extension - Simple Usage

Your UI extension is now **super simple** - like sprites!

## 🎯 Just 3 Steps

### 1️⃣ Show a Cursor
```blocks
ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)
```
The cursor follows your D-pad!

### 2️⃣ Create a Button
```blocks
let myBtn = ui.createButton(80, 60, img`
    2 2 2 2 2 2 2 2
    2 f f f f f f 2
    2 f f f f f f 2
    2 2 2 2 2 2 2 2
`)
```

### 3️⃣ Make It Do Something
```blocks
ui.onButtonClick(myBtn, () => {
    game.splash("Clicked!")
})
```

---

## 🔄 That's It!

When the cursor is over the button and you press **A**, it runs!

---

## 📌 Example Program

```blocks
// Show cursor
let cursor = ui.showCursor(img`
    . 1 .
    1 1 1
    . 1 .
`)

// Create button
let playBtn = ui.createButton(80, 60, img`
    6 6 6 d d d d d 6 6 6
    6 f f d d d d d f f 6
    6 f f d d d d d f f 6
    6 6 6 d d d d d 6 6 6
`)

// Handle click
ui.onButtonClick(playBtn, () => {
    game.splash("Game Started!")
})
```

---

## 🎨 Make Custom Button Images

Use the **"New Image"** in MakeCode to create your button images:
- Click "New Image"
- Draw your button
- Use it in `ui.createButton()`

---

**That's all you need!** 🚀
