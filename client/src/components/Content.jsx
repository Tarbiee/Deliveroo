import adv from '../assets/adv.mp4'

function Content() {
  return (
    <section className=' bg-blue-300/20'>  
    <div 
     style={{backgroundImage: "url('/Background.png')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   }} > 
        <h1 className=' text-center pt-10 lg:text-5xl text-3xl font-bold text-blue-900'>
        FASTEST DELIVERY            </h1>
        <p className=" text-center p-5 text-gray-500/90">You can get your valuable item in the fastest period of<br/>

time with safety. Because your emergency

is our first priority</p>             
    <div className="flex justify-center items-center w-full">
          <video
                    src={adv}
                    loop={true}                    
                    autoPlay
                    muted
                    className=' lg:w-3/4 w-full h-30 mt-5 lg:mt-0 '
                />
    </div>
    </div>
    </section>
  )
}

export default Content