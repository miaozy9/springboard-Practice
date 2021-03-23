function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

  const evens = (...args) => args.filter(v => v % 2 === 0)

const findMin = (...args) => Math.min(...args)


const mergeObejects = (obj1, obj2) => ({...obj1, ...obj2})

const doubleAndReturnArgs = (arr, ...args) =>[...arr, ...args.map(v => v*2)]

/** remove a random element in the items array
and return a new array without that item. */

function removeRandom(items) {
    let index = Math.floor(Math.random() * items.length)
    return [...items.slice(0,index, ...items.slice(index+1))]
}

/** Return a new array with every item in array1 and array2. */

function extend(array1, array2) {
    return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

function addKeyVal(obj, key, val) {
    let objSpread = {...obj}
    objSpread[key] = val;
    return objSpread;  
}


/** Return a new object with a key removed. */

function removeKey(obj, key) {
    let objSpread = {...obj}
    delete objSpread[key]
    return objSpread; 
}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    return { ...obj1, ...obj2 };
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
    let objSpread = {...obj}
    objSpread[key] = val;
    return objSpread;  
}