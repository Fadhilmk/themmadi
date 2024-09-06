import Image from "next/image";
import Navbar from '../components/Navbar';
import Home from "../components/Home";
import AboutUs from "../components/About";
import ContactUs from "../components/Contact";
import Footer from "../components/Footer";
import Card from "../components/card";
import FAQs from "@/components/FAQs";
export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Home />
      <Card />
      <AboutUs />
      {/* <ContactUs /> */}
      <FAQs />
      <Footer />
    </div>
  );
}
