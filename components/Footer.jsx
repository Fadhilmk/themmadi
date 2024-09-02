// components/Footer.jsx
const Footer = () => {
    return (
      <footer className="pt-1 pb-4 h-6" style={{background:'#2c8ffa'}}>
          <p className="text-white text-center text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
      </footer>
    );
  };
  
export default Footer;