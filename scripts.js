class Clapper {
    constructor() {
        this.clapCircle = document.getElementById('clap-circle')
        this.hands = document.getElementById('hands')
        this.totalClaps = document.getElementById('total-claps')
        this.clapCount = document.getElementById('clap-count')

        this.totalClapCount = 0
        this.tempClapCount = 0
        this.isClapping = false
        this.lastClap = Date.now()

        this.clap = this.clap.bind(this)
        this.removeClapAnimations = this.removeClapAnimations.bind(this)
        this.setClapAnimations = this.setClapAnimations.bind(this)
        this.setHandsClapped = this.setHandsClapped.bind(this)
        this.setClapCounts = this.setClapCounts.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.startClaps = this.startClaps.bind(this)
        this.stopClaps = this.stopClaps.bind(this)
        this.init = this.init.bind(this)
    }

    clap() {
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
    
    handleClick(e) {
        console.log('handle click');
        this.clap()
        this.setClapCounts()
        if (this.totalClapCount == 1) this.setHandsClapped()
    }

    startClaps() {
        console.log('start claps');
        clearTimeout(this.stopAnimationTimeout)
        this.handleClick()
        this.setClapAnimations()
        this.stopAnimationTimeout = setTimeout(this.stopClaps,500)
    }

    stopClaps() {
        console.log('stop');
        this.lastClick = Date.now()
        this.clapCount.classList.remove('circle-pulse-clap')
        this.tempClapCount = 0
        this.removeClapAnimations()
    }

    init() {
        this.clapCircle.addEventListener("mousedown", this.startClaps)
        // this.clapCircle.addEventListener("mouseup", this.stopClaps)               
    }
}



const myClapper = new Clapper()

myClapper.init()
