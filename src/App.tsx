import { useState } from 'react'
import './App.css'
import MyDrawer from './components/Drawer'

function App() {
	document.title = 'Bits of Crypto'

  const [cipher_name, ChangeCipher] = useState("Affine")

	return (
		<>
    <div className='background'>
			<MyDrawer Name={cipher_name} change={ChangeCipher} />
      </div>
		</>
	)
}

export default App
