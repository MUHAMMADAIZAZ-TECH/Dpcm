import React from 'react';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';


const Contact = () => {

  return (
    <div className='bg-no-repeat bg-cover' style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' }}>
      <div bg="dark" className='nav-bar bg-none  ' >
        <Navbar/>
      </div>
      <div className="mx-36 my-28 flex flex-col">
        <h2 className='text-white text-5xl'>Contact Us</h2>
        <h3 className='text-white text-3xl'>Arsalan Ahmad</h3>
        <h3 className='text-white text-3xl'>ahmadarsalan555666@gmail.com</h3>
        <h3 className='text-white text-3xl'>Samanbad Lahore</h3>
        <h3 className='text-white text-3xl'>03174461352</h3>
      </div>
    </div>
  )
}
export default Contact;
