// haed elements
let menu = document.querySelector(".icon");
let menuIcon = document.querySelector(".icon ion-icon ");
let list = document.querySelector(".list");

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

let addBtn = document.querySelector(".add");
addBtn.onclick = function () {
  document.querySelector(".add-container").classList.add("visible");
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
};
let tasksPlace = [];
let task_title_toDo = document.querySelector(".task-to-do-title");
let task_toDo = document.querySelector(".task-to-do");

if (localStorage.getItem('tasks')) {
  tasksPlace = JSON.parse(localStorage.getItem('tasks'));
  craeteTask(tasksPlace);
  runCounter()
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
    if (desc_hint.textContent.length >= 172) {
      let clone = document.createTextNode(desc_hint).cloneNode(true);
      desc_hint.textContent = desc_hint.textContent.substring(0, 172) + ".....";
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
  e.target.stopPropagation;
  if (e.target.classList.contains("removeTsk")) {
    tasksPlace = tasksPlace.filter(task => {
      return task.id == e.target.parentElement.parentElement.dataset.id ? '':task                     
    })
    e.target.parentElement.parentElement.remove();
    saveToStock(tasksPlace)
    runCounter()
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