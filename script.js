let score = 0;
let timer2Interval = null;
let timer1Interval = null;
let timer2Value = 0;
let gameRunning = false;

function disableButtons(state) {
    document.querySelectorAll(".orange-btn").forEach(btn => {
        btn.disabled = state;
        btn.style.opacity = state ? "0.4" : "1";
    });
}

async function handleButtonClick() {
    score += 1;
    document.getElementById("score").textContent = score;
}

document.querySelectorAll(".orange-btn").forEach(btn => {
    btn.addEventListener("click", async () => await handleButtonClick());
    btn.addEventListener("touchstart", async () => await handleButtonClick());
});

disableButtons(true);

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    if (gameRunning) {
        clearInterval(timer1Interval);
        clearInterval(timer2Interval);

        score = 0;
        timer2Value = 0;

        document.getElementById("score").textContent = 0;
        document.getElementById("timer2").textContent = 30;
        document.getElementById("timer1").textContent = "";

        disableButtons(true);

        gameRunning = false;
        startBtn.textContent = "START";
        return;
    }

    score = 0;
    timer2Value = 30;
    document.getElementById("score").textContent = 0;
    document.getElementById("timer2").textContent = 30;
    document.getElementById("timer1").textContent = "";

    disableButtons(true);

    startBtn.disabled = true;

    let t1 = 3;
    document.getElementById("timer1").textContent = t1;

    timer1Interval = setInterval(() => {
        t1--;
        document.getElementById("timer1").textContent = t1;

        if (t1 <= 0) {
            clearInterval(timer1Interval);
            document.getElementById("timer1").textContent = "";

            disableButtons(false);

            startTimer2();

            gameRunning = true;
            startBtn.textContent = "STOP";

            startBtn.disabled = false;
        }
    }, 1000);
});

function startTimer2() {
    timer2Interval = setInterval(() => {
        timer2Value--;
        document.getElementById("timer2").textContent = timer2Value;

        if (timer2Value === 0) {
            clearInterval(timer2Interval);
            disableButtons(true);
        }
    }, 1000);
}