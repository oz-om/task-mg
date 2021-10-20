let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");

menuIcon.addEventListener('click', function(){
  list.classList.toggle('open-list')
})


let labls = document.querySelectorAll('label');

labls.forEach(label => {
  label.addEventListener('click', function (){
    let chebox = document.querySelector(`#${label.getAttribute('for')}`);

   
    if (!chebox.checked) {
      console.log("true")
  
      console.log(chebox)
    } else {
      console.log("false")
    }

  })
})
