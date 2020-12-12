const form = document.querySelector('#add-character');
const input = document.querySelector('#first-name');
const disenyList = document.querySelector('#disney-list');

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const newChar = document.createElement('li');
    const removeBtn = document.createElement('button');
    
    newChar.innerText = input.value;
    input.value = '';
    disenyList.append(newChar);
    
    removeBtn.innerText = 'unliked';
    newChar.append(removeBtn);
})


disenyList.addEventListener('click',function(e){    
    if (e.target.tagName === 'BUTTON'){
       e.target.parentElement.remove();
   } 
   
   else if (e.target.tagName == 'LI'){
       
       e.target.classList.add('like');
       star = '☆'
       e.target.prepend(star);

       if (e.target.innerText.includes('☆☆☆☆☆')){
            e.target.style.color = 'green';
        }


   }
  
   
})
