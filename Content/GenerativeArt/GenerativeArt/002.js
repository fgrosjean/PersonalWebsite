const fps = 30
const canvasDimension = 1080

const colors = [
	"#298B08",
	"#FF0000",
	"#1A007C"
]
let currentColor = 0


function setup() {
	const myCanvas = createCanvas(canvasDimension, canvasDimension)
	myCanvas.parent('sketch')
	frameRate(fps)
	
	strokeWeight(4)
	noFill()
	background(0)
	blendMode(SCREEN)
	angleMode(DEGREES)
	ellipseMode(CENTER)
}


function draw() {
	if (frameCount < 200) {
		stroke(colors[currentColor])
		currentColor = currentColor < 2 ? currentColor + 1 : 0
		
		translate(0, height / 2)
		rotate(-180)
		rotate(random(-28, 28))
		ellipse(
			-width/2, 
			0, 
			random(width, width * 2 - width / 3),
			random(200, 300)
		)
	} else {
		noLoop()
	}
}