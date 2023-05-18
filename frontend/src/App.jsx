import { useState } from 'react'
import Layout from './Layout'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Layout />
      <ToastContainer />
    </>
  )
}

export default App
