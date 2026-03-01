/**
 * Example usage of UI Expansion Extension
 * 
 * This file demonstrates how to use all features:
 * - Custom cursor
 * - Simple buttons
 * - Custom sprite buttons
 * - Event handling
 */

// ============ SETUP ============

// Create a custom cursor
let cursorImg = img`
    . 1 .
    1 1 1
    . 1 .
`
ui.showCursor(cursorImg)

// ============ CREATE BUTTONS ============

// Create a simple play button
let playButton = ui.createButton(40, 40, 80, 30, "► Play", 7)

// Create a settings button
let settingsButton = ui.createButton(40, 90, 80, 30, "⚙ Settings", 5)

// Create a quit button
let quitButton = ui.createButton(40, 140, 80, 30, "✕ Quit", 2)

// ============ PLAY BUTTON EVENTS ============

playButton.onClicked(() => {
    // Clear all menu buttons
    ui.clearButtons()
    
    // Start the game
    game.splash("Game Started!")
})

playButton.onHover(() => {
    // Visual feedback when hovering
    music.playTone(523, music.beat(BeatFraction.Half))
})

playButton.onHoverEnd(() => {
    // Animation ends
})

// ============ SETTINGS BUTTON EVENTS ============

settingsButton.onClicked(() => {
    game.splash("Settings Menu\n(Coming Soon)")
})

settingsButton.onHover(() => {
    // Animated feedback
})

// ============ QUIT BUTTON EVENTS ============

quitButton.onClicked(() => {
    ui.clearButtons()
    ui.hideCursor()
    game.gameOver(false)
})

// ============ CUSTOM BUTTON EXAMPLE ============

// You can also create custom buttons with sprites
let customNormal = img`
    1111111111111111
    1ffffff8888ffff1
    1fffffffffffff01
    1fffffffffffff01
    1fffffffffffff01
    1fffffffffffff01
    1fffffffffffff01
    1111111111111111
`

let customHover = img`
    1111111111111111
    1888888fffffff01
    1ffffffffffffff1
    1ffffffffffffff1
    1ffffffffffffff1
    1ffffffffffffff1
    1ffffffffffffff1
    1111111111111111
`

// (This would be created separately, example shown below)
// let customBtn = ui.createCustomButton(200, 40, customNormal, customHover, "Custom")

// ============ GAME LOOP ============

game.onUpdate(() => {
    // Your game logic goes here
    // The buttons will handle clicks automatically
})

// ============ ADVANCED: CREATING A MENU SYSTEM ============

/**
 * Example: Creating a reusable menu system
 */

function createMainMenu() {
    ui.clearButtons()
    
    let play = ui.createButton(80, 50, 100, 25, "Play Game", 7)
    let tutorial = ui.createButton(80, 90, 100, 25, "Tutorial", 4)
    let scores = ui.createButton(80, 130, 100, 25, "High Scores", 9)
    
    play.onClicked(() => {
        startGame()
    })
    
    tutorial.onClicked(() => {
        showTutorial()
    })
    
    scores.onClicked(() => {
        showScores()
    })
}

function startGame() {
    ui.clearButtons()
    // Start actual game
    game.splash("Playing...")
}

function showTutorial() {
    ui.clearButtons()
    game.splash("Tutorial\nClick to start game", () => {
        createMainMenu()
    })
}

function showScores() {
    ui.clearButtons()
    game.splash("High Scores\n1000 - Player\nClick to go back", () => {
        createMainMenu()
    })
}

// Uncomment to use menu system:
// createMainMenu()
