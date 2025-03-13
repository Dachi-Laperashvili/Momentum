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

getStatuses();

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
