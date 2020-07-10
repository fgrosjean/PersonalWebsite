// -------------------------------------------
// MARK: - CONFIG
// -------------------------------------------
const autoStartRecording = false
const secondsOfRecording = 3 // 0 = auto
// PRESS "ENTER" FOR SAVING PNG
// PRESS "S" FOR START RECORDING
// PRESS "E" FOR END RECORDING
// -------------------------------------------


const fps = 30
const canvasDimension = 1080


function setup() {
    const myCanvas = createCanvas(704, 200)
    myCanvas.parent('sketch')
    frameRate(fps)
    noStroke()
    // noLoop()
}

function draw() {
    background(0)
    blendMode(ADD)
    // rect(frameCount * 20 % width, 30, 30, 30)
    // rect(timeLoop(30, 0) * width, 30, 30, 30)
    // rect(timeLoop(60, 20) * width, 60, 30, 30)
    // rect(timeLoop(60, 40) * width, 90, 30, 30)
    let barHeight = 0
    
    // let barHeight = 0
    for (let i = 0; i < 1; i += 1 / 16) {
        fill("#ff0000")
        barHeight = inOutSin(tri(timeLoop(60, i * 60))) * 100
        rect(36 + i * 640, 150 - barHeight, 32, barHeight)
        fill("#00ff00")
        barHeight = inOutSin(tri(timeLoop(60, i * 60 + 20))) * 100
        rect(36 + i * 640, 150 - barHeight, 32, barHeight)
        fill("#0000ff")
        barHeight = inOutSin(tri(timeLoop(60, i * 60 + 40))) * 100
        rect(36 + i * 640, 150 - barHeight, 32, barHeight)
    }
    blendMode(NORMAL)
}

function timeLoop(totalFrames, offset) {
    return (frameCount + offset) % totalFrames / totalFrames
}

function tri(t) {
    return t < 0.5 ? t * 2 : 2 - (t * 2)
}

function inOutSin(t) {
    return 0.5 - cos(PI * t) / 2
}