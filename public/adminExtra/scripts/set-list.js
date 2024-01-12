async function toggleSetStatus(setId, isActive,name) {
  try {
    const response = await fetch(
      `/admin/${name}/${isActive ? "enable" : "disable"}/${setId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteSet(setId,name) {
  displayErrorModal(
    "Confirm",
    "Are you sure you want to delete this set?",
    () => ConfirmDelete(setId,name)
  );
}

async function ConfirmDelete(setId,name) {
  try {
    const response = await fetch(`/admin/${name}/delete/${setId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorText}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    //Timeout đợi database update
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
  }
}
