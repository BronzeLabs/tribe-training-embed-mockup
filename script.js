function handleEvents(event) {
  if (event.data?.source !== "tribecourses") {
    return;
  }

  // Get the position of the iframe on the page
  const iframeY = document
    .getElementById("tribe-training-iframe")
    .getBoundingClientRect().top;
  const iframeOffset = window.scrollY + iframeY;

  switch (event.data?.type) {
    /* Called when the the course is first loaded */
    case "ready": {
      window.scrollTo({ top: iframeOffset, behavior: "smooth" });
      break;
    }
    /* The course is requesting that we scroll the page to a certain point */
    case "scroll": {
      const posY = event.data.position?.top;

      // Scroll to the given position, taking the position of the iframe into account
      const scrollY = iframeOffset + posY;
      window.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });

      break;
    }
    /* The size of the content has changed */
    case "resize": {
      const height = event.data?.size?.height || 900;
      document.getElementById(
        "tribe-training-iframe"
      ).style.height = `${height}px`;
      break;
    }
    /* Scroll to the top of the page after changing page (give the animation enough time ot finish first) */
    case "page-forward":
    case "page-back": {
      setTimeout(() => {
        window.scrollTo({
          top: iframeOffset,
          behavior: "smooth",
        });
      }, 600);

      break;
    }
    case "close": {
      window.location.href = "index.html";
      break;
    }
  }
}

window.addEventListener("message", handleEvents);
