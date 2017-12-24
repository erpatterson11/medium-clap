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

        this.increaseClapCounter = this.increaseClapCounter.bind(this)
        this.removeClapAnimations = this.removeClapAnimations.bind(this)
        this.setClapAnimations = this.setClapAnimations.bind(this)
        this.setHandsClapped = this.setHandsClapped.bind(this)
        this.setClapCounts = this.setClapCounts.bind(this)
        this.startClaps = this.startClaps.bind(this)
        this.stopClaps = this.stopClaps.bind(this)
        this.init = this.init.bind(this)
        this.handleClapInterval = this.handleClapInterval.bind(this)
        this.handleIntervalClear = this.handleIntervalClear.bind(this)
    }

    increaseClapCounter() {
        this.totalClapCount++
        this.tempClapCount++
    }

    setHandsClapped() {
        this.hands.style.fill = "#429835"
        this.hands.style.stroke = 'none'
        this.hands.style.animation = 'none'      
    }

    setClapCounts() {
        this.totalClaps.textContent = this.totalClapCount
        this.clapCount.textContent = '+' + this.tempClapCount  
    }

    setClapAnimations() {
        this.clapCount.classList.remove('hidden', 'circle-pulse-clap')
        if (!this.tempClapCount) this.clapCount.classList.add('clap-count-enter')
        setTimeout(() => {                    
            this.clapCount.classList.add('circle-pulse-clap')
        }, 100)
    }

    removeClapAnimations() {
        this.clapCount.classList.remove('clap-count-enter')
        this.clapCount.classList.add('clap-count-exit')
        setTimeout(() => {                    
            this.clapCount.classList.remove('clap-count-exit')
            this.clapCount.classList.add('hidden')
            this.clapCount.textContent = 0
        }, 500)               
    }
    

    handleClapInterval() {
        console.log("handle clap interval, ", this.mouseDown)
        if(!this.mouseDown) {
            "clap interval cleared"
            clearInterval(this.clapInterval)
            this.handleIntervalClear()
        } else {
            this.increaseClapCounter()
            this.setClapCounts()
            if (this.totalClapCount == 1) this.setHandsClapped()    
            this.setClapAnimations()
        }
    }
    handleIntervalClear() {
        console.log("handle interval clear")
        this.clapCount.classList.remove('circle-pulse-clap')
        this.tempClapCount = 0
        this.removeClapAnimations()
    }

    startClaps() {
        this.mouseDown = true
        this.handleClapInterval()
        if (this.clapInterval) clearInterval(this.clapInterval)
        this.clapInterval = setInterval(this.handleClapInterval,500)
    }

    stopClaps() {
        console.log('mouseUp')
        this.mouseDown = false
    }

    init() {
        this.clapCircle.addEventListener("mousedown", this.startClaps)
        this.clapCircle.addEventListener("mouseup", this.stopClaps)               
    }
}



const myClapper = new Clapper()

myClapper.init()
