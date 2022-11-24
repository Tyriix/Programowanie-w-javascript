const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
}

var performance = window.performance;
var t0 =  performance.now();
asyncAdd(5,5)
var t1 = performance.now();
console.log(t1 - t0 + "ms");