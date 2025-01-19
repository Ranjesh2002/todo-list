let input1 = document.getElementById("todo-input");
let add = document.getElementById("add-todo");
let list1 = document.getElementById("todo-list");

add.addEventListener("click", function () {
  if (input1.value === "") {
    alert("Please enter a task");
  } else {
    let list2 = document.createElement("li");
    list2.innerHTML = input1.value;
    let cross = document.createElement("span");
    cross.innerHTML = "\u00D7";
    list1.appendChild(list2);
    list2.appendChild(cross);
  }
  input1.value = "";
  save();
});

list1.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      save();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      save();
    }
  },
  false
);

function save() {
  localStorage.setItem("todo", list1.innerHTML);
}

function show() {
  list1.innerHTML = localStorage.getItem("todo");
}
show();

// localStorage.clear();
