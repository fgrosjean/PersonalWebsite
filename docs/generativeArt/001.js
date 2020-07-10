const fps = 30
const canvasDimension = 1080

const gridSize = 10
const gridGap = 2
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
	background(255)
	
	for (let i = 1; i <= gridSize; i++) {
		for (let j = 1; j <= gridSize; j++) {
			const posX = ((gridModuleSize + gridGap) * i) - gridGap
			const posY = ((gridModuleSize + gridGap) * j) - gridGap
			squareModule(posX, posY, gridModuleSize, -((i * j) * 0.3), i * j)
		}
	}
}


function squareModule(x, y, squareSize, delay, index) {
	var squareColor = colors[selectedColor]
	squareColor = lightendedColor(squareColor, index)
	
	fill(squareColor)
	rect(x, y, squareSize, squareSize, borderRadius)
	fill(255)
	
	const currentTime = timeLoop(120, delay)
	const percentageCompleted = map(currentTime, 0, 1, 0, 100).toFixed(0)
	
	switch (true) {
		case percentageCompleted <= 20: // 0 - 20
		for (let i = 1; i <= 3; i++) {
			blendMode(ADD)
			fill(255, 0.30)
			const sizeIntro = mapWithEase(percentageCompleted, 0, 5 + (5 * i), 1, squareSize, true, false)
			rect(x, y, sizeIntro, sizeIntro, borderRadius)
			blendMode(BLEND)
		}
		break
		
		case percentageCompleted <= 40: // 20 - 40
		for (let i = 1; i <= 3; i++) {
			blendMode(ADD)
			rectMode(CORNERS)
			fill(255, 0.30)
			const sizeOutro = mapWithEase(percentageCompleted, 25 - (5 * i), 40, 1, squareSize, true, true)
			rect(x + sizeOutro, y + sizeOutro, x + squareSize , y + squareSize, borderRadius)
			rectMode(CORNER)
			blendMode(BLEND)
		}
		
		if (index == 1 &&  percentageCompleted == 35) {
			selectedColor = selectedColor > 4 ? 0 : selectedColor + 1
		}
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

function mapWithEase(value, start1, stop1, start2, stop2, withinBounds = false, isNotIn) {
	let b = start2
	let c = stop2 - start2
	let t = value - start1
	let d = stop1 - start1
	let p = 0.5
	
	let newval = 0
	if (isNotIn) {
		newval = c * pow( 2, 10 * (t/d - 1) ) + b;
	} else {
		newval = c * ( -pow( 2, -10 * t/d ) + 1 ) + b;
	}
	
	
	if (!withinBounds) { return newval }
	if (start2 < stop2) {
		return constrain(newval, start2, stop2)
	} else {
		return constrain(newval, stop2, start2)
	}
}