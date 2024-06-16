import axios from "axios";
import { useState } from "react";

function App() {
  const [retrieveData, setRetrieveData] = useState({ data: [] }); // Initialize with data array
  const [retrieveVideo, setRetrieveVideo] = useState({}); // Initialize with an object
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const first = async () => {
    try {
      const response = await axios.post(
        `https://api.revspire.net/view-pitch-highlight-video`,
        {
          viewer_id: "IGH141585754362",
          pitch_id: "ITV043892357539",
        }
      );

      setRetrieveData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNext = () => {
    if (retrieveData.data.length > 0) {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % retrieveData.data.length);
    }
  };

  const handlePrev = () => {
    if (retrieveData.data.length > 0) {
      setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + retrieveData.data.length) % retrieveData.data.length);
    }
  };

  const second = async () => {
    try {
      const response = await axios.post(
        `https://api.revspire.net/open-content`,
        {
          viewer_id: "IGH141585754362",
          contentId: "OUG340668801535",
        }
      );

      setRetrieveVideo(response.data);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6">
      <button className="text-lg bg-blue-300 p-4 rounded-md" onClick={first}>
        Click to Load Revspire Video Carousel
      </button>

      <div id="indicators-carousel" className="relative w-full md:w-3/4 lg:w-2/3 border-2 p-4 rounded-lg shadow-lg">
        <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
          {/* Render current video */}
          {retrieveData.data.length > 0 && (
            <div className="mt-4">
              <video
                src={retrieveData.data[currentVideoIndex]}
                controls
                className="h-60 w-full rounded-t-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
          {/* Add slider indicators */}
          {retrieveData.data.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${index === currentVideoIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              aria-current={index === currentVideoIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setCurrentVideoIndex(index)}
            >
              {/* Removed numbers */}
            </button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

    </div>
  );
}

export default App;