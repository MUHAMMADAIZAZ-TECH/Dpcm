import React, { useState, useEffect } from 'react'
import backgroundImg from '../../../../assets/background1.png'
import Logo from '../../../../assets/logo3.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DoctorTreat = ({ patientId }) => {

  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch the list of patients from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the treatment plan object
    const newTreatmentPlan = {
      patientId,
      diagnosis,
      medication,
      instructions
    };

    try {
      // Send a POST request to create a new treatment plan
      const response = await axios.post('/api/treatment-plans', newTreatmentPlan);
      console.log('Created treatment plan:', response.data);
    } catch (error) {
      console.error('Error creating treatment plan:', error);
    }
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
  const gotoMedical = () => {
    navigate('/dashboard/doctormedical')
  }

  const gotoDental = () => {
    navigate('/dashboard/doctordental')
  }


  return (
    <div className='bg-no-repeat bg-cover flex' style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh' }}>
      <div className='w-1/4 bg-cyan-950 flex flex-col '>
        <img src={Logo} style={{ height: '300px', width: '300px' }} className='ml-12' />
        <div className="w-full h-12 text-white flex flex-col text-center pt-2">
          <div className="bg-gray-700 border-b-2 border-gray-500 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDashboard()}>
            <h4 className='mt-2'>Dashboard</h4>
          </div>
          <div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer ">
            <h4 className="mt-2">Treatment Plan</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoMedical()}>
            <h4 className="mt-2 mr-2">Medical History</h4>
          </div>
          <div className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400" onClick={() => gotoDental()}>
            <h4 className="mt-2">Dental Chart</h4>
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


        <form className="text-white flex flex-col w-1/2 ml-80 text-center mt-24" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="patient">Select Patient</label>
            <select
              id="patient"
              className=" text-black rounded-lg px-3 py-2"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4" >
            <label htmlFor="diagnosis" className="mb-2">
              Enter Diagnosis
            </label>
            <input
              type="text"
              id="diagnosis"
              className="text-black rounded-lg px-3 py-2 "
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="medication" className="mb-2">
              Enter Medication
            </label>
            <input
              type="text"
              id="medication"
              className="text-black rounded-lg px-3 py-2"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="instructions" className="mb-2">
              Enter Instructions
            </label>
            <textarea
              id="instructions"
              className="text-black rounded-lg px-3 py-2"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg px-4 py-2">
            Create Treatment Plan
          </button>
        </form>

      </div>
    </div>
  )
}

export default DoctorTreat