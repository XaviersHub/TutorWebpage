import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/6794e6183a8427326074c494/1iieq5k46";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append script to document body
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // The component does not render anything visible
};

export default Chatbot;
