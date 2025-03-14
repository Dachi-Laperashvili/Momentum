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

getTasks();

function createCard(content) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = content;
  return card;
}

async function displayTasks() {
  try {
    const tasks = await getTasks();
    tasks.forEach((task, index) => {
      const statusColumns = document.querySelectorAll(".status-column");

      // if task status matches status column then adding task in that column
      statusColumns.forEach((column) => {
        // creating div for task
        const card = createCard(task.name);

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
