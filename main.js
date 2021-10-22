let menu = document.querySelector('.icon');
let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");

function openMenu(){
  list.classList.toggle('open-list')
};
function closeMenu(){
  list.classList.remove('open-list')
}
function stopProp(el){
  el.addEventListener('click',(e)=>{
    e.stopPropagation()
  })
}
stopProp(list)
document.addEventListener('click', function(e){
  if (e.target == list || e.target == menuIcon) {
    openMenu();
  } else {
    closeMenu();
  }
});

let addBtn = document.querySelector('.add');
addBtn.onclick = function(){
  document.querySelector('.add-container').classList.add('visible')
}
let discardBtn = document.querySelector('.discard');
discardBtn.onclick = function(){
  document.querySelector('.add-container').classList.remove('visible')
}

let taskData = {
  title: 'tist',
  task: 'task to do',
  stast: 'not-copmplet',
  id: '21475412875',
  date: '11/22/21',
} 

console.log(taskData)

let labls = document.querySelectorAll('label');
labls.forEach(label => {
  label.addEventListener('click', function() {
    let chebox = document.querySelector(`#${label.getAttribute('for')}`);
    if (!chebox.checked) {
      console.log("true")
    } else {
      console.log("false")
    }

  })
})

// max lengh of text is 172
let descHint = document.querySelector('.desc-hint').textContent;
if (descHint.length >= 172) {
  let clone = document.createTextNode(descHint).cloneNode(true);
  document.querySelector('.desc-hint').textContent = descHint.substring(0, 172)+'.....';
} else {
  
}

