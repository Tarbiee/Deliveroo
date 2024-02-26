import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import ContactUs from "../components/ContactUs"
import Content from "../components/Content"
import NavBar from "../components/NavBar"

function Home() {
  return (
    <div className="homepage">
      <NavBar/>
        <Hero />
        <Features />
        <Content/>
        <Testimonials />
        <ContactUs />
        <Footer />
    </div>
    
    
  )
}
export default Home