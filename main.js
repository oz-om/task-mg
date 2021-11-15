// haed elements
let menu = document.querySelector(".icon");
let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");
let colors = document.querySelectorAll('.list .theme .colors li');

// body elements
let tasks = document.querySelector(".tasks");

function openMenu() {
  list.classList.toggle("open-list");
}
function closeMenu() {
  list.classList.remove("open-list");
}
function stopProp(el) {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
stopProp(list);
document.addEventListener("click", function (e) {
  if (e.target == list || e.target == menuIcon) {
    openMenu();
  } else {
    closeMenu();
  }
});


let arrOfColors = [
  {colThem:'rgb(147, 255, 223)',colText: 'rgb(6, 58, 44)'},
  {colThem:'rgb(253, 241, 227)',colText: 'rgb(223, 79, 2)'},
  {colThem:'rgb(240, 227, 253)',colText: 'rgb(124, 2, 223)'},
  {colThem:'rgb(253, 227, 241)',colText: 'rgb(223, 2, 113)'}
]
for (let i = 1; i < colors.length; i++) {
  const element = colors[i];
  element.style.border = '1px solid #fff'
  element.style.backgroundColor = arrOfColors[i-1].colText
  element.dataset.colTH = arrOfColors[i-1].colThem
  element.dataset.colTX = arrOfColors[i-1].colText
}
let usedTheme;

colors.forEach(color => {
  color.addEventListener('click', (e)=> {
    if (e.target.dataset.colTH == undefined) {
      document.documentElement.style.setProperty('--theme-color','rgb(255, 255, 255)');
      document.documentElement.style.setProperty('--text-color','rgb(0, 153, 255)');
      usedTheme = ['rgb(255, 255, 255)','rgb(0, 153, 255)']
      saveTheme(usedTheme)
    } else {
      document.documentElement.style.setProperty('--theme-color',e.target.dataset.colTH);
      document.documentElement.style.setProperty('--text-color',e.target.dataset.colTX);
      usedTheme = [e.target.dataset.colTH,e.target.dataset.colTX]
      saveTheme(usedTheme)
    }
  });
});
function saveTheme(usedTheme){
  localStorage.setItem('theme',JSON.stringify(usedTheme))
}
if (localStorage.getItem('theme')) {
  usedTheme = JSON.parse(localStorage.getItem('theme'))
  document.documentElement.style.setProperty('--theme-color',usedTheme[0]);
  document.documentElement.style.setProperty('--text-color',usedTheme[1]);
}

let rm_complete = document.querySelector('.clear-comp');
rm_complete.onclick = ()=>{
  let done = document.querySelectorAll('.tasks .complet');
  tasksPlace = tasksPlace.filter(task => {
    return task.state != 'complete'                     
  })
  saveToStock(tasksPlace)
  done.forEach(done => {
    done.remove()
  });
  runCounter();
  closeMenu();
  ifEmpty();
};
let clear_all = document.querySelector('.clear-all');
clear_all.onclick = function() {
  tasksPlace = [];
  saveToStock(tasksPlace)
  let tasks = document.querySelectorAll('.tasks .box-task ');
  tasks.forEach(task => {
    task.remove()
  });
  runCounter();
  closeMenu();
  ifEmpty();
}

function ifEmpty(){
  let empty = document.querySelector('.empty');
  if (!tasks.hasChildNodes()) {
    empty.style.display = 'grid'
  } else empty.style.display = 'none'
}

let addBtn = document.querySelector(".add");
addBtn.onclick = function () {
  document.querySelector(".add-container").classList.add("visible");
  setTimeout(() => {
    task_title_toDo.focus()
  }, 30);
  task_title_toDo.addEventListener('keyup',(e)=>{
    if (e.key == 'Enter') {
      task_toDo.focus()
    }
  });
  ifEmpty();
};
function discard() {
  document.querySelector(".add-container").classList.remove("visible");
  task_title_toDo.value = "";
  task_toDo.value = "";
}
let discardBtn = document.querySelector(".discard");
discardBtn.onclick = function () {
  discard();
};
function checkInput() {
  if (task_title_toDo.value == "") {
    task_title_toDo.value = "new task";
  }
  if (task_toDo.value == "") {
    task_toDo.value = "empty!";
  }
}

let apllay = document.querySelector(".aplly");
apllay.onclick = function () {
  checkInput();
  addToPlace();
  discard();
  ifEmpty();
};
let addContainer = document.querySelector('.add-container');
addContainer.addEventListener('keyup', (e)=>{
  e.stopPropagation()
  if (e.key == 'ArrowRight') {
    apllay.click()
  }
});

let tasksPlace = [];
let task_title_toDo = document.querySelector(".task-to-do-title");
let task_toDo = document.querySelector(".task-to-do");

if (localStorage.getItem('tasks')) {
  tasksPlace = JSON.parse(localStorage.getItem('tasks'));
  craeteTask(tasksPlace);
  runCounter();
  ifEmpty();
}

function addToPlace() {
  let date = new Date();
  let taskData = {
    title: task_title_toDo.value || "new task",
    task: task_toDo.value || "emty!",
    state: "not-complete",
    id: date.getTime() || "",
    date:
      `${date.getUTCHours()}:${date.getUTCMinutes()} ${date.toLocaleDateString()}` ||
      "",
  };
  tasksPlace.push(taskData);
  saveToStock(tasksPlace);
  craeteTask(tasksPlace);
  runCounter()
}

function craeteTask(tasksplace) {
  tasks.innerHTML = "";
  for (let i = 0; i < tasksplace.length; i++) {
    const element = tasksplace[i];

    let box_task = document.createElement("div");
    tasks.append(box_task);
    box_task.className = "box-task";
    box_task.id = `id_${element.id}`;
    box_task.setAttribute("data-id", element.id);
    box_task.setAttribute("data-state", element.state);

    let title = document.createElement("div");
    title.className = "title";
    let task_title = document.createElement("h1");
    task_title.className = "task-title";
    task_title.textContent = element.title;

    let remove_icon = document.createElement("ion-icon");
    remove_icon.setAttribute("name", "remove-circle-outline");
    remove_icon.className = "removeTsk";
    title.append(task_title, remove_icon);
    box_task.appendChild(title);

    let desc_hint = document.createElement("div");
    desc_hint.className = "desc-hint";
    desc_hint.textContent = element.task;

    box_task.appendChild(desc_hint);
    // max lengh of text is 172
    if (desc_hint.textContent.length >= 165) {
      let clone = document.createTextNode(desc_hint).cloneNode(true);
      desc_hint.textContent = desc_hint.textContent.substring(0, 165) + ".....";
    }

    let details = document.createElement("div");
    details.className = "details";
    let status = document.createElement("div");
    status.className = "status";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = `task-${element.id}-status`;

    if (element.state == 'complete') {
      box_task.classList.add('complet');
      input.setAttribute('checked','')
    } else {
      box_task.classList.add('notComplet');
    }

    let label = document.createElement("label");
    label.className = "label";
    label.setAttribute("for", `task-${element.id}-status`);
    let checkmark = document.createElement("ion-icon");
    checkmark.setAttribute("name", "checkmark-done-circle-sharp");
    checkmark.className = "doneTsk";
    label.appendChild(checkmark);
    status.append(input, label);
    let showDate = document.createElement("div");
    showDate.className = "date";
    showDate.textContent = `${element.date}`;
    details.append(status, showDate);
    box_task.appendChild(details);
  }
}

function saveToStock(tasksPlace){
  localStorage.setItem('tasks', JSON.stringify(tasksPlace))
}

document.addEventListener("click", function (e) {
  
  if (e.target.classList.contains('box-task') || e.target.classList.contains('task-title') || e.target.classList.contains('desc-hint')) {
    
  }

  if (e.target.classList.contains("removeTsk")) {
    tasksPlace = tasksPlace.filter(task => {
      return task.id == e.target.parentElement.parentElement.dataset.id ? '':task                     
    })
    e.target.parentElement.parentElement.remove();
    saveToStock(tasksPlace)
    runCounter()
    ifEmpty()
  }

  function getNum(text) {
    let id = "";
    for (let i = 0; i < text.length; i++) {
      const element = text[i];
      if (element === '0' || parseInt(element)) {
        id += element;
      }
    }
    return id;
  }
  if (e.target.classList.contains("label")) {
    let chebox = document.querySelector(`#${e.target.getAttribute("for")}`);
    if (!chebox.checked) {
      completeState(document.getElementById(`id_${getNum(e.target.getAttribute("for"))}`).getAttribute('data-id'))
      document.getElementById(`id_${getNum(e.target.getAttribute("for"))}`).classList.add("complet");
      document.getElementById(`id_${getNum(e.target.getAttribute("for"))}`).classList.remove("notComplet");
      runCounter()
    }
  }
  if (e.target.classList.contains("doneTsk")) {
    notcCompleteState(document.getElementById(`id_${getNum(e.target.parentElement.getAttribute("for"))}`).getAttribute('data-id'))
    document.getElementById(`id_${getNum(e.target.parentElement.getAttribute("for"))}`).classList.remove("complet");
    document.getElementById(`id_${getNum(e.target.parentElement.getAttribute("for"))}`).classList.add("notComplet");
    runCounter()
  }
});

function completeState(taskID) {
  for (let i = 0; i < tasksPlace.length; i++) {
    const element = tasksPlace[i];
    if (element.id == taskID) {
      element.state = 'complete'
      saveToStock(tasksPlace);
    }
  }
}
function notcCompleteState(taskID) {
  for (let i = 0; i < tasksPlace.length; i++) {
    const element = tasksPlace[i];
    if (element.id == taskID) {
      element.state = 'not-complete'
      saveToStock(tasksPlace);
    }
  }
}

function runCounter(){
  let not = document.querySelectorAll('.notComplet');
  let done = document.querySelectorAll('.tasks .complet')
  document.querySelector('.counter .not-complet span').textContent = not.length;
  document.querySelector('.counter .complet span').textContent = done.length
}



