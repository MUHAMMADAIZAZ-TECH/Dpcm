import React from 'react';
import backgroundImg from '../assets/background1.png';
import Navbar from '../components/common/Navbar';
import MobileNavbar from '../components/common/MobileNavbar';
import { useMediaQuery } from '@react-hook/media-query';

const Service = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <div className='bg-no-repeat bg-cover flex flex-col min-h-screen' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="nav-bar bg-none">
        {isLargeScreen ? <Navbar /> : <MobileNavbar />}
      </div>
      <div className='flex flex-col flex-grow'>
        <h2 className='flex justify-center text-white'>OUR SERVICES</h2>
        <div className='flex flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0 lg:p-8 lg:ml-8'>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg lg:h-44'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
        </div>
        <div className='flex flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0 lg:p-8 lg:ml-8'>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg lg:h-44'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Root Canal</p>
            <p>lorem epsum inda kataiw yowye epsaa aboota lurey viaya seeya woin pyas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
