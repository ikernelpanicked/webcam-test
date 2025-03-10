import React, { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableVideo() {
      try {
        // Request webcam access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        //default camera not there, try another
        try {
          // Fallback to any camera
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play();
          }
        } catch (fallbackErr) {
          console.error("Error accessing webcam:", err);
        }
      }
    }
    enableVideo();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Webcam Test</h1>
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        style={{ width: 640, height: 480, background: "#000" }}
      />
    </div>
  );
}

export default App;
