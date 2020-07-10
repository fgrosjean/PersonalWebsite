// -------------------------------------------
// MARK: - CONFIG
// -------------------------------------------
const autoStartRecording = false
const secondsOfRecording = 3 // 0 = auto
// PRESS "ENTER" FOR SAVING PNG
// PRESS "S" FOR START RECORDING
// PRESS "E" FOR END RECORDING
// -------------------------------------------


const fps = 60
const canvasDimension = 1080

const gridSize = 10
const gridGap = 4
const marginSize = (canvasDimension / (gridSize + 2)) - (gridGap * 2)
const workingArea = canvasDimension - (marginSize * 2)
const gridModuleSize = (workingArea - (gridGap * (gridSize + 1.5))) / gridSize
const borderRadius = 10

const colors = [
	"hsl(200, 89%  , 42.9%)",
	"hsl(302, 38.9%, 37.8%)",
	"hsl(2  , 67.6%, 52.7%)",
	"hsl(24 , 87.3%, 53.5%)",
	"hsl(37 , 91%  , 56.5%)",
	"hsl(109, 44.3%, 45.1%)",
]
let selectedColor = 0


function setup() {
    const myCanvas = createCanvas(canvasDimension, canvasDimension)
    myCanvas.parent('sketch')
	
    frameRate(fps)
    noStroke()
	colorMode(HSL)
}


function draw() {
    background(0)
	
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            const posX = ((gridModuleSize + gridGap) * i) - gridGap
            const posY = ((gridModuleSize + gridGap) * j) - gridGap
			squareModule(posX, posY, gridModuleSize, -((i * j) * 0.2), i * j)
        }
    }
}


function squareModule(x, y, squareSize, delay, index) {
	var squareColor = colors[selectedColor]
	squareColor = lightendedColor(squareColor, index)
	
    fill(squareColor)
	rect(x, y, squareSize, squareSize, borderRadius)
	fill(255)
	
	const currentTime = timeLoop(60, delay)
	const size = map(timeLoop(20, delay), 0, 1, 0, squareSize)
	// mapWithEase(timeLoop(33.33333, delay), 0, 1, 0, squareSize)
	
	switch (true) {
		case currentTime < 0.333333:
			rect(x, y, size, size, borderRadius)
			break
		
		case currentTime > 0.666666:
			rect(x + size, y + size, x + squareSize, y + squareSize, borderRadius)
			if (index == 1 && size < 4) {
				selectedColor = selectedColor > 4 ? 0 : selectedColor + 1
			}
			break
			
		default:
			rect(x, y, squareSize, squareSize, borderRadius)
			break
	}
}

function timeLoop(frames, offset = 0) {	
	return (frameCount + offset) % frames / frames
}

function lightendedColor(color, index) {
	const currentLightness = lightness(color)
	const mappedLightness = map(index, 1, gridSize * gridSize, currentLightness, 90)
	return `hsl(${hue(color).toFixed(0)}, ${saturation(color)}%, ${mappedLightness}%)`
}

function mapWithEase(value, start1, stop1, start2, stop2) {
	let b = start2
	let c = stop2 - start2
	let t = value - start1
	let d = stop1 - start1
	let p = 0.5
	
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
}

function inOutSin(t) {
	return 0.5 - cos(PI * t) / 2
}