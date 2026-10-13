const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/opponent.png",
    OPPONENT_PICTURE_DEAD = "assets/opponent_dead.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    GAME_OVER_PICTURE = "assets/game_over.png",
    YOU_WIN_PICTURE = "assets/you_win.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_LIVES = 3,
    PLAYER_PICTURE = "assets/player.png",
    PLAYER_PICTURE_DEAD = "assets/player_dead.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/shot2.png",
    SHOT_WIDTH = 1.5,
    BOSS_PICTURE = "assets/boss.png",
    BOSS_PICTURE_DEAD = "assets/boss_dead.png",
    BOSS_SPEED = OPPONENT_SPEED * 2; // The final boss moves twice as fast as the triangle

function getRandomNumber (range) {
    return Math.floor(Math.random() * range);
}

function collision (div1, div2) {
    const a = div1.getBoundingClientRect(),
        b = div2.getBoundingClientRect();
    return !(a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);

}
/**
 * Wires the background selector. The choice is remembered, so it survives NEW GAME (which reloads the page)
 */
function setupBackgroundSelector () {
    const select = document.getElementById("background");
    let saved = null;

    try {
        saved = localStorage.getItem("shooterBackground");
    } catch (e) {
        // Storage can be blocked (e.g. private mode): the selector still works, it just forgets
    }
    if (saved && [...select.options].some((option) => option.value === saved)) {
        select.value = saved;
    }
    const apply = () => {
        document.documentElement.dataset.background = select.value;
    };

    apply();
    select.addEventListener("change", () => {
        apply();
        try {
            localStorage.setItem("shooterBackground", select.value);
        } catch (e) {
            // See above
        }
    });
}

var game;
document.addEventListener("DOMContentLoaded", () => {
        setupBackgroundSelector();
        game = new Game();
        game.start();
    }
);