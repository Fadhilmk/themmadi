import Image from "next/image";
import '../app/globals.css';
import FeatureCard from "./featureCard";

export default function Home() {
  return (
    <div>
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
      </section>

      <section className="p-8 md:p-20 text-center justify-center" >
        <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'LeagueSpartan, sans-serif'}}>Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          {/* Feature Card 1 */}
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />      
        </div>
      </section>
      <div className="flex flex-col justify-end items-center pb-60 md:pb-20 sm:pb-10">
          <a
            href="/signup"
            className="bg-green-400 text-white px-4 py-2 rounded getStart"
            style={{ fontFamily: 'LeagueSpartan, sans-serif'}}
          >
            Get Started
          </a>
        </div>
    </div>
  );
}
