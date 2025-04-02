$(() => {
  function isVideoVisible() {
    const rect = video.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    // take the lowest point of the visible area - to the highest
    console.log(
      `top: ${rect.top}, bottom: ${rect.bottom}, left: ${rect.left}, right: ${rect.right}, window height: ${windowHeight}`
    );

    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    console.log(visibleHeight / rect.height);
    // return if the ratio of the visible height and the height of the video is greater than 0.5
    return visibleHeight / rect.height >= 0.5;
  }

  // Function to handle video play/pause based on visibility
  function handleVideoPlayback() {
    if (isVideoVisible() && document.visibilityState === "visible") {
      video.play();
    } else {
      video.pause();
    }
  }
  const video = $("#video-playback").get(0);

  $(window).on("scroll", handleVideoPlayback);
  $(document).on("resize", handleVideoPlayback);
  $(document).on("visibilitychange", handleVideoPlayback);
});
// isVideoVisible fx
// intialize the rect to be video.getBoundingClientRect()
// intialize the windowHeight
// intialize  the visibleHeight where u take teh minimum value of rect.bottom and windowHeight minus the maximum value of rect.top and 0
// return the visbleHeight / rect.height >= .5

// handleVideoPlayback fx
// if(isVideoVisible() && document.visibilityState === 'visible') play the video
// else pause the video
