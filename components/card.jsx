import React from "react";

export default function Card() {
  return (
    <>
      <div className="relative text-center mb-12">
        <div className="inline-block bg-blue-100 text-blue-700 px-8 py-4 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold" style={{fontFamily: 'LeagueSpartan, sans-serif'}}>
            PRICING
          </h1>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          paddingBottom: 50,
          justifyContent: "center",
          marginTop: 50,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="parent">
          <div className="card">
            <div className="logo">
              <span className="circle circle1"></span>
              <span className="circle circle2"></span>
              <span className="circle circle3"></span>
              <span className="circle circle4"></span>
              <span className="circle circle5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 29.667 31.69"
                  className="svg"
                >
                  <path
                    id="Path_6"
                    data-name="Path 6"
                    d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
                    transform="translate(0 0)"
                  ></path>
                  <path
                    id="Path_7"
                    data-name="Path 7"
                    d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
                    transform="translate(-45.91 0)"
                  ></path>
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
                    transform="translate(0 -51.963)"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="glass"></div>
            <div className="content">
              <div style={{ padding: 20, position: "relative", top: -40 }}>
                <h5 style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="mb-4 text-center text-xl font-medium text-gray-500 dark:text-black-400">
                  Standard plan
                </h5>
                <div className="flex items-baseline justify-center text-gray-900 dark:text-white">
                  <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="text-3xl font-semibold">$</span>
                  <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="text-5xl font-extrabold tracking-tight">
                    49
                  </span>
                  <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      2 team members
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      20GB Cloud storage
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      Integration help
                    </span>
                  </li>
                  <li className="flex items-center line-through decoration-gray-500">
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500">
                      Sketch Files
                    </span>
                  </li>
                  <li className="flex items-center line-through decoration-gray-500">
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500">
                      API Access
                    </span>
                  </li>
                  <li className="flex items-center line-through decoration-gray-500">
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500">
                      Complete documentation
                    </span>
                  </li>
                  <li className="flex items-center line-through decoration-gray-500">
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span style={{fontFamily: 'LeagueSpartan, sans-serif'}} className="ml-3 text-base font-normal leading-tight text-gray-500">
                      24×7 phone & email support
                    </span>
                  </li>
                </ul>
                {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full">Choose plan</button> */}
              </div>
            </div>
            <div className="bottom">
              <div className="social-buttons-container">
                <button className="social-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm  w-full">
                  <div
                    style={{fontFamily: 'LeagueSpartan, sans-serif'}}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                  >
                    Choose plan
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
