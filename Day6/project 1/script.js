const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const graduated = document.getElementsByName("graduated");
const form = document.getElementById("userForm");
const tableBody = document.getElementById("tableBody");
var users = [];

const submit = document.getElementById("submitBtn");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  const Fname = firstName.value.trim();
  const Lname = lastName.value.trim();
  const Age = age.value;
  const radio = form.elements["graduated"].value;

  if (Fname == "" || Lname == "" || Age == "" || radio == "") {
    alert("One or more input/s field/s is/are Empty");
    return;
  }
  var user = {
    firstname: Fname,
    lastname: Lname,
    age: Age,
    graduated: radio,
  };
  users.push(user);
  store();
  displayUsers(users);
  firstName.value = "";
  lastName.value = "";
  age.value = "";
  graduated[0].checked = false;
  graduated[1].checked = false;
});

function displayUsers(arr) {
  tableBody.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const newrow = tableBody.insertRow();
    const cell1 = newrow.insertCell(0);
    cell1.textContent = arr[i].firstname + " " + arr[i].lastname;
    const cell3 = newrow.insertCell(1);
    cell3.textContent = arr[i].age;
    const cell4 = newrow.insertCell(2);
    cell4.textContent = arr[i].graduated;
    const cell5 = newrow.insertCell(3);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    cell5.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    cell5.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      arr.splice(i, 1);
      users = arr;
      store();
      displayUsers(users);
    });
    editBtn.addEventListener("click", function () {
      const inputFirstName = document.createElement("input");
      inputFirstName.classList.add("inputFirstName");
      inputFirstName.value = arr[i].firstname;
      inputFirstName.setAttribute("placeholder", "First Name");
      const inputLastName = document.createElement("input");
      inputLastName.classList.add("inputLastName");
      inputLastName.value = arr[i].lastname;
      inputLastName.setAttribute("placeholder", "Last Name");
      cell1.textContent = "";
      cell1.appendChild(inputFirstName);
      cell1.appendChild(inputLastName);
      const inputAge = document.createElement("input");
      inputAge.classList.add("inputAge");
      inputAge.setAttribute("type", "number");
      inputAge.setAttribute("min", "1");
      inputAge.setAttribute("max", "100");
      inputAge.setAttribute("placeholder", "Age");
      inputAge.value = arr[i].age;
      cell3.textContent = "";
      cell3.appendChild(inputAge);
      const inputRadio = document.createElement("input");
      inputRadio.setAttribute("type", "radio");
      inputRadio.setAttribute("id", "inputRadio");
      inputRadio.setAttribute("name", "inputRadio");
      inputRadio.setAttribute("value", "yes");
      if (arr[i].graduated === "yes") {
        inputRadio.checked = true;
      }

      const inputLabel1 = document.createElement("label");
      inputLabel1.setAttribute("for", "inputRadio");
      inputLabel1.textContent = "Yes";

      const inputRadio2 = document.createElement("input");
      inputRadio2.setAttribute("type", "radio");
      inputRadio2.setAttribute("id", "inputRadio2");
      inputRadio2.setAttribute("name", "inputRadio");
      inputRadio2.setAttribute("value", "no");
      if (arr[i].graduated === "no") {
        inputRadio2.checked = true;
      }

      const inputLabel2 = document.createElement("label");
      inputLabel2.setAttribute("for", "inputRadio2");
      inputLabel2.textContent = "No";

      cell4.textContent = "";
      cell4.appendChild(inputRadio);
      cell4.appendChild(inputLabel1);
      cell4.appendChild(inputRadio2);
      cell4.appendChild(inputLabel2);
      deleteBtn.style.display = "none";
      editBtn.style.display = "none";
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("saveBtn");
      cell5.appendChild(saveBtn);
      saveBtn.addEventListener("click", function () {
        const updatedFirstName = inputFirstName.value.trim();
        const updatedLastName = inputLastName.value.trim();
        const updatedAge = parseInt(inputAge.value);
        const selectedRadio = document.querySelector(
          "input[name='inputRadio']:checked",
        );
        let updatedGraduated = "no";
        if (selectedRadio) {
          updatedGraduated = selectedRadio.value;
        }

        arr[i] = {
          firstname: updatedFirstName,
          lastname: updatedLastName,
          age: updatedAge,
          graduated: updatedGraduated,
        };
        users = arr;
        store();
        displayUsers(users);
      });
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("cancelBtn");
      cell5.appendChild(cancelBtn);
      cancelBtn.addEventListener("click", function () {
        displayUsers(users);
      });
    });
  }
}
function store() {
  let usersString = JSON.stringify(users);
  localStorage.setItem("users", usersString);
}
function load() {
  let storedUSers = localStorage.getItem("users");
  if (storedUSers) {
    users = JSON.parse(storedUSers);
    displayUsers(users);
  }
}
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const searchValue = searchInput.value.trim().toLowerCase();
  const matchedArray = [];
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].firstname.toLowerCase().includes(searchValue) ||
      users[i].lastname.toLowerCase().includes(searchValue)
    ) {
      matchedArray.push(users[i]);
    }
  }
  displayUsers(matchedArray);
});

const filterBtn = document.getElementById("filterBtn");
filterBtn.addEventListener("change", function () {
  const filterValue = document.getElementById("filterBtn").value;
  const filteredArray = [];
  if (filterValue === "all") {
    displayUsers(users);
  } else if (filterValue === "yes") {
    for (let i = 0; i < users.length; i++) {
      if (users[i].graduated === "yes") {
        filteredArray.push(users[i]);
      }
    }
    displayUsers(filteredArray);
  } else if (filterValue === "no") {
    for (let i = 0; i < users.length; i++) {
      if (users[i].graduated === "no") {
        filteredArray.push(users[i]);
      }
    }
    displayUsers(filteredArray);
  }
});
load();
