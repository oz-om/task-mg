let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");

menuIcon.addEventListener('click', function(){
  list.classList.toggle('open-list')
})