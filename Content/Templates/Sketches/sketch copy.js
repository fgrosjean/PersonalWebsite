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

const numberOfModules = 10
const marginDimension = 10
const moduleDimension = ((canvasDimension  - (marginDimension * (numberOfModules + 1))) / (numberOfModules + 2))


function setup() {
    const myCanvas = createCanvas(canvasDimension, canvasDimension)
    myCanvas.parent('sketch')
    frameRate(fps)
    
    noStroke()
}

function draw() {
    background(255)
    
    for (let i = 1; i <= numberOfModules; i++) {
        for (let j = 1; j <= numberOfModules; j++) {
            let posX = (moduleDimension + marginDimension) * i
            let posY = (moduleDimension + marginDimension) * j
            squareModule(posX, posY, moduleDimension, i)
        }
    }
}

function squareModule(x, y, backgroundSize, foregroundSize ) {
    push()
        translate(x, y)
        fill(0)
        square(0, 0, backgroundSize)
        fill(255)
        console.log(foregroundSize)
        square(0, 0, foregroundSize)
    pop()
}

