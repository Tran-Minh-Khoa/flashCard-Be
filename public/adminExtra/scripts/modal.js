function displayErrorModal(title, description, onClick) {
  // Set modal title and body content
  console.log("Title:", title);
  document.getElementById("errorModalBody").innerHTML = description;
  document.getElementById("modelTitle").innerHTML = title;

  // Update Confirm button based on onClick
  const confirmBtn = document.getElementById("_confirmBtn");
  if (onClick) {
    confirmBtn.style.display = "inline-block"; // Show the Confirm button
    confirmBtn.setAttribute("href", ""); // Clear the href attribute
    confirmBtn.addEventListener("click", onClick); // Assign the provided onClick function
  } else {
    confirmBtn.style.display = "none"; // Hide the Confirm button
    confirmBtn.removeAttribute("href"); // Remove the href attribute
    confirmBtn.removeEventListener("click", null); // Remove any existing click event listener
  }

  // Show the modal
  $("#errorModal").modal("show");
}
