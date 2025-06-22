"use client";

import dynamic from "next/dynamic";
const useReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.useReactMediaRecorder),
  { ssr: false }
);

export default function Record() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
  
  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
}

