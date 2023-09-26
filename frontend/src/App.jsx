import { useEffect, useState } from 'react'
import Layout from './Layout'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUser } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getUser())
  }, [dispatch])
  return (
    <>
      <Layout />
      <ToastContainer />
    </>
  )
}

export default App
