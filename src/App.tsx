import { useState } from 'react';
import './App.css';
import MyDrawer from './components/Drawer';

function App() {
  document.title = 'Bits of Crypto';

  const [cipherName, setCipherName] = useState('Affine');

  return (
    <div className="background">
      <MyDrawer Name={cipherName} SetCipherName={setCipherName} />
    </div>
  );
}

export default App;
