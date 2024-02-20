import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import ContactUs from "../components/ContactUs"
import Content from "../components/Content"

function Home() {
  return (
    <>
        <Hero />
        <Features />
        <Content/>
        <Testimonials />
        <ContactUs />
        <Footer />
    </>
  )
}

export default Home