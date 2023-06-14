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
            <p>Root canal treatment is a treatment sequence for the infected pulp of a tooth which is intended to result in the elimination of infection and the protection of the decontaminated tooth from future microbial invasion.</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Alignment teeth </p>
            <p>Occlusion refers to the alignment of teeth and the way that the upper and lower teeth fit together (bite). The upper teeth should fit slightly over the lower teeth. The points of the molars should fit the grooves of the opposite molar.</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
          <p>Cosmetic teeth</p>
            <p>Cosmetic dentistry is generally used to refer to any dental work that improves the appearance of teeth, gums and/or bite. It primarily focuses on improvement in dental aesthetics in color, position, shape, size, alignment and overall smile appearance</p>
        </div>
        </div>
        <div className='flex flex-col space-y-4 p-4 lg:flex-row lg:space-x-4 lg:space-y-0 lg:p-8 lg:ml-8'>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg lg:h-44'>
            <p>oral hygiene</p>
            <p>Oral hygiene is the practice of keeping one's oral cavity clean and free of disease and other problems by regular brushing of the teeth and adopting good hygiene habits. It is important that oral hygiene be carried out on a regular basis to enable prevention of dental disease and bad breath. </p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Live advisory</p>
            <p>An advisory is an official announcement or report that warns people about bad weather, diseases, or other dangers or problems. [US]. 26 states have issued .</p>
          </div>
          <div className='flex flex-col text-center bg-gray-300 justify-center hover:bg-white cursor-default rounded-lg'>
            <p>Cavity Inspection</p>
            <p>Body Cavity Inspection — a visual, manual or instrument internal inspection of body. cavities for contraband (prohibited materials) such as illegal drugs, money, jewelry, or weapons. This type of inspection/search is far more invasive than the standard strip search performed at the time of incarceration in the jail.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
