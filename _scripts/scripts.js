// -------------------------------------------------------------
// SEGMENTED CONTROL
// -------------------------------------------------------------
let segmentedOptions;

function configureSegmentedControler() {
	const list = document.querySelector('#segmented-controler ul')
	const items = list.getElementsByTagName("li")
	segmentedOptions = Array.prototype.slice.call(items)
	segmentedOptions.forEach(function(el) { el.addEventListener('click', onSegmentedControlClicked) })
}

function onSegmentedControlClicked(clickedElement) {
	const selector = document.getElementById('segmented-selector')
	const buttonTXT = clickedElement.target.innerText
	
	segmentedOptions.forEach(function(el) { el.classList.remove("active") })
	clickedElement.target.classList.add("active")
	
	const grid = document.getElementsByClassName('grid')[0]
	let filterItems;
	
	switch(buttonTXT) {
		case "all": 
			selector.style.left = "3px" 
			filterItems = "*"
			break
		case "work": 
			selector.style.left = "20.5%"
			filterItems = ".work"
			break
		case "projects": 
			selector.style.left = "40.6%" 
			filterItems = ".projects"
			break
		case "writings": 
			selector.style.left = "60.7%"
			filterItems = ".writings"
			break
		case "talks": 
			selector.style.left = "80.7%" 
			filterItems = ".talks"
			break
		default: console.log("button not set")
	}
	
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	isotope.arrange({ filter: filterItems })
}



// -------------------------------------------------------------
// GRID
// -------------------------------------------------------------
const isotope = new Isotope('.grid', {
	layoutMode: 'packery',
	packery: { columnWidth: '.grid-sizer' },
	itemSelector: '.grid-item',
	percentPosition: true
})



// -------------------------------------------------------------
// ABOUT
// -------------------------------------------------------------
const content = document.getElementById('scrollSpacer')
const headerHeight = document.getElementsByTagName('header')[0].clientHeight
const contentScrollWatcher = scrollMonitor.create(content)
const overlay = document.getElementById('overlay')

function mapTwoValues(n, start1, stop1, start2, stop2) {
	return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

function fadeAboutOverlay() {
	const scrolled = scrollMonitor.viewportBottom - Math.ceil(contentScrollWatcher.bottom) + 1
	const scrolledValue = mapTwoValues(scrolled, 0, scrollMonitor.viewportHeight, 1, 0) - 0.28
	
	if (scrolled >= 0) {
		overlay.style.backgroundColor = "rgba(0,0,0," + scrolledValue + ")"
	}
}


// -------------------------------------------------------------
// 3D ICON
// -------------------------------------------------------------
function constraitHeight3DIcon() {
	const icon = document.getElementById('icon')
	const iconWidth = icon.offsetWidth
	icon.style.height = iconWidth + "px"
}

let isSpinning = true;

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  resize: true,
  // stop spinning when drag starts
  onDragStart: function() {
	isSpinning = false;
  },
});

// circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  translate: { z: 40 },
  stroke: 20,
  color: '#636',
});

// square
new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 80,
  translate: { z: -40 },
  stroke: 12,
  color: '#E62',
  fill: true,
});

function animate() {
  illo.rotate.y += isSpinning ? 0.03 : 0;
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}
animate();



// -------------------------------------------------------------
// EVENTS
// -------------------------------------------------------------
window.onload = function() {
	configureSegmentedControler()
	constraitHeight3DIcon()
}

window.addEventListener('scroll', function () { 
	fadeAboutOverlay()	
})

window.addEventListener('resize', function () { 
	constraitHeight3DIcon()	
})