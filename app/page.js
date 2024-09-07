import Image from "next/image";
import Navbar from '../components/Navbar';
import Home from "../components/Home";
import AboutUs from "../components/About";
import Footer from "../components/Footer";
import FAQs from "@/components/FAQs";
import PricingCard from "../components/card";
export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Home />
      <PricingCard />
      <AboutUs />
      {/* <ContactUs /> */}
      <FAQs />
      <Footer />
    </div>
  );
}
