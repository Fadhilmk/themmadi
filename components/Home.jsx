import Image from "next/image";
import '../app/globals.css';

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

  {/* Aligning the button towards the bottom with responsive padding */}
  <div className="absolute inset-0 flex flex-col justify-end items-center pb-60 md:pb-20 sm:pb-10">
      <a
        href="/signup"
        className="bg-green-400 text-white px-4 py-2 rounded getStart"
      >
        Get Started
      </a>
  </div>
</section>




      <section className="p-8 md:p-20 text-center flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-w-sm mx-auto">
            <div className="p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mb-4 text-gray-900"
              >
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clipRule="evenodd"
                ></path>
                <path
                  d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"
                ></path>
              </svg>
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                UI/UX Review Check
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                Because it's about motivating the doers. Because I'm here to
                follow my dreams and inspire others.
              </p>
            </div>
            <div className="p-6 pt-0">
              <a href="#" className="inline-block">
                <button
                  className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20"
                  type="button"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </button>
              </a>
            </div>
          </div>

          {/* Repeat the feature card with your desired content or duplicate it as needed */}
          
        </div>
      </section>
    </div>
  );
}
