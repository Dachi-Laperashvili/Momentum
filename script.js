/*  
**********************************
      MAIN PAGE FUNCTIONALITY
**********************************      
*/
const token = "9e6c0298-5b0f-4841-a699-c4e787ea043a";

// FILTRATIONS

let activeFilter = null;

// fetching departments
async function getDepartments() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const departments = await res.json();

    console.log(departments);
    return departments;
  } catch (error) {
    console.error("Error:", error);
  }
}

// fetching priorities
async function getPriorities() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const priorities = await res.json();

    console.log(priorities);
    return priorities;
  } catch (error) {
    console.error("Error:", error);
  }
}

// fetching employees
async function getEmployees() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const employees = await res.json();

    console.log(employees);
    return employees;
  } catch (error) {
    console.error("Error:", error);
  }
}

// changing content of filters box
function changeFiltersContent(list, svgLink) {
  const filterList = document.querySelector(".filtration-links");
  filterList.textContent = "";

  list.forEach((item) => {
    const filterLink = document.createElement("li");
    const filterIcon = document.createElement("img");
    const linkContent = document.createElement("div");
    linkContent.classList.add("filter-content");

    filterIcon.src = svgLink;

    filterLink.appendChild(filterIcon);

    // checking if item has avatar
    if (item.avatar) {
      const avatar = document.createElement("img");
      avatar.src = item.avatar;
      avatar.classList.add("filter-avatar");
      linkContent.append(avatar);
    }

    //  checking if item has surname property for employees data
    if (item.surname) {
      linkContent.append(
        document.createTextNode(item.name + " " + item.surname)
      );
    } else {
      linkContent.append(document.createTextNode(item.name));
    }

    filterLink.append(linkContent);
    filterList.append(filterLink);
  });
}

