let tree = document.querySelector(".tree");
let ul_parent = document.createElement("ul");
let li_parent = document.createElement("li");
let a_parent = document.createElement("a");
let span_parent = document.createElement("span");
let item_controls_parent = document.createElement("div");
let btn_add_parent = document.createElement("button");
let btn_edit_parent = document.createElement("button");

item_controls_parent.classList.add("item-controls");
btn_add_parent.classList.add("btn-add");
btn_edit_parent.classList.add("btn-edit");

tree.appendChild(ul_parent);
ul_parent.appendChild(li_parent);
li_parent.appendChild(a_parent);
a_parent.appendChild(span_parent);
span_parent.innerText = "Parent";
a_parent.appendChild(item_controls_parent);
item_controls_parent.appendChild(btn_add_parent);
item_controls_parent.appendChild(btn_edit_parent);

document.querySelectorAll(".btn-add").forEach((button) => {
  button.addEventListener("click", (e) => {
    createChart(e);
  });
});

document.querySelectorAll(".btn-edit").forEach((button) => {
  button.addEventListener("click", (e) => {
    editChart(e);
  });
});

function createChart(e) {
  let parent = e.target.parentNode.parentNode.parentNode;
  let check = e.target.parentNode.parentNode;
  let subItem = check.nextElementSibling;
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let span = document.createElement("span");
  let editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.setAttribute("placeholder", "Your text...");
  let item_controls = document.createElement("div");
  let btn_add = document.createElement("button");
  let btn_remove = document.createElement("button");
  let btn_edit = document.createElement("button");
  item_controls.classList.add("item-controls");
  btn_add.classList.add("btn-add");
  btn_remove.classList.add("btn-remove");
  btn_edit.classList.add("btn-edit");
  if (subItem == null) {
    parent.appendChild(ul);
    ul.appendChild(li);
  } else {
    subItem.appendChild(li);
  }
  li.appendChild(a);
  a.appendChild(span);
  span.innerText = "";
  a.appendChild(item_controls);
  item_controls.appendChild(btn_add);
  item_controls.appendChild(btn_edit);
  item_controls.appendChild(btn_remove);
  a.appendChild(editInput);
  editInput.focus();

  btn_edit.disabled = true;
  editInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      span.innerText = editInput.value;
      editInput.remove();
      btn_edit.disabled = false;
    }
  });

  btn_add.addEventListener("click", (e) => {
    createChart(e);
  });
  btn_edit.addEventListener("click", (e) => {
    editChart(e);
  });
  btn_remove.addEventListener("click", (e) => {
    removeChart(e);
  });
}

function editChart(e) {
  let button = e.target;
  button.disabled = true;
  let editedChart = e.target.parentNode.parentNode;
  let text = editedChart.firstChild.innerText;
  editedChart.firstChild.innerText = "";
  let editInput = document.createElement("input");
  editInput.setAttribute("type", "text");
  editInput.setAttribute("value", text);
  editedChart.appendChild(editInput);
  editInput.focus();
  editInput.select();
  editInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      editedChart.firstChild.innerText = editInput.value;
      editInput.remove();
      button.disabled = false;
    }
  });
}

function removeChart(e) {
  let check = e.target.parentNode.parentNode.parentNode.parentNode;
  let deletedChart = e.target.parentNode.parentNode.parentNode;

  if (check.childElementCount == 1) {
    check.remove();
  } else {
    deletedChart.remove();
  }
}

let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    tree.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
  } else {
    tree.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
  }
});
document.getElementById("btn-zoom-in").addEventListener("click", () => {
  tree.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
});
document.getElementById("btn-zoom-out").addEventListener("click", () => {
  tree.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
});


dragElement(tree);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (elmnt.offsetTop - pos2 >= 0 && elmnt.offsetLeft - pos1 >= 0) {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
