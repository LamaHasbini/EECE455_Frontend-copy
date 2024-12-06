import '../styles/HomePage.css'; 

function HomePage() {
  return (
    <div className="home-container">
      <h1> BitsOfCrypto </h1>
      <div className="cipher-buttons">
        <button onClick={() => window.location.href = "/affine"}>Affine Cipher</button>
        <button onClick={() => window.location.href = "/monoalphabetic"}>Mono-Alphabetic Cipher</button>
        <button onClick={() => window.location.href = "/vigenere"}>Vigenere Cipher</button>
        <button onClick={() => window.location.href = "/hill"}>Hill Cipher</button>
        <button onClick={() => window.location.href = "/playfair"}>Playfair Cipher</button>
        <button onClick={() => window.location.href = "/extendedgcd"}>Extended GCD</button>
      </div>
    </div>
  );
}

export default HomePage;