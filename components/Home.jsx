import Image from "next/image";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-grey-800 text-center flex flex-col justify-center items-center">
        <video
          className="w-full h-auto max-h-[calc(100vh-80px)] object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/MaaDiy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Get Started Button */}
        <div className="items-center mt-8">
          <a
            href="/signup"
            className="bg-green-400 text-white px-4 py-2 rounded getStart"
            style={{fontFamily: 'LeagueSpartan, sans-serif'}}
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-8 md:p-20 text-center">
        <div className="bg-blue-100 rounded-lg shadow-lg px-8 py-6">
          <h2 className="text-4xl font-bold  text-blue-600" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</h2>
        </div>

        <div className="mt-12 space-y-16">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/themadiy.png"
                alt="Feature 1"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>UI/UX Review Check</h3>
              <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                Because it&apos;s about motivating the doers. Because I&apos;m here to follow my dreams and inspire others.
              </p>
            </div>
          </div>

          {/* Feature 2 - Inverse Layout */}
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/feature2.jpg"
                alt="Feature 2"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Customization Options</h3>
              <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                Customize your app effortlessly and match your brand&apos;s identity with our powerful tools.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/feature3.jpg"
                alt="Feature 3"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Advanced Analytics</h3>
              <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
                Get in-depth insights and analytics about your product performance to improve decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-12">
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              style={{fontFamily: 'LeagueSpartan, sans-serif'}}
            >
              Free Trial
            </a>
            <a
              href="#"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              style={{fontFamily: 'LeagueSpartan, sans-serif'}}
            >
              Get Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
