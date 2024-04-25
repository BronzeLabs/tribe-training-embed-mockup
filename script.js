// window.load = function () {
// alert("Hello");
// };

function handleEvents(event) {
  if (event.data?.source !== "tribecourses") {
    return;
  }

  switch (event.data?.type) {
    /* Called when the the course is first loaded */
    case "ready":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    /* The course is requesting that we scroll the page to a certain point */
    case "scroll":
      // Scroll to this position in the iframe
      const posY = event.data.position?.top;

      // Get the position of the iframe on the page
      const iframeY = document
        .getElementById("iframe")
        .getBoundingClientRect().top;

      // Scroll to the given position, taking the position of the iframe into account
      const scrollY = iframeY + posY;
      window.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
      break;
    /* The size of the content has changed */
    case "resize":
      const height = event.data?.size?.height || 900;
      document.getElementById("iframe").style.height = `${height}px`;
      break;
    case "close":
      window.location.href = "index.html";
      break;
  }
}

window.addEventListener("message", handleEvents);
