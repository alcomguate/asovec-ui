import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ReadInmueble from './features/inmuebles/pages/InmuebleReadPage';
import UpdateInmueble from './features/inmuebles/pages/InmuebleUpdatePage';
import CreateInmueble from './features/inmuebles/pages/InmuebleCreatePage';
import Sidebar from './layouts/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div class="App">
        <Sidebar />
        <div style={{ marginLeft: "260px", padding: "20px" }}>
          <Routes>
            <Route path="/inmueble/" element={<ReadInmueble />} />
            <Route path="/inmueble/create" element={<CreateInmueble />} />
            <Route path="/inmueble/update/:id" element={<UpdateInmueble />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
