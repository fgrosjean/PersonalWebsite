const fps = 30
const canvasDimension = 1080

const subdivisions = [4, 8, 16, 32, 64, 128, 258, 516]
let subdivisionHeight = 0


function setup() {
	const myCanvas = createCanvas(canvasDimension, canvasDimension)
	myCanvas.parent('sketch')
	
	subdivisionHeight = height / subdivisions.length
	
	frameRate(fps)
	noLoop()
	background(255)
	
	fill(0)
	noStroke()
	shuffle(subdivisions, true)
}


function draw() {
	translate(width / 2, height / 2)
	rotate(radians(random([0, 90])))
	translate(-(width / 2), -(height / 2))
	
	drawHorizonalLines()
	subdivisions.forEach((item, i) => { drawSubdivision(i, item) })
	drawWhitePoints()
	drawSmallPoints()
}

function drawSmallPoints() {
	const circleSize = 6
	
	push()
	translate(random(0, width), 0)
	for (let i = 0; i < height; i += 50) {
		for (let j = 0; j < 6; j++) {
			ellipse(j * 50, i, circleSize, circleSize)
		}
	}
	pop()
}


function drawWhitePoints() {
	const circleSize = 8
	const translationSize = random([0, width/4, width/2, width/4*3])
	let iterationNumber = 0
	
	push()
	translate(translationSize, 0)
	for (let j = 0; j < width / 3; j += circleSize) {
		for (let i = 0; i < height; i += circleSize * 2) {
			fill(255, 100)
			ellipse(j, iterationNumber % 2 == 0 ? i : i + circleSize, circleSize, circleSize)
		}
		iterationNumber += 1
	}
	pop()
}


function drawHorizonalLines() {
	const lineHeight = 8
	const cuadrantOffsetWidth = random([width/2, -(width/2)])
	const cuadrantOffsetHeight = random([height/2, -(height/2)])
	
	push()
	translate(cuadrantOffsetWidth, cuadrantOffsetHeight)
	for (let i = 0; i < height; i += lineHeight * 2) {
		fill(0, 100)
		rect(0, i, width, lineHeight)
	}
	pop()
}


function drawSubdivision(index, baseWidth) {
	const usedSpaceOfLinesAndGaps = Math.ceil(width/baseWidth) * baseWidth
	const excessSpace = (width - usedSpaceOfLinesAndGaps)
	
	push()
	translate(random(excessSpace, 0), 0)
	
	for (let i = 0; i <= width; i += baseWidth * 2) {
		rect(
			i, 
			index * subdivisionHeight, 
			baseWidth, 
			subdivisionHeight)
		} 
		pop()
}