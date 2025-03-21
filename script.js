/*  
**********************************
      MAIN PAGE FUNCTIONALITY
**********************************      
*/

// MODAL
const dialog = document.querySelector("dialog");
const overlay = document.querySelector(".modal-overlay");

const showModal = () => {
  overlay.classList.remove("hide");
  dialog.show();
};

const closeModal = (e) => {
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
          Authorization: `Bearer ${"9e6c0298-5b0f-4841-a699-c4e787ea043a"}`,
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
          Authorization: `Bearer ${"9e6c0298-5b0f-4841-a699-c4e787ea043a"}`,
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