async function loadDepartments() {
  try {
    const departments = await getDepartments();

    document.querySelector(".department-link").addEventListener("click", () => {
      if (activeFilter === "departments") {
        document.querySelector(".filters").classList.toggle("hide");
      } else {
        changeFiltersContent(departments, "/assets/check.svg");
        document.querySelector(".filters").classList.remove("hide");
        activeFilter = "departments";
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function loadPriorities() {
  try {
    const priorities = await getPriorities();

    document.querySelector(".priority-link").addEventListener("click", () => {
      if (activeFilter === "priorities") {
        document.querySelector(".filters").classList.toggle("hide");
      } else {
        changeFiltersContent(priorities, "/assets/purpleCheck.svg");
        document.querySelector(".filters").classList.remove("hide");
        activeFilter = "priorities";
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function loadEmployees() {
  try {
    const employees = await getEmployees();

    document.querySelector(".employees-link").addEventListener("click", () => {
      if (activeFilter === "employees") {
        document.querySelector(".filters").classList.toggle("hide");
      } else {
        changeFiltersContent(employees, "/assets/purpleCheck.svg");
        document.querySelector(".filters").classList.remove("hide");
        activeFilter = "employees";
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

loadDepartments();
loadPriorities();
loadEmployees();

// STATUSES

// Getting task statuses from momentum api
async function getStatuses() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const statuses = await res.json();
    console.log(statuses);

    return statuses;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayStatusDivs() {
  try {
    const statuses = await getStatuses();
    const container = document.querySelector(".tasks-container");

    // creating column div and appending new divs with status names inside it
    statuses.forEach((status, index) => {
      const column = document.createElement("div");
      column.classList.add("status-column");
      column.classList.add(status.name.toLowerCase().replace(/\s+/g, "-")); // removing spaces from status name

      const statusDiv = document.createElement("div");
      statusDiv.classList.add("status-title");
      statusDiv.classList.add(`status-${index}`);
      statusDiv.textContent = status.name;

      container.appendChild(column);
      column.appendChild(statusDiv);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

displayStatusDivs();

// TASKS

async function getTasks() {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const tasks = await res.json();
    console.log(tasks);

    return tasks;
  } catch (error) {
    console.error("Error:", error);
  }
}

//  function to create task cards in html
function createCard(
  title,
  priority,
  icon,
  date,
  department,
  description,
  avatar,
  comments_count,
  color
) {
  // card div
  const card = document.createElement("div");
  card.classList.add("card");

  // details div containing due date and priority and departament tags
  const details = document.createElement("div");
  details.classList.add("task-details", "details--top");

  // list of priority and departament tags
  const tags = document.createElement("ul");
  tags.classList.add("tags");

  // creating tag for priority with icon and name
  const priorityTag = document.createElement("li");
  const priorityColors = {
    დაბალი: "#08A508",
    საშუალო: "#FFBE0B",
    მაღალი: "#FA4D4D",
  };

  priorityTag.classList.add("priority");
  priorityTag.style.border = `0.5px solid ${priorityColors[priority]}`;

  const prioritySvg = document.createElement("img");
  const prioritySpan = document.createElement("span");

  prioritySvg.src = icon;
  prioritySpan.textContent = priority;

  priorityTag.appendChild(prioritySvg);
  priorityTag.appendChild(prioritySpan);

  // departament
  const departmentTag = document.createElement("li");
  departmentTag.classList.add("department");
  departmentTag.textContent = department;

  // due-date
  const months = [
    "იანვ",
    "თებ",
    "მარტი",
    "აპრ",
    "მაისი",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექტ",
    "ოქტ",
    "ნოე",
    "დეკ",
  ];

  const dueDate = document.createElement("span");

  const dateFormat = new Date(date);
  const day = dateFormat.getUTCDay();
  const month = dateFormat.getUTCMonth();
  const year = dateFormat.getUTCFullYear();

  dueDate.textContent = day + " " + months[month] + ", " + year;

  // task content

  const content = document.createElement("div");
  content.classList.add("content");
  const taskTitle = document.createElement("h2");
  taskTitle.textContent = title;
  const taskDescription = document.createElement("p");

  // if description is longer than 100 words then adding ... after 100th word
  if (description && description.length > 100) {
    taskDescription.textContent = description.substring(0, 100) + "...";
  } else {
    taskDescription.textContent = description;
  }

  // uploader img and comments
  const bottomDetails = document.createElement("div");
  bottomDetails.classList.add("task-details", "details--bottom");

  const uploaderImg = document.createElement("img");
  uploaderImg.src = avatar;
  uploaderImg.style.width = "31px";
  uploaderImg.style.maxHeight = "31px";
  uploaderImg.alt = "Uploader avatar";
  uploaderImg.className = "avatar";

  // comments
  const comments = document.createElement("div");
  comments.classList.add("comments");

  const commentsIcon = document.createElement("img");
  commentsIcon.src = "/assets/comments.svg";

  const count = document.createElement("span");
  count.textContent = comments_count;

  // creating card structure
  tags.append(priorityTag, departmentTag);
  details.append(tags, dueDate);

  content.append(taskTitle, taskDescription);

  comments.append(commentsIcon, count);
  bottomDetails.append(uploaderImg, comments);

  card.append(details, content, bottomDetails);
  card.style.border = `1px solid ${color}`;

  return card;
}

async function displayTasks() {
  try {
    const tasks = await getTasks();
    tasks.forEach((task) => {
      const statusColumns = document.querySelectorAll(".status-column");

      // if task status matches status column then adding task in that column
      statusColumns.forEach((column) => {
        const statusTitle = column.querySelector(".status-title");

        // creating div for task
        const card = createCard(
          task.name,
          task.priority.name,
          task.priority.icon,
          task.due_date,
          task.department.name,
          task.description,
          task.employee.avatar,
          task.total_comments,
          window.getComputedStyle(statusTitle).backgroundColor
        );

        const name = task.status.name.toLowerCase().replace(/\s+/g, "-"); // status name without spaces

        if (column.classList.contains(name)) {
          column.appendChild(card); // adding task
        }
      });
    });
  } catch (error) {
    console.error("Error: ", error);
  }
}

displayTasks();

// MODAL FUNCTIONALITY

const form = document.querySelector(".modal-form");

// adding departments in select

async function addDepartmentsInForm() {
  try {
    const departments = await getDepartments();
    const formSelect = document.getElementById("department");

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.textContent = department.name;
      option.value = department.id;
      formSelect.append(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

addDepartmentsInForm();

// OPENING / CLOSING MODAL

const dialog = document.querySelector("dialog");
const overlay = document.querySelector(".modal-overlay");

const showModal = () => {
  overlay.classList.remove("hide");
  dialog.show();
};

const closeModal = () => {
  document.querySelector(".name-min").style.color = "#343a40";
  document.querySelector(".name-max").style.color = "#343a40";
  document.querySelector(".name-letters").style.color = "#343a40";
  document.querySelector(".surname-min").style.color = "#343a40";
  document.querySelector(".surname-max").style.color = "#343a40";
  document.querySelector(".surname-letters").style.color = "#343a40";
  imgErorr.style.display = "none";
  preview.src = "";
  nameInput.style.borderColor = "#ced4da";
  surnameInput.style.borderColor = "#ced4da";
  uploadBox.style.display = "block";
  previewBox.style.display = "none";
  form.reset();
  overlay.classList.add("hide");
  dialog.close();
};

// opening and displaying modal
document.getElementById("open-modal").addEventListener("click", showModal);

// closing modal when clicking close buttons
document.querySelectorAll(".modal-cancel").forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

// closing modal when clicking on overlay
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

// FORM SUBMISSION AND VALIDATION

const file = document.getElementById("avatar");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");

const previewBox = document.querySelector(".preview-box");
const preview = document.getElementById("avatarPreview");
const deleteImg = document.getElementById("deleteImg");
const imgErorr = document.getElementById("imgError");
const uploadBox = document.querySelector(".upload-box");

// separated function for input validation

function validateInput(
  input,
  minNumber,
  maxNumber,
  minCheck,
  maxCheck,
  lettersCheck
) {
  const value = input.value;
  const regex = /^[A-Za-zა-ჰ]+$/;

  let isValid = true;
  if (value.length < minNumber) {
    minCheck.style.color = "#FA4D4D";
    input.style.borderColor = "#FA4D4D";
    isValid = false;
  } else {
    minCheck.style.color = "#08A508";
  }

  if (value.length > maxNumber) {
    maxCheck.style.color = "#FA4D4D";
    input.style.borderColor = "#FA4D4D";
    isValid = false;
  } else {
    maxCheck.style.color = "#08A508";
  }

  if (lettersCheck) {
    if (!regex.test(value)) {
      lettersCheck.style.color = "#FA4D4D";
      isValid = false;
      input.style.borderColor = "#FA4D4D";
    } else {
      lettersCheck.style.color = "#08A508";
    }
  }

  if (isValid) {
    input.style.borderColor = "#ced4da";
  }
}

// name validation

nameInput.addEventListener("input", () => {
  validateInput(
    nameInput,
    2,
    255,
    document.querySelector(".name-min"),
    document.querySelector(".name-max"),
    document.querySelector(".name-letters")
  );
});

// Surname validation
surnameInput.addEventListener("input", () => {
  validateInput(
    surnameInput,
    2,
    255,
    document.querySelector(".surname-min"),
    document.querySelector(".surname-max"),
    document.querySelector(".surname-letters")
  );
});

file.addEventListener("change", handleImgSelect);

deleteImg.addEventListener("click", () => {
  file.value = "";
  uploadBox.style.display = "block";
  previewBox.style.display = "none";
  imgErorr.style.display = "none";
});

function handleImgSelect(e) {
  const img = e.target.files[0];

  if (img) {
    if (img.size / 1024 > 600) {
      imgErorr.style.display = "block";
    } else {
      imgErorr.style.display = "none";

      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        preview.src = e.target.result;
        uploadBox.style.display = "none";
        previewBox.style.display = "flex";
      };
      fileReader.readAsDataURL(img); // reading contents of file
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = nameInput.value;
  const surname = surnameInput.value;
  const avatar = file.files[0];
  const department = document.getElementById("department").value;
  const regex = /^[A-Za-zა-ჰ]+$/;

  let validated = true;

  if (firstName.length < 2 || firstName.length > 255) {
    validated = false;
  }

  if (surname.length < 2 || surname.length > 255) {
    validated = false;
  }

  if (!regex.test(firstName) || !regex.test(surname)) {
    validated = false;
  }

  if (!avatar) {
    validated = false;
  }

  if (!validated) return;

  const formData = new FormData();
  formData.append("name", firstName);
  formData.append("surname", surname);
  formData.append("avatar", avatar);
  formData.append("department_id", department);

  fetch("https://momentum.redberryinternship.ge/api/employees", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  closeModal();
  window.location.reload();
});

document.querySelector(".cta-link").addEventListener("click", () => {
  window.location.href = "/add-tasks.html";
});

/*  
**********************************
      ADD TASKS FUNCTIONALITY
**********************************      
*/

// fetching departments,priorities,statuses and employees into form

async function departmentsInTasksForm() {
  try {
    const departments = await getDepartments();
    const formSelect = document.getElementById("tasksDepartment");

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.textContent = department.name;
      option.value = department.id;
      formSelect.append(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

departmentsInTasksForm();

async function prioritiesInTasksForm() {
  try {
    const priorities = await getPriorities();
    const prioritySelect = document.getElementById("taskPriority");

    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.textContent = priority.name;
      option.value = priority.id;
      prioritySelect.append(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

prioritiesInTasksForm();

async function statusesInTasksForm() {
  try {
    const statuses = await getStatuses();
    const statusSelect = document.getElementById("status");

    statuses.forEach((status) => {
      const option = document.createElement("option");
      option.textContent = status.name;
      option.value = status.id;
      statusSelect.append(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

statusesInTasksForm();

//  make seperate function to only return employees of choosen department

async function getEmployeesByDepartment(department_id) {
  try {
    const employees = await getEmployees();

    return employees.filter(
      (employee) => employee.department.id === department_id
    );
  } catch (error) {
    console.error(error);
  }
}

async function employeesInTasksForm() {
  try {
    const departmentSelect = document.getElementById("tasksDepartment");
    const employeeSelect = document.getElementById("employee");
    const employeeText = document.querySelector(".employee_text");

    // disable employee selection and reset employee text color
    employeeSelect.disabled = true;
    employeeText.style.color = "#adb5bd";

    // add event listener to department select so we get employees based on department
    departmentSelect.addEventListener("change", async function () {
      const departmentId = departmentSelect.value;

      // clear existing options
      employeeSelect.innerHTML = "";

      // if department exists and if employees exist for that department then get employees and enable employee select

      console.log(departmentId);

      if (departmentId) {
        const employees = await getEmployeesByDepartment(
          parseInt(departmentId)
        );

        console.log(employees);

        if (employees) {
          employeeText.style.color = "#343a40";
          employeeSelect.disabled = false;

          employees.forEach((employee) => {
            const option = document.createElement("option");
            option.textContent = employee.name + " " + employee.surname;
            option.value = employee.id;
            employeeSelect.append(option);
          });
        } else {
          // if employees doesn't exist for selected department add option that tells users
          const noEmployeesOption = document.createElement("option");
          noEmployeesOption.textContent =
            "ამ დეპარტამენტს არ ჰყავს თანამშრომლები!";
          employeeText.style.color = "#adb5bd";
          employeeSelect.disabled = true;
        }
      } else {
        // if department isn't selected disable employee select
        employeeText.style.color = "#adb5bd";
        employeeSelect.disabled = true;
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

employeesInTasksForm();

// validating task title and description visually

const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");

taskTitle.addEventListener("input", () => {
  validateInput(
    taskTitle,
    3,
    255,
    document.querySelector(".title-min"),
    document.querySelector(".title-max")
  );
});

taskDescription.addEventListener("input", () => {
  validateInput(
    taskDescription,
    4,
    255,
    document.querySelector(".description-min"),
    document.querySelector(".description-max")
  );
});
