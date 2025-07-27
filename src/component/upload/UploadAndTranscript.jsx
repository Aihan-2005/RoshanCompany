import { useState } from "react";
import UploadFile from "./UploadFile";
import TranscriptResult from "./TranscriptResult";

function UploadAndTranscript() {
  const [transcription, setTranscription] = useState(null);

  const handleRestart = () => {
    setTranscription(null); // برگرد به حالت آپلود
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!transcription && (
        <UploadFile onTranscriptionReady={(data) => setTranscription(data)} />
      )}
      {transcription && (
        <TranscriptResult transcription={transcription} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default UploadAndTranscript;
