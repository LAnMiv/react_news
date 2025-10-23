import { useState } from 'react'
import Header from './components/header/Header'
import Main from './pages/Main/Main'

function App() {
	return (
		<>
			<Header />
			<div className='container'>
				<Main />
			</div>
		</>
	)
}

export default App
