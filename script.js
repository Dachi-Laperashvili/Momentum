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
  } catch (error) {
    console.error("Error:", error);
  }
}

getStatuses();
