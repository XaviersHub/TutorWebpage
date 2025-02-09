import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/6794e6183a8427326074c494/1iieq5k46";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default Chatbot;
