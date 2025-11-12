function load() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState !== null) {
      checkbox.checked = savedState === "true";
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      localStorage.setItem(event.target.id, event.target.checked);
    });
  });
}

document.addEventListener("DOMContentLoaded", load);
