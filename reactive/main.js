interval()

const subBtn = document.getElementById("subscribe");
const unSubBtn = document.getElementById("unsubscribe");


class Observable {
    constructor(){
        this.observers = []
    }
    subscribe(func){
        this.observers.push(func)
        console.log(func)
    }

    unsubscribe(func){
        this.observers = this.observers.filter(observer => observer != func)
    }

    notify(data){
        this.observers.forEach(observer => observer(data))
    }
}

function handleClick(){
    observable.notify("Subscribed")
}

subBtn.addEventListener("click", observable.subscribe(logger))
unSubBtn.addEventListener("click", observable.unsubscribe())


function interval(data) { //Publisher
    let timer = 1
    setInterval(
        () => {
            saveCToSessionStorage(timer)
            discoverPowerBallNumber(timer)
            timer++
        }, 2000)
}

function logger(data){
    console.log(data)
}

function saveCToSessionStorage(data) { //Sub
    console.log('[reader C]', data)
    const storageData = { data }
    sessionStorage.setItem('C', JSON.stringify(storageData))
    Logger.log(data)
}

function discoverPowerBallNumber(data) { //Sub
    const number = Math.floor(Math.random() * data * 100)
    console.log('[powerball number]', data)
}