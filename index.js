// Define variables & constants

let homeScore = document.getElementById("home-score")
let guestScore = document.getElementById("guest-score")
let homeFouls = document.getElementById("home-fouls")
let guestFouls = document.getElementById("guest-fouls")
let homeScoreNum = 0
let guestScoreNum = 0
let homeFoulNum = 0
let guestFoulNum = 0

homeScore.textContent = homeScoreNum
guestScore.textContent = guestScoreNum
homeFouls.textContent = homeFoulNum
guestFouls.textContent = guestFoulNum

const homeAnim = document.querySelector("#home-score")
const guestAnim = document.querySelector("#guest-score")

// Period Timer

var countUp = 0
var interval = 1000 // 1000ms counting interval

let limit = 720 // replace with for loop sequence of periods, using vars above

function timeConv(time) {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60 // Remainder from division by 60
        function strPadLeft(digits, pad, length) {
            return (new Array(length + 1).join(pad) + digits).slice(-length)
            // Pads time value to 2dp using string digit '0'
        }
        return (strPadLeft(minutes, '0', 2) + ":" + strPadLeft(seconds, '0', 2))
    }

var timerOutput = function() { // What happens between counts
    message = "Timer: " + countUp
    console.log(message)

    let timeLeft = limit - countUp
    let timeLeftPretty = timeConv(timeLeft)
    perTimeVal = timeLeftPretty
    perTime.textContent = perTimeVal
}
var timerError = function() {
    message = drift + " > " + timerObject.interval + ", compensating"
    console.log(message)
}
var ticker = new periodTimer(timerOutput, interval, timerError, limit)

function periodTimer(timerOutput, interval, timerError, limit) {
    var timerObject = this
    var expected, timeout
    this.interval = interval

    this.start = function() {
        expected = Date.now() + this.interval
        timeout = setTimeout(step, this.interval)
    }

    this.stop = function() {
        clearTimeout(timeout)
    }

    function step() {
        var drift = Date.now() - expected
        if (drift > timerObject.interval) {
            timerError()
        }
        countUp += 1
        timerOutput()
        expected += timerObject.interval
        timeout = setTimeout(step, Math.max(0, timerObject.interval-drift))
        if (countUp >= limit) {
            timerReset()
            }
    }
}

function timerStart() {
    console.log("Timer Started")
    perTimeVal = timeConv(limit)
    perTime.textContent = perTimeVal
    ticker.start()
}

function timerStop() {
    console.log("Timer stopped")
    ticker.stop()
}

function timerReset() {
    console.log("Timer reset")
    ticker.stop()
    countUp = 0
    let perTimeVal = timeConv(countUp)
    perTime.textContent = perTimeVal
}

let perTime = document.getElementById("per-timer")
let perNum = document.getElementById("per-counter")
let perDesc = document.getElementById("per-desc")
let perTimeVal = timeConv(countUp)
let perNumVal = 1
let perDescText = "NBA Game Period Timer"

perTime.textContent = perTimeVal
perNum.textContent = perNumVal
perDesc.textContent = perDescText

// Functions

function scoreAdd(team,inc) {
    if (team === "home") {
        homeScoreNum += inc
        homeScore.textContent = homeScoreNum
    } else if (team === "guest") {
        guestScoreNum += inc
        guestScore.textContent = guestScoreNum
    }
    message = team + " team score raised by " + inc
    console.log(message)
    keepScore()
}

function scoreClear() {
    homeScoreNum = 0
    guestScoreNum = 0
    homeScore.textContent = homeScoreNum
    guestScore.textContent = guestScoreNum
    homeAnim.style.animationDuration = "0s"
    guestAnim.style.animationDuration = "0s"

    homeFoulNum = 0
    homeFouls.textContent = homeFoulNum
    guestFoulNum = 0
    guestFouls.textContent = guestFoulNum

    message = "scores reset " + homeScoreNum + ":" + guestScoreNum
    console.log(message)
    message = "fouls reset " + homeFoulNum + ":" + guestFoulNum
    console.log(message)
}

function keepScore() {
    let leader = ""
    if (homeScoreNum > guestScoreNum) {
        leader = "home"
        homeAnim.style.animationDuration = "1s"
        guestAnim.style.animationDuration = "0s"
    } else if (homeScoreNum < guestScoreNum) {
        leader = "guest"
        guestAnim.style.animationDuration = "1s"
        homeAnim.style.animationDuration = "0s"
    } else {
        leader = "no"
        homeAnim.style.animationDuration = "0s"
        guestAnim.style.animationDuration = "0s"
    }
    message = leader + " team is in the lead"
    console.log(message)
}

function foulAdd(team) {
    if (team === "home") {
        homeFoulNum += 1
        homeFouls.textContent = homeFoulNum
    } else if (team === "guest") {
        guestFoulNum += 1
        guestFouls.textContent = guestFoulNum
    }
}
