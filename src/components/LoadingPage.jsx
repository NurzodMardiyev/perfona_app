import loading from "../images/LOGO.mp4";
import logoP from "../images/perfonaPlogo.png";
import "../App.css";
import { useEffect, useState } from "react";
import perfona from "../images/perfona.gif";

export default function LoadingPage() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 4500);
  }, []);
  return (
    <div>
      <div className="h-[100vh] p-0 m-0 flex max-w-[430px] border mx-auto justify-center items-center relative">
        {showVideo ? (
          <div
            className={`absolute left-[90px] h-[100vh] flex items-center top-0 justify-center border-3 border-red-400 ${
              showVideo ? "swipeImg z-[99]" : ""
            } `}
          >
            <img src={logoP} alt="Perfona logo" className="w-[70px]" />
          </div>
        ) : (
          <div
            className={`flex w-full h-[100vh] justify-center items-center loading overflow-hidden `}
          >
            {/* <video
              src={loading}
              controls={false}
              autoPlay={true}
              playsInline
              muted
            ></video> */}
            <img src={perfona} alt="Perfona gif" />
          </div>
        )}
      </div>
    </div>
  );
}
