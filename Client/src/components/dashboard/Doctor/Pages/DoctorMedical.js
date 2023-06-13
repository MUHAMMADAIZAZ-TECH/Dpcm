import React, { useState } from 'react'
import backgroundImg from '../../../../assets/background1.png'
import Logo from '../../../../assets/logo3.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DoctorMedical = () => {

  const [patientId, setPatientId] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [newRecord, setNewRecord] = useState('');

  const handleFetchMedicalHistory = () => {
    axios
      .get(`/api/patients/${patientId}/medical-history`)
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medical history:', error);
      });
  };

  const handleAddRecord = () => {
    axios
      .post(`/api/patients/${patientId}/medical-history`, { description: newRecord })
      .then((response) => {
        console.log('Record added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding record:', error);
      });
  };


  const navigate = useNavigate();
  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/doctorlogin", { replace: true });
	};

  const gotoDashboard = () => {
    navigate('/dashboard/doctors')
  }
  const gotoTreatment = () => {
    navigate('/dashboard/doctortreat')
  }

  const gotoDental = () => {
    navigate('/dashboard/doctordental')
  }
  const gotoxray = () =>{
		window.open("https://huggingface.co/spaces/Arslan7788/DPCM",'_blank')
	}

  return (
    <div className='bg-no-repeat bg-cover flex' style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' }}>
      <div className='w-1/4 bg-cyan-950 flex flex-col '>
        <img src={Logo} style={{ height: '300px', width: '300px' }} className='ml-12' />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div className="bg-gray-700 border-b-2 border-gray-500 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDashboard()}>
            <h4 className='mt-2'>Dashboard</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400 " onClick={() => gotoTreatment()}>
            <h4 className="mt-2">Treatment Plan</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
            <h4 className="mt-2 mr-2">Medical History</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDental()}>
            <h4 className="mt-2">Dental Chart</h4>
          </div>
          <div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoxray()}>
						<h4 className="mt-2">Dental X-ray (ML model)</h4>
					</div>
        </div>
      </div>
      <div className='w-3/4 bg-none'>
      <div className="bg-white text-black h-12 flex">
      <h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
        DOCTOR DASHBOARD
      </h2>
      <h5 className="absolute right-32 mt-2 text-xl uppercase">Welcome</h5>
      <button
      className="absolute right-4 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
        onClick={handleLogout}>
        Log Out
      </button>
      <h5></h5>
    </div>


        <div className='text-white mt-12 ml-80'>
          <h2 className='ml-60 mb-12' >Medical History</h2>
          <div className='flex '>
            <div className='flex flex-col w-1/2 mb-10'>
              <input
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className='text-black w-2/4 h-10 mb-3 mt-1 rounded-lg text-center'
              />
              <button onClick={handleFetchMedicalHistory} className='bg-cyan-800 w-2/4 hover:bg-cyan-900 h-10 rounded-lg'>View Medical History</button>
            </div>

            {medicalHistory.length > 0 && (
              <div>
                <h3>Patient ID: {patientId}</h3>
                <ul>
                  {medicalHistory.map((record) => (
                    <li key={record.id}>{record.description}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className='flex flex-col w-1/2'>
              <input
                type="text"
                placeholder="Enter Medical Record"
                value={newRecord}
                onChange={(e) => setNewRecord(e.target.value)}
                className='text-black w-2/4 h-10 rounded-md text-center'
              />
              <button onClick={handleAddRecord} className='bg-cyan-800 hover:bg-cyan-900 w-2/4 h-10 mt-3 rounded-lg'>Add Medical Record</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorMedical