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
    const myCanvas = createCanvas(canvasDimension, canvasDimension)
    myCanvas.parent('sketch')
    frameRate(fps)
}

function draw() {

}