
import Image from "next/image";

const AboutUs = () => {
  return (
    <>
      <div className="my-1"></div>
      <div id="about" className="container mx-auto px-1 p-4 flex flex-col justify-center">
        <div className="flex items-center justify-center">
          <Image
            src="/nav_logo.jpeg"
            alt="Logo"
            width={90}
            height={90}
            className="object-contain"
          />
          <p style={{ color: "#2c8ffa", fontSize: 35, fontFamily: "serif", fontWeight: 700 }}>
            MaaDiy
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 p-8">
            <p className="text-lg text-gray-700 leading-snug">
              At MaaDiy we&apos;re all about making your marketing journey exciting and effective.
              Our platform is designed to help you connect with your audience through direct, personalized messaging that truly resonates.
            </p>
            <p className="text-lg text-gray-700 mt-4" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
              Our mission is to empower small businesses like yours with tools that drive real results. With our user-friendly design and insightful analytics, you can create impactful messages that captivate your audience and achieve your goals.
            </p>
            <p className="text-lg text-gray-700 mt-4" style={{ fontFamily: "LeagueSpartan, sans-serif" }}>
              Explore MaaDiy and see how we can help you turn every message into a moment of success!
            </p>
          </div>
          <div className="lg:w-1/2 p-10 flex flex-col space-y-4">
            {/* Video Card */}
            <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
              <div className="relative w-full" style={{ height: 400 }}>
                <video
                  src="/ogMadiy.mp4" // Replace with your video file path
                  className="w-full h-full"
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: "contain" }} // Ensures the video fits without cropping
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;