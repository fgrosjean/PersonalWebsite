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

const subdivisions = 8
const subdivisionHeight = canvasDimension / subdivisions

function setup() {
	const myCanvas = createCanvas(canvasDimension, canvasDimension)
	myCanvas.parent('sketch')
	
	frameRate(fps)
	noLoop()
	background(255)
	
	noStroke()
}

function draw() {
	drawHorizontalLines()
	drawParallaxLines()
	
	
}

function drawHorizontalLines() {
	const numberOfVerticalLines = (height / 5) /2
	
	push()
	translate(-width / 3 + 78, -height / 3 - 50)
	for (let j = 0; j < numberOfVerticalLines; j++) {
		fill(0, 255 / 3)
		
		rect(
			0, // x
			height - 5 * (j + j), // y
			width, // width
			6 // height
		)
	}
	pop()
}

function drawParallaxLines() {
	for (let i = subdivisions + 1; i > 1; i--) {
		fill(0)
		const widths = [4, 8, 16, 32, 64, 128, 258, 516]
		const lineWidth = widths[i - 2]
		const numberOfLinesOnLevel = (width / lineWidth) / 2
		const numberOfLinesOnLevelWithGaps = Math.ceil(numberOfLinesOnLevel) * 2 - 1
		const translationForCentering = (width - numberOfLinesOnLevelWithGaps * lineWidth) / 2
		
		for (let j = 0; j < numberOfLinesOnLevel; j++) {
			push()
			translate(translationForCentering, 0)
			rect(
				lineWidth * (j + j), // x
				height - subdivisionHeight * (i - 1), // y
				lineWidth, // width
				subdivisionHeight // height
			)
			pop()
		}
		
	}
}