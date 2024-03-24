import Webcam from "@/components/VideoRecorder";
import ProgressBar from "@/components/ProgressBar";

const VideoResponse: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="">Video Response</h1>
      <br />
      <div className="mt-96">
      <ProgressBar />
        <Webcam />
      </div>
    </div>
  );
};

export default VideoResponse;