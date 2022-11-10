

class Observable {
    constructor(){
        this.observers = []
        let timer = 1
    }
    subscribe(func){
        this.observers.push(func)
        console.log(func)
    }

    unsubscribe(func){
        this.observers = this.observers.filter(observer => observer != func)
    }


    interval(timer) { //Publisher
        setInterval(
            () => {
                this.observers.forEach(observer => observer(data))
                timer++
            }, 2000)
    }
}


const observable = new Observable()
observable.subscribe(saveCToSessionStorage())
observable.unsubscribe()




function logger(data){
    console.log(data)
}

function saveCToSessionStorage(data) { //Sub
    console.log('[reader C]', data)
    const storageData = { data }
    sessionStorage.setItem('C', JSON.stringify(storageData))
}

function discoverPowerBallNumber(data) { //Sub
    const number = Math.floor(Math.random() * data * 100)
    console.log('[powerball number]', data)
}