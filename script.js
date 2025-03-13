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

    statuses.forEach((status, index) => {
      const div = document.createElement("div");
      div.classList.add(`status-${index}`);
      div.textContent = status.name;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

displayStatusDivs();
