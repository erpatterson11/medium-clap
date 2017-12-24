class Clapper {
    constructor() {
        this.clapCircle = document.getElementById('clap-circle')
        this.hands = document.getElementById('hands')
        this.totalClaps = document.getElementById('total-claps')
        this.clapCount = document.getElementById('clap-count')

        this.totalClapCount = 0
        this.tempClapCount = 0
        this.mouseDown = false
        this.lastClap = Date.now()

        this.increaseClapCounts = this.increaseClapCounts.bind(this)
        this.initializeClapAnimations = this.initializeClapAnimations.bind(this)
        this.setHandStyleFilled = this.setHandStyleFilled.bind(this)
        this.setClapCountText = this.setClapCountText.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.init = this.init.bind(this)
        this.handleClapInterval = this.handleClapInterval.bind(this)
        this.handleIntervalClear = this.handleIntervalClear.bind(this)
    }

    increaseClapCounts() {
        if (this.tempClapCount < 50) {

            this.totalClapCount++
            this.tempClapCount++
        }
    }
    
    setHandStyleFilled() {
        this.hands.style.fill = "#429835"
        this.hands.style.stroke = 'none'
        this.hands.style.animation = 'none'      
    }
    
    setClapCountText() {
        this.totalClaps.textContent = this.totalClapCount
        this.clapCount.textContent = '+' + this.tempClapCount  
    }
    
    handleMouseDown() {
        this.mouseDown = true
        this.handleClapInterval()
        if (this.clapInterval) clearInterval(this.clapInterval)
        this.clapInterval = setInterval(this.handleClapInterval,200)
    }

    handleClapInterval() {
        if(!this.mouseDown) {
            clearInterval(this.clapInterval)
            if (this.clapTimeout) clearTimeout(this.clapTimeout)
            this.clapTimeout = setTimeout(this.handleIntervalClear, 500) 
        } 
        else {
            this.increaseClapCounts()
            this.setClapCountText()
            if (this.totalClapCount > 0) this.setHandStyleFilled()    
            this.initializeClapAnimations()
        }
    }

    initializeClapAnimations() {
        this.clapCount.classList.remove('hidden', 'circle-pulse-clap')
        if (!this.tempClapCount) this.clapCount.classList.add('clap-count-enter')
        setTimeout(() => {                    
            this.clapCount.classList.add('circle-pulse-clap')
        }, 100)
    }
    
    handleIntervalClear() {
        this.clapCount.classList.remove('circle-pulse-clap', 'clap-count-enter')
        clearInterval(this.clapInterval)           
        this.clapCount.classList.add('clap-count-exit')
        setTimeout(() => {     
            this.clapCount.classList.remove('clap-count-exit')
            this.clapCount.classList.add('hidden')
            this.tempClapCount = 0        
            this.clapCount.textContent = 0
        }, 100)               
    }
    

    handleMouseUp() {
        this.mouseDown = false
    }

    init() {
        this.clapCircle.addEventListener("mousedown", this.handleMouseDown)
        this.clapCircle.addEventListener("mouseup", this.handleMouseUp)               
    }
}


const myClapper = new Clapper()

myClapper.init()
