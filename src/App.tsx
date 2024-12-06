// import { useState } from 'react';
// import './App.css';
// import MyDrawer from './components/Drawer';
// import Affine from './pages/AffineCipherPage';
// import MonoAlphabetic from './pages/MonoAlphabeticPage';
// import Vigenere from './pages/VigenerePage';
// import Hill from './pages/HillCipherPage';
// import Playfair from './pages/PlayfairPage';
// import ExtendedGCD from './pages/EuclidPage';

// function App() {
//   document.title = 'Bits of Crypto';

//   const [cipherName, setCipherName] = useState('Affine');

//   const RenderCipherPage = () => {
//     switch (cipherName) {
//       case 'Affine':
//         return <Affine />;
//       case 'Mono-Alphabetic':
//         return <MonoAlphabetic />;
//       case 'Vigenere':
//         return <Vigenere />;
//       case 'Hill':
//         return <Hill />;
//       case 'Playfair':
//         return <Playfair />;
//       case 'Extended GCD':
//         return <ExtendedGCD />;
//       default:
//         return <Affine />;
//     }
//   }

//   return (
//     <>
//       <div className="background">
//         <div className="container">
//           <MyDrawer SetCipherName={setCipherName} />
//           <div className="cipher-page">
//             {RenderCipherPage()}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MyDrawer from './components/Drawer';
import Affine from './pages/AffineCipherPage';
import MonoAlphabetic from './pages/MonoAlphabeticPage';
import Vigenere from './pages/VigenerePage';
import Hill from './pages/HillCipherPage';
import Playfair from './pages/PlayfairPage';
import ExtendedGCD from './pages/EuclidPage';
import HomePage from './pages/HomePage';

function App() {
  document.title = 'Bits of Crypto';

  return (
    <Router>
      <div className="background">
        <div className="container">
          <MyDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/affine" element={<Affine />} />
            <Route path="/monoalphabetic" element={<MonoAlphabetic />} />
            <Route path="/vigenere" element={<Vigenere />} />
            <Route path="/hill" element={<Hill />} />
            <Route path="/playfair" element={<Playfair />} />
            <Route path="/extendedgcd" element={<ExtendedGCD />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;