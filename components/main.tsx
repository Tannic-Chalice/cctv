import React, { useEffect, useRef } from 'react';
import '../styles/globals.css';

const Main: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    getCameraStream();

    return () => {
      // Clean up when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <main className="main-content">
      <div className="camera-box">
        <video ref={videoRef} autoPlay playsInline className="camera-feed" />
      </div>
    </main>
  );
};

export default Main;
