import React from "react";

function Testimonials() {
  return (
    <section
//     style={{backgroundImage: "url('/gradient.svg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}    
     className="py-12 text-blue-900 sm:py-16 lg:py-20 lg:00px]">
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="  flex flex-col items-center">
          <div className="relative text-center">
            <p className=" text-lg font-medium text-blue-600">Testimonials</p>
            <span className="absolute lg:-left-20 -top-0 left-20 text-2xl    lg:text-7xl">
              <svg
                className="text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl xl:text-5xl">
              Our Awesome Clients
            </h2>
          </div>

          <div className="order-3 mt-8 text-center md:mt-16">
            <button className="mb-20 rounded-lg border-2 border-blue-700 bg-blue-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">
              More reviews on company profile
            </button>
          </div>

          <div className="relative mx-auto mt-20 grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
            <div className="flex flex-col rounded-xl border border-blue-600 text-center shadow-xl shadow-blue-200 bg-white" >
              <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
              
                <div className="flex-1">
                  <p className="border-blue-500 px-10 text-xl font-black">
                    Absolutely recommended!
                  </p>

                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-blue-900 ">
                      I purchased a phone from an e-commerce site, and this
                      courier service provider assisted me in getting it
                      delivered to my home. I received my phone within one day,
                      and I was really satisfied with their service when I
                      received it.
                    </p>
                  </blockquote>
                </div>

                <div className="-mx-5 mt-8 px-8 py-1">
                  <div>
                    <p className="text-base font-bold">Khalif Kairo</p>
                    <p className="mt-0.5 text-sm">Kai and Karo Motors</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-blue-600 text-center shadow-xl bg-white shadow-blue-200">
              <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                
                <div className="flex-1">
                  <p className="border-blue-500 px-10 text-xl font-black">
                    Service was amazing!
                  </p>

                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-blue-900">
                      I had a great experience with this courier service
                      provider. I received my parcel within 2 days. I would
                      recommend this service to everyone.
                    </p>
                  </blockquote>
                </div>

                <div className="-mx-5 mt-8 px-8 py-1">
                  <div>
                    <p className="text-base font-bold">Polo Kimani</p>
                    <p className="text-blue-90 mt-0.5 text-sm">
                      Twitter Personality
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-blue-600 text-center shadow-xl bg-white shadow-blue-200">
              <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
             
                <div className="flex-1">
                  <p className="border-blue-500 px-10 text-xl font-black">
                    Saved me 1000s of hours
                  </p>

                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-blue-900">
                      I was in a hurry to get my parcel delivered to my friend's
                      place. I was really worried about the time it would take
                      to get it delivered. But this courier service provider
                      saved me a lot of time. I received my parcel within 2
                      days.
                    </p>
                  </blockquote>
                </div>

                <div className="-mx-5 mt-8 px-8 py-1">
                  <div>
                    <p className="text-base font-bold">Eve Maina</p>
                    <p className="text-blue-90 mt-0.5 text-sm">
                      Manly Man Services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
