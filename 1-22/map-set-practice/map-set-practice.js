// {1,2,3,4}

// "ref"

// 0: {Array(3) => true}
// 1: {Array(3) => false}

const hasDuplicate = arr => new Set(arr).size != arr.size;

function vowelCount(str){
    const vowlMap = new Map();
    str =str.toLowerCase();
    for(let char of str){
        if("aeiou".includes(char)){
            vowlMap.has(char) ?
             vowlMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1) :
                vowlMap.set(lowerCaseChar, 1);
        }
    }
    return vowlMap;
}