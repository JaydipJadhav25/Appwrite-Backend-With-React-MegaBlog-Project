import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authservices from './Appwriter/auth';
import { login, logout } from './store/authSlice';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';




function App() {
  const[loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    //check user login or not
    authservices.getCurrentUser()
    .then((userData) =>{

      if(userData){
        // update in current state
        dispatch(login({userData}));

      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
    



  },[]);

  // checking reverse
  return !loading ? (
    <div className='min-h-scren flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header/>
    <main>

    </main>
    <Footer/>
    </div>
    </div>
  ) : null


}

export default App
