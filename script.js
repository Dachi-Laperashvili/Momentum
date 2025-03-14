/*  
**********************************
      MAIN PAGE FUNCTIONALITY
**********************************      
*/

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
  priorityTag.classList.add("priority");
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
  const dueDate = document.createElement("span");
  dueDate.textContent = date;

  // task content

  const content = document.createElement("div");
  content.classList.add("content");
  const taskTitle = document.createElement("h2");
  taskTitle.textContent = title;
  const taskDescription = document.createElement("p");
  taskDescription.textContent = description;

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
