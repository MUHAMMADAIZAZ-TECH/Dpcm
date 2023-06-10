import React, { useState, useEffect } from 'react'
import backgroundImg from '../../../../assets/background1.png'
import Logo from '../../../../assets/logo3.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminFinance = () => {


  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    // Fetch financial data from the backend
    axios.get('/api/finance')
      .then(response => {
        const fetchedData = response.data;
        setFinancialData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching financial data:', error);
      });
  }, []);


  const navigate = useNavigate();
 
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

  const gotoAdminDashboard = () => {
    navigate('/dashboard/admin')
  }

  const gotoDoctor = () => {
    navigate('/dashboard/admindoctor')
  }

  const gotoPatient = () => {
    navigate('/dashboard/adminpatient')
  }

  const gotoAppoint = () => {
    navigate('/dashboard/adminappoint')
  }

  return (
    <div className='bg-no-repeat bg-cover flex' style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' }}>
      <div className='w-1/4 bg-cyan-950 flex flex-col '>
        <img src={Logo} style={{ height: '300px', width: '300px' }} className='ml-12' />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div className="bg-gray-700  border-b-2 border-gray-800 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoAdminDashboard()}>
            <h4 className='mt-2' >Dashboard</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoPatient()}>
            <h4 className=" mt-2" >Patient</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDoctor()}>
            <h4 className="mt-2 mr-2" >Doctor</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800 border-b-2 border-gray-500 cursor-pointer "  >
            <h4 className="mt-2 mr-2">Finance</h4>
          </div>
          <div className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoAppoint()}>
            <h4 className="mt-2 mr-2" >Appointment</h4>
          </div>
        </div>
      </div>
      <div className='w-3/4 bg-none'>
        <div className='bg-white text-black h-12 flex'>
        <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
        ADMIN DASHBOARD
      </h2>
      <h5 className="absolute right-32 mt-2 text-xl uppercase">
      Welcome 
    </h5>
          <button className='absolute right-2 mt-1 rounded-full hover:bg-cyan-950 bg-cyan-900 w-24 h-8 text-white' onClick={handleLogout}>Log Out</button>
          <h5></h5>
        </div>


        
        <div className="p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Finance</h2>
  
        {financialData ? (
          <div className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Financial Summary</h3>
            <p className="text-gray-700">Total Revenue: ${financialData.totalRevenue}</p>
            <p className="text-gray-700">Total Expenses: ${financialData.totalExpenses}</p>
            <p className="text-gray-700">Net Profit: ${financialData.netProfit}</p>
          </div>
        ) : (
          <p>Loading financial data...</p>
        )}
      </div>

      </div>
    </div>
  )
}

export default AdminFinance