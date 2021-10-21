let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");

menuIcon.addEventListener('click', function() {
  list.classList.toggle('open-list')
})


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

