import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorDental = ({ patientId }) => {
	const [dentalChart, setDentalChart] = useState([
		{ toothNumber: 1, treatments: [] },
		{ toothNumber: 2, treatments: [] },
		// Add more teeth as needed
	]);

	const handleAddTreatment = (toothNumber, treatment) => {
		const updatedChart = dentalChart.map((tooth) => {
			if (tooth.toothNumber === toothNumber) {
				return {
					...tooth,
					treatments: [...tooth.treatments, treatment],
					newTreatment: "",
				};
			}
			return tooth;
		});
		setDentalChart(updatedChart);
	};

	const handleSaveChart = () => {
		axios
			.put(`/api/patients/${patientId}/dental-chart`, dentalChart)
			.then((response) => {
				console.log("Dental chart saved successfully:", response.data);
			})
			.catch((error) => {
				console.error("Error saving dental chart:", error);
			});
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/doctorlogin", { replace: true });
	};

	const gotoDashboard = () => {
		navigate("/dashboard/doctors");
	};
	const gotoMedical = () => {
		navigate("/dashboard/doctormedical");
	};

	const gotoTreatment = () => {
		navigate("/dashboard/doctortreat");
	};

	return (
		<div
			className="bg-no-repeat bg-cover flex"
			style={{ backgroundImage: `url(${backgroundImg})`, height: "100vh" }}>
			<div className="w-1/4 bg-cyan-950 flex flex-col ">
				<img
					src={Logo}
					style={{ height: "300px", width: "300px" }}
					className="ml-12"
				/>
				<div className="w-full h-12 text-white flex flex-col text-center pt-2">
					<div
						className="bg-gray-700 border-b-2 border-gray-500 border-t-2 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoDashboard()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400 "
						onClick={() => gotoTreatment()}>
						<h4 className="mt-2">Treatment Plan</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoMedical()}>
						<h4 className="mt-2 mr-2">Medical History</h4>
					</div>
					<div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer">
						<h4 className="mt-2">Dental Chart</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
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

				<div>
					<h2 className="text-2xl font-bold mb-4 text-white ml-8 mt-12">
						Dental Chart
					</h2>
					<div className="grid grid-cols-10 gap-2">
						{dentalChart.map((tooth) => (
							<div
								key={tooth.toothNumber}
								className="col-span-1 bg-transparent border-2 border-black backdrop-blur-xl shadow-lg rounded-lg text-white p-2 text-center">
								<div className="font-bold text-lg">{tooth.toothNumber}</div>
								<ul className="mt-2">
									{tooth.treatments.map((treatment, index) => (
										<li key={index}>{treatment}</li>
									))}
								</ul>
								<div className="mt-2">
									<input
										type="text"
										placeholder="Add Treatment"
										className="border border-gray-300 text-black rounded-md px-2 py-1 w-full"
										value={tooth.newTreatment}
										onChange={(e) => {
											const updatedChart = dentalChart.map((t) => {
												if (t.toothNumber === tooth.toothNumber) {
													return {
														...t,
														newTreatment: e.target.value,
													};
												}
												return t;
											});
											setDentalChart(updatedChart);
										}}
									/>
									<button
										className="px-3 py-1 bg-cyan-800 hover:bg-cyan-900 text-white rounded-md ml-2"
										onClick={() =>
											handleAddTreatment(tooth.toothNumber, tooth.newTreatment)
										}>
										Add
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="mt-4">
						<button
							className="px-4 py-2 bg-cyan-900 hover:bg-cyan-950 text-white rounded-md ml-12"
							onClick={handleSaveChart}>
							Save Chart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDental;
