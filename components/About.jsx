import Image from "next/image";

const AboutUs = () => {
  return (
    <>
      <div className="my-1">
        <hr className="border-t border-gray-300" />
      </div> 
      <div id='about' className="container mx-auto px-1 p-4 flex flex-col justify-center">
        <div className="flex items-center justify-center">
        <Image
          src="/nav_logo.jpeg"
          alt="Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      <p style={{color:'#2c8ffa', fontSize:35, fontFamily:'serif', fontWeight:700}}>MaaDiy</p>
      </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 p-8">
            <p className="text-lg text-gray-700 leading-snug" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
              At MaaDiy we&apos;re all about making your marketing journey exciting and effective. Our platform is designed to help you connect with your audience through direct, personalized messaging that truly resonates. We&apos;ve been dedicated to providing innovative solutions that make crafting, sending, and tracking campaigns easy and enjoyable.
            </p>
            <p className="text-lg text-gray-700 mt-4" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
              Our mission is to empower small businesses like yours with tools that drive real results. With our user-friendly design and insightful analytics, you can create impactful messages that captivate your audience and achieve your goals. Whether you're a small business or a large enterprise, we’re here to support you every step of the way.
            </p>
            <p className="text-lg text-gray-700 mt-4" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
              Explore MaaDiy and see how we can help you turn every message into a moment of success!
            </p>
          </div>
          <div className="lg:w-1/2 p-10 flex flex-col space-y-4">
            {/* Card 1 */}
            <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
              <div className="relative w-full" style={{height:400}}>
              <img
                src="/about_us.jpg"
                alt="Logo"
                style={{height:'100%', width:'100%'}}
              />              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
