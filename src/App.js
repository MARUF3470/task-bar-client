
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/Route';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import { toogleDarkMode } from './components/context/features/darkModeSlice';


function App() {

  return (
    <div>
      <Toaster></Toaster>
      {/* <button onClick={() => dispatch(toogleDarkMode())}>Dark Mode</button> */}
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
