const id = document.getElementsByTagName('body')[0].id

switch (id) {
    case "writings": 
        populateNumbers()
        break
        
    case "generativeArt":
        numberOfColumns() 
        setBigImages()
        setupGrid()
        window.addEventListener('resize', function () { 
            numberOfColumns()
            setupGrid()
        })
        break
        
    case "about":
        document.getElementById('ES-button').addEventListener("click", languageButtonClicked)
        document.getElementById('EN-button').addEventListener("click", languageButtonClicked)
        
        // set link to target _blank
        var links = document.getElementById('about-container').getElementsByTagName('a');
        for (var i = 0, linksLength = links.length; i < linksLength; i++) {
           if (links[i].hostname != window.location.hostname) {
               links[i].target = '_blank';
               links[i].rel = 'noreferrer'
           }
        }
        break
    
    default:
        break
}

populateFooterLines()


function populateFooterLines() {
    const footer = document.getElementsByTagName('footer')
    
    for (let i = 0; i < 50; i++) {
        const line = document.createElement('div')
        line.classList.add("footer-line")
        footer[0].appendChild(line)
    }
}


function populateNumbers() {
    let numbers = Array.from(document.getElementsByClassName('post-number')).reverse()
    numbers.forEach(function(item, index) {
        item.innerText = index < 9 ? `0${index + 1}` : index + 1
    })
}


function numberOfColumns() {
    const margin = parseInt(getComputedStyle(document.body).getPropertyValue('--main-margin-width'), 10)
    const container = document.getElementById('gen-art-container')
    const containerWidth = document.body.offsetWidth - (margin * 2)
    const numberOfColumns = Math.floor(containerWidth / 200)
    
    const gridComputedStyle = window.getComputedStyle(container);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    if (numberOfColumns > 2) {
        if (numberOfColumns > 5) {
            
        } else if (numberOfColumns % 2 == 0) {
            container.style.paddingLeft = "100px"
            container.style.paddingRight = "100px"
        } else {
            container.style.paddingLeft = "0px"
            container.style.paddingRight = "0px"
        }
    } else {
        container.style.paddingLeft = "0px"
        container.style.paddingRight = "0px"
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function setBigImages() {
    const numberOfImages = document.getElementsByClassName('module')
    const numberOfIterations = Math.floor(Array.from(numberOfImages).length / 4)
    
    for (let i=0; i < numberOfIterations; i++) {
        const min = i * 4
        const max = ((((i + 1) * 4)) - 1)
        const selectedRandomImage = numberOfImages[getRandomInt(min, max)]
        selectedRandomImage.className = "module big-image"
    }
    
    Array.from(numberOfImages).forEach(function(item) { item.getElementsByTagName('img')[0].style.display = "block" })
}


function setupGrid() {
    const margin = parseInt(getComputedStyle(document.body).getPropertyValue('--main-margin-width'), 10)
    const container = document.getElementById('gen-art-container')
    
    const gridComputedStyle = window.getComputedStyle(container);
    const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    const lines = document.getElementsByClassName('grid-separator')
    Array.from(lines).forEach(function(item) { item.remove() })
    
    for (let i = 1; i <= gridRowCount + 1; i++) {
        const line = document.createElement('li')
        line.className = "horizontal-grid-separator grid-separator"
        line.style.gridRowStart = i
        container.appendChild(line)
    }
    
    for (let i = 0; i < gridColumnCount + 1; i++) {
        const line = document.createElement('li')
        line.className = "vertical-grid-separator grid-separator"
        line.style.gridColumnStart = i + 1
        container.appendChild(line)
    }
}


function languageButtonClicked(event) {
    const englishTextContainer = document.getElementById('about-text-english')
    const spanishTextContainer = document.getElementById('about-text-spanish')
    const helloText = document.getElementById('hello-text')
    const holaText = document.getElementById('hola-text')
    const title = document.getElementsByTagName('h2')[0]
    
    const langSwitcher = document.getElementById('switcher-inner-container').getElementsByTagName('ul')[0].getElementsByTagName('li')
    const langButton = langSwitcher
    const englishButton = langButton[1]
    const espanishButton = langButton[0]
        
    const languageClicked = event.target.innerText
    
    englishTextContainer.style.display = languageClicked == "ES" ? "none" : "block"
    spanishTextContainer.style.display = languageClicked == "ES" ? "block" : "none"
    englishTextContainer.style.visibility = languageClicked == "ES" ? "hidden" : "visible"
    spanishTextContainer.style.visibility = languageClicked == "ES" ? "visible" : "hidden"
    helloText.style.visibility = languageClicked == "ES" ? "hidden" : "visible"
    holaText.style.visibility = languageClicked == "ES" ? "visible" : "hidden"
 
    
    englishButton.classList = languageClicked == "ES" ? "" : "active-language"
    espanishButton.classList = languageClicked == "ES" ?  "active-language" : ""
    title.innerText = languageClicked == "ES" ? "Acerca" : "About"    
}
