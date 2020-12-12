let form = document.querySelector('form')
console.log(form)

form.addEventListener('submit', function(e){
    e.preventDefault();
    let u = document.getElementById('url').value
    let tT = document.getElementById('tText').value
    let bT = document.getElementById('bText').value

    if(u != ""){

        let block = document.createElement('div')
        block.className = "container"

        let width = 0;
        let img = document.createElement('img')
        img.id = "iii" 
        
        // img.onload = function() {
        //     width = this.width;
        //     alert("Before width is " + width)
        // }

        // let inter = setInterval(function(){
        //     if(img!=undefined){
        //       alert(img.width);
        //       clearInterval(inter);
        //     }
        //   },300);
        img.src = u;
        
        
        block.appendChild(img)
        
        let tTBlock = document.createElement('div')
        tTBlock.className = "tTBlock"
        tTBlock.innerText = tT
        let tTWidth = measureWidth(tT)
        console.log(tTWidth)
        block.append(tTBlock)
        

        let bTBlock = document.createElement('div')
        bTBlock.className = "bTBlock"
        bTBlock.innerText = bT
        let bTWidth = measureWidth(bT)
        console.log(bTWidth)
        block.append(bTBlock)

        // console.log(width)
        // setTimeout(1000)
        // if(tTWidth < width && bTWidth < width){
        document.body.appendChild(block);
        // }
        // else{
            // alert("The text enter is too long")
        // }
        form.reset();
    }

    else{
        alert("Please enter the url")
    }
})

function measureWidth(text){
    let font = "28px Fantasy";
    canvas = document.createElement("canvas"); 
    context = canvas.getContext("2d"); 
    context.font = font; 
    width = context.measureText(text).width; 
    return Math.ceil(width)
}

document.addEventListener("click",function(e){
    console.log(e.target.tagName)
    if(e.target.tagName === 'IMG'){e.target.parentNode.remove();}
})