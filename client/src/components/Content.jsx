
function Content() {
  return (
    <section className=' bg-blue-300/20'>   
        <h1 className=' text-center pt-10 lg:text-5xl text-3xl font-bold text-blue-500'>
        FASTEST DELIVERY            </h1>
        <p className=" text-center p-5 text-gray-500/90">You can get your valuable item in the fastest period of<br/>

time with safety. Because your emergency

is our first priority</p>             
    <div>
          <video
                    src='/adv.mp4'
                    loop={true}                    
                    autoPlay
                    muted
                    className=' w-screen  h-full mt-5 lg:mt-0 '
                />
    </div>
    </section>
  )
}

export default Content