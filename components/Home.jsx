// import Image from "next/image";
// import "../app/globals.css";

// export default function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative text-grey-800 text-center flex flex-col justify-center items-center">
//         <video
//           className="w-full h-auto max-h-[calc(100vh-80px)] object-cover"
//           autoPlay
//           muted
//           loop
//         >
//           <source src="/MaadiyHome.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Get Started Button */}
//         <div className="items-center mt-8">
//           <a
//             href="/signup"
//             className="bg-green-400 text-white px-4 py-2 rounded getStart"
//             style={{fontFamily: 'LeagueSpartan, sans-serif'}}
//           >
//             Get Started
//           </a>

//           {/* No credit card required text */}
//           <p className="mt-4 text-gray-600" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//             * No credit card required for demo
//           </p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="p-8 md:p-20 text-center" id="features">
//         <div className="bg-blue-100 rounded-lg shadow-lg px-8 py-6">
//           <h2 className="text-4xl font-bold  text-blue-600" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Features</h2>
//         </div>

//         <div className="mt-12 space-y-16">
//           {/* Feature 1 */}
//           <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
//             <div className="lg:w-1/2">
//               <Image
//                 src="/themadiy.png"
//                 alt="Send Messages with a Clear Call to Action"
//                 width={500}
//                 height={300}
//                 className="rounded-xl shadow-lg w-full object-cover"
//               />
//             </div>
//             <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
//               <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Send Messages with a Clear Call to Action</h3>
//               <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                 Boost customer engagement by sending direct messages that include powerful Calls to Action (CTAs) through our platform. Track the effectiveness of each message with real-time analytics.
//               </p>
//             </div>
//           </div>

//           {/* Feature 2 - Inverse Layout */}
//           <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start lg:space-x-8">
//             <div className="lg:w-1/2">
//               <Image
//                 src="/click-through-rate.webp"
//                 alt="Track Delivered and Click-Through Rates"
//                 width={500}
//                 height={300}
//                 className="rounded-xl shadow-lg w-full object-cover"
//               />
//             </div>
//             <div className="lg:w-1/2 lg:pr-12 text-left mt-6 lg:mt-0">
//               <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Track Delivered and Click-Through Rates</h3>
//               <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                 With MaaDiy, you can easily monitor the performance of your messages with *Delivered Rate* and *Click-Through Rate* tracking.
//               </p>
//             </div>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
//             <div className="lg:w-1/2">
//               <Image
//                 src="/import.png"
//                 alt="Bulk Upload Contacts via Excel Sheet"
//                 width={500}
//                 height={300}
//                 className="rounded-xl shadow-lg w-full object-cover"
//               />
//             </div>
//             <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
//               <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Bulk Upload Contacts via Excel Sheet</h3>
//               <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                 Easily upload an Excel sheet with your customer contact list into MaaDiy and send messages to all your contacts in just a few clicks.
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start lg:space-x-8">
//             <div className="lg:w-1/2">
//               <Image
//                 src="/whapi.png"
//                 alt="Track Delivered and Click-Through Rates"
//                 width={500}
//                 height={300}
//                 className="rounded-xl shadow-lg w-full object-cover"
//               />
//             </div>
//             <div className="lg:w-1/2 lg:pr-12 text-left mt-6 lg:mt-0">
//             <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Manage WhatsApp Conversations Directly on Our Platform</h3>
//               <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                 Access and manage your WhatsApp conversations directly within MaaDiy to stay organized and improve communication efficiency.
//               </p>
//             </div>
//           </div>
//           {/* Feature 5 */}
//           <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
//             <div className="lg:w-1/2">
//               <Image
//                 src="/analy.png"
//                 alt="Analyze Campaign Performance"
//                 width={500}
//                 height={300}
//                 className="rounded-xl shadow-lg w-full object-cover"
//               />
//             </div>
//             <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
//               <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>Analyze Campaign Performance and Optimize for Better ROI</h3>
//               <p className="mt-4 text-gray-700" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
//                 Track and analyze the performance of your marketing campaigns with detailed metrics to optimize for better ROI.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Buttons Section */}
//         <div className="mt-12">
//           <div className="flex justify-center space-x-4">
//             <a
//               href="#"
//               className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
//               style={{fontFamily: 'LeagueSpartan, sans-serif'}}
//             >
//               Free Trial
//             </a>
//             <a
//               href="#"
//               className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
//               style={{fontFamily: 'LeagueSpartan, sans-serif'}}
//             >
//               Get Demo
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import Image from "next/image";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-grey-800 text-center flex flex-col justify-center items-center">
        <div className="w-full" style={{backgroundColor:'#0470d5'}}>
          <video
            className="w-full h-auto max-h-[calc(75vh-80px)] object-contain"
            autoPlay
            muted
            loop
          >
            <source src="/MaadiyHome.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>


          {/* Get Started Button */}
          <div className="items-center mt-3">
            <a
              href="/signup"
              className="bg-green-400 text-white px-2 py-2 rounded getStart"
              style={{ fontFamily: 'LeagueSpartan, sans-serif' }}
            >
              Get Started
            </a>

            {/* No credit card required text */}
            <p className="mt-2 text-sm md:text-2xl text-blue-400">
              No credit card required for demo
            </p>
            <p className="mt-0 text-sm md:text-xl text-green-400">
              30 days money back guarantee
            </p>
          </div>
      </section>

      {/* Features Section */}
      <section className="p-8 md:p-20 text-center" id="features">
        <div className="bg-blue-100 rounded-lg shadow-lg px-4 py-2 md:px-8 md:py-6">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-600" style={{ fontFamily: 'LeagueSpartan, sans-serif' }}>
            Features
          </h2>
        </div>

        <div className="mt-12 space-y-16">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/themadiy.png"
                alt="Send Messages with a Clear Call to Action"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900"  >Send Messages with a Clear Call to Action</h3>
              <p className="mt-4 text-gray-700"  >
                Boost customer engagement by sending direct messages that include powerful Calls to Action (CTAs) through our platform. Track the effectiveness of each message with real-time analytics.
              </p>
            </div>
          </div>

          {/* Feature 2 - Inverse Layout */}
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/click-through-rate.webp"
                alt="Track Delivered and Click-Through Rates"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900"  >Track Delivered and Click-Through Rates</h3>
              <p className="mt-4 text-gray-700"  >
                With MaaDiy, you can easily monitor the performance of your messages with *Delivered Rate* and *Click-Through Rate* tracking.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/import.png"
                alt="Bulk Upload Contacts via Excel Sheet"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900"  >Bulk Upload Contacts via Excel Sheet</h3>
              <p className="mt-4 text-gray-700"  >
                Easily upload an Excel sheet with your customer contact list into MaaDiy and send messages to all your contacts in just a few clicks.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/whapi.png"
                alt="Track Delivered and Click-Through Rates"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-12 text-left mt-6 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-900"  >Manage WhatsApp Conversations Directly on Our Platform</h3>
              <p className="mt-4 text-gray-700"  >
                Access and manage your WhatsApp conversations directly within MaaDiy to stay organized and improve communication efficiency.
              </p>
            </div>
          </div>
          {/* Feature 5 */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <div className="lg:w-1/2">
              <Image
                src="/analy.png"
                alt="Analyze Campaign Performance"
                width={500}
                height={300}
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 text-left mt-6 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900"  >Analyze Campaign Performance and Optimize for Better ROI</h3>
              <p className="mt-4 text-gray-700"  >
                Track and analyze the performance of your marketing campaigns with detailed metrics to optimize for better ROI.
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
               
            >
              Free Trial
            </a>
            <a
              href="#"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
               
            >
              Get Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}