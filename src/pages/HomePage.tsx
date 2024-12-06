import Timeline from "./Timeline";
import "../styles/HomePage.css";

const HomePage = () => {
  const events = [
    { date: "1900BCE", label: "Mono-Alphabetic", link: "/monoalphabetic" },
    { date: "1553", label: "Vigenere Cipher", link: "/vigenere" },
    { date: "1700s", label: "Affine Cipher", link: "/affine" },
    { date: "1800s", label: "Extended GCD", link: "/extendedgcd" },
    { date: "1854", label: "Playfair Cipher", link: "/playfair" },
    { date: "1929", label: "Hill Cipher", link: "/hill" },
  ];

  return (
    <div className="homepage-container">
      <img src="./src/assets/wheel.png" alt="Logo" style={{ width: '300px', height: 'auto' }}/>
      <h1 style={{ fontSize: '56px' }}>BitsOfCrypto</h1>
      <Timeline events={events} />
    </div>
  );
};

export default HomePage;