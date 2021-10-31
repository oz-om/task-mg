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
  craeteTask();
  discard();
};

let TStitle,TS, state,id,time;

let task_title_toDo = document.querySelector(".task-to-do-title");
let task_toDo = document.querySelector(".task-to-do");

function craeteTask() {
  let date = new Date();
  let box_task = document.createElement("div");
  tasks.append(box_task);
  box_task.className = "box-task";
  box_task.id = `task-${tasks.childElementCount}`;
  box_task.setAttribute("data-id", date.getTime());
  id = box_task.dataset.id;

  let title = document.createElement("div");
  title.className = "title";
  let task_title = document.createElement("h1");
  task_title.className = "task-title";
  task_title.textContent = task_title_toDo.value;
  TStitle = task_title_toDo.value;
  let remove_icon = document.createElement("ion-icon");
  remove_icon.setAttribute("name", "remove-circle-outline");
  remove_icon.className = 'removeTsk';
  title.append(task_title, remove_icon);
  box_task.appendChild(title);

  let desc_hint = document.createElement("div");
  desc_hint.className = "desc-hint";
  desc_hint.textContent = task_toDo.value;
  TS = task_toDo.value;
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
  input.id = `task-${tasks.childElementCount}-status`;
  input.setAttribute("data-state", "not-complete");
  state = input.dataset.state;
  let label = document.createElement("label");
  label.className = 'label';
  label.setAttribute("for", `task-${tasks.childElementCount}-status`);
  let checkmark = document.createElement("ion-icon");
  checkmark.setAttribute("name", "checkmark-done-circle-sharp");
  checkmark.className = 'doneTsk';
  label.appendChild(checkmark);
  status.append(input, label);
  let showDate = document.createElement("div");
  showDate.className = "date";
  showDate.textContent = `${date.getUTCHours()}:${date.getUTCMinutes()} ${date.toLocaleDateString()}`;
  time = showDate.textContent;
  details.append(status, showDate);
  box_task.appendChild(details);
  saveToLocal()
}

// set to localStorage 
function saveToLocal() {
  let taskData = {
    title: TStitle || 'new task',
    task: TS || 'emty!',
    state: state || 'not-complete',
    id: id || '',
    date: time || '',
  };

  console.log(taskData)
}



document.addEventListener('click', function (e) {
  e.target.stopPropagation
  if (e.target.classList.contains('removeTsk')) {
    e.target.parentElement.parentElement.remove()
  }
  if (e.target.classList.contains('label')) {
    let chebox = document.querySelector(`#${e.target.getAttribute("for")}`);
    if (!chebox.checked) {
      chebox.dataset.state = "completed";
      document.getElementById(`${e.target.getAttribute("for").substring(0, 6)}`).classList.add("complet");
    }
  }
  if (e.target.classList.contains('doneTsk')) {
    console.log(e.target.parentElement.getAttribute('for'))
    let chebox = document.querySelector(`#${e.target.parentElement.getAttribute("for")}`);
    chebox.dataset.state = "not-complete";
      document.getElementById(`${e.target.parentElement.getAttribute("for").substring(0, 6)}`).classList.remove("complet");
    
  }
})
