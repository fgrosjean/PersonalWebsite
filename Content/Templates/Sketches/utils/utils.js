let capturer, canvas

window.onload = function() {
	capturer = new CCapture( { 
		format: 'webm', 
		timeLimit: secondsOfRecording,
		framerate: fps 
	});
	
    canvas = [...document.getElementsByTagName('canvas')][0]
	
	if (autoStartRecording) {
		render()
		capturer.start() 
	}
}

function render(){
	requestAnimationFrame(render);
	capturer.capture( canvas );
}

function keyPressed() {
	if (key === "s") { 
		render()
		capturer.start() 
	}
	if (key === "e") { 
		capturer.stop()
		capturer.save() 
	}
	
	// Save PNG of canvas on pressing ENTER
	if (keyCode === ENTER) { saveCanvas() }
}

