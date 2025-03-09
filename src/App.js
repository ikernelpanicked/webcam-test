import React, { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableVideo() {
      try {
        // Request webcam access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Autoplay the video
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
    enableVideo();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Webcam Test</h1>
      <video
        ref={videoRef}
        style={{ width: 640, height: 480, background: "#000" }}
      />
    </div>
  );
}

export default App;
