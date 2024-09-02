import Image from 'next/image';

const AboutUs = () => {
  return (
    <>
      <div className="my-8">
        <hr className="border-t border-gray-300" />
      </div>
      <div id='about' className="container mx-auto px-1 mb-10">
        <h1 className="text-4xl text-center text-blue-500 mt-2 font-bold mb-8 mt-10">ABOUT US</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 p-4">
            <p className="text-lg text-gray-700">
              At MaaDiy we’re all about making your marketing journey exciting and effective. Our platform is designed to help you connect with your audience through direct, personalized messaging that truly resonates. We’ve been dedicated to providing innovative solutions that make crafting, sending, and tracking campaigns easy and enjoyable.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Our mission is to empower small businesses like yours with tools that drive real results. With our user-friendly design and insightful analytics, you can create impactful messages that captivate your audience and achieve your goals. Whether you're a small business or a large enterprise, we’re here to support you every step of the way.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Explore MaaDiy and see how we can help you turn every message into a moment of success!
            </p>
          </div>
          <div className="lg:w-1/2 p-4 flex flex-col space-y-4">
            {/* Card 1 */}
            <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
              <div className="relative w-full h-64">
                {/* <Image src="/path-to-your-image.jpg" alt="MaaDiy marketing" layout="fill" objectFit="cover" className="rounded-t-lg" /> */}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">MaaDiy Marketing</h2>
                <p className="text-gray-600">Our tools empower you to connect with your audience effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
