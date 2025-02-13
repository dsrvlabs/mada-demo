import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const useQRScanner = (handleScan: (result: string) => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        qrScannerRef.current = new QrScanner(videoRef.current, (result) => handleScan(result.data), {
          onDecodeError: (error) => {
            if (error !== "No QR code found") {
              console.error("QR Scanner error: ", error);
            }
          },
          returnDetailedScanResult: true,
        });
        qrScannerRef.current.start();
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
      setError("Camera access was denied. Please allow camera access and try again.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      qrScannerRef.current?.stop();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return { videoRef, scanning, startCamera, setScanning, stopCamera, error };
};

export default useQRScanner;
