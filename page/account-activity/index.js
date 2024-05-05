// Add your JavaScript code here
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("show-more-btn");
  const activityTiles = document.querySelectorAll(
    "#activity-container > activity-tile"
  );

  activityTiles.forEach(function (tile, index) {
    if (index >= 3) {
      tile.classList.toggle("hide");
    }
  });

  showMoreBtn.addEventListener("click", function () {
    activityTiles.forEach(function (tile, index) {
      if (index >= 3) {
        tile.classList.toggle("hide");
      }
    });

    if (showMoreBtn.innerText === "Show More") {
      showMoreBtn.innerText = "Show Less";
    } else {
      showMoreBtn.innerText = "Show More";
    }
  });
});
