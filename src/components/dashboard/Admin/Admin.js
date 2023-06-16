import React, { useState } from "react";
import backgroundImg from "../../../assets/background1.png";
import Logo from "../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import { Config } from "../../../config";
const Admin = () => {
	const [selectedAction, setSelectedAction] = useState("");
	const [patientName, setPatientName] = useState("");
	const [medicalCondition, setMedicalCondition] = useState("");
	const [prescriptions, setPrescriptions] = useState("");
	const [patientId, setPatientId] = useState("");
	const [message, setMessage] = useState("");

	const [adminDetails, setAdminDetails] = useState({
		name: "",
		age: "",
		email: "",
		password: "",
		contact: "",
		address: "",
		gender: "",
		qualification: "",
		salary: "",
	});

	const handleAdminInputChange = (event) => {
		const { name, value } = event.target;
		setAdminDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleUpdateAdmin = async () => {
		try {
			const response = await axios.put(
				`${Config}api/admin`,
				adminDetails,
			);
			console.log(response.data);
			setMessage("Admin updated successfully");
			// Reset the form fields if needed
		} catch (error) {
			console.error(error.response.data);
			setMessage("Failed to update admin");
		}
	};

	const handleAddMedicalHistory = async () => {
		try {
			const response = await axios.post(`${Config}api/`, {
				name: patientName,
				medicalcondition: medicalCondition,
				prescription: prescriptions,
			});
			console.log(response.data);
			setMessage("patient added successfully");
			// Reset the form fields
		} catch (error) {
			console.error(error.response.data);
			setMessage("Failed to add patient");
		}
	};

	const handleInputChange = (event) => {
		setPatientId(event.target.value);
	};

	const handleRemoveMedicalHistory = async () => {
		try {
			const response = await axios.delete(
				`${Config}api/${patientId}`,
			);
			console.log(response.data);
			setMessage("medical history removed");
		} catch (error) {
			console.error(error.response.data);
			setMessage("Unable to remove medical history");
		}
	};

	const handleUpdateMedicalHistory = async () => {
		try {
		} catch (error) {}
	};

	const handleViewMedicalHistory = async () => {
		try {
		} catch (error) {}
	};

	const handleActionChange = (action) => {
		setSelectedAction(action);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedAction === "add") {
			handleAddMedicalHistory();
		} else if (selectedAction === "update") {
			handleUpdateMedicalHistory();
		} else if (selectedAction === "view") {
			handleViewMedicalHistory();
		} else if (selectedAction === "remove") {
			handleRemoveMedicalHistory();
		}

		// Reset the form fields
		setSelectedAction("");
	};

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/adminlogin", { replace: true });
	};

	const gotoPatient = () => {
		navigate("/dashboard/adminpatient");
	};
	const gotoDoctor = () => {
		navigate("/dashboard/admindoctor");
	};

	const gotoFinance = () => {
		navigate("/dashboard/adminfinance");
	};

	const gotoAppoint = () => {
		navigate("/dashboard/adminappoint");
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
					<div className="bg-gray-400 text-gray-800 border-b-2 border-gray-500 border-t-2">
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoPatient()}>
						<h4 className=" mt-2">Patient</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center  border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoDoctor()}>
						<h4 className="mt-2 mr-2">Doctor</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoFinance()}>
						<h4 className="mt-2 mr-2">Finance</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoAppoint()}>
						<h4 className="mt-2 mr-2">Appointment</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
				<div className="bg-white text-black h-12 flex">
					<h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
						ADMIN DASHBOARD
					</h2>
					<h5 className="absolute right-48 mt-2 text-xl uppercase">Welcome</h5>
					<button
						className="absolute right-20 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
						onClick={handleLogout}>
						Log Out
					</button>
					<div
						className="absolute top-1 right-4 cursor-pointer"
						onClick={() => handleActionChange("updateAdmin")}>
						<Avatar
							src="https://via.placeholder.com/40"
							size={40}
							round={true}
						/>
					</div>
				</div>

				<div className="flex flex-col text-center">
					{selectedAction == "updateAdmin" && (
						<form onSubmit={handleUpdateAdmin} className="space-y-4 mb-4">
							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="name"
										className="block font-medium text-white">
										Enter Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={adminDetails.name}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block font-medium text-white">
										Enter Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={adminDetails.email}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>
							</div>

							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="password"
										className="block font-medium text-white">
										Enter Password
									</label>
									<input
										type="password"
										id="password"
										name="password"
										value={adminDetails.password}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>

								<div>
									<label
										htmlFor="contact"
										className="block font-medium text-white">
										Enter Contact
									</label>
									<input
										type="number"
										id="contact"
										name="contact"
										value={adminDetails.contact}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>
							</div>

							<div className="flex w-full justify-center space-x-8">
								<div>
									<label
										htmlFor="gender"
										className="block font-medium text-white">
										Enter Gender
									</label>
									<input
										type="number"
										id="gender"
										name="gender"
										value={adminDetails.gender}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>

								<div>
									<label
										htmlFor="address"
										className="block font-medium text-white">
										Enter Address
									</label>
									<input
										type="text"
										id="address"
										name="address"
										value={adminDetails.address}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>
							</div>

							<div className="flex w-full justify-center space-x-8">
								<div>
									<label htmlFor="age" className="block font-medium text-white">
										Enter Age
									</label>
									<input
										type="number"
										id="age"
										name="age"
										value={adminDetails.age}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>

								<div>
									<label
										htmlFor="qualification"
										className="block font-medium text-white">
										Enter qualification
									</label>
									<input
										type="text"
										id="qualification"
										name="qualification"
										value={adminDetails.qualification}
										onChange={handleInputChange}
										className="border border-gray-300 p-2 rounded "
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="salary"
									className="block font-medium text-white">
									Enter Salary
								</label>
								<input
									type="number"
									id="salary"
									name="salary"
									value={adminDetails.salary}
									onChange={handleInputChange}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Save
							</button>
						</form>
					)}

					<h2 className="text-2xl font-semibold mb-4 text-white mt-10 ">
						Medical History
					</h2>
					<div className="mb-4">
						<div className="flex space-x-4 justify-center text-white">
							<button
								className={`py-2 px-4 rounded shadow-xl shadow-cyan-600 font-bold ${
									selectedAction === "add"
										? "bg-cyan-900"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("add")}>
								Add Medical History
							</button>

							<button
								className={`py-2 px-4 rounded ml-44 shadow-xl shadow-cyan-600 font-bold  ${
									selectedAction === "remove"
										? "bg-cyan-900"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("remove")}>
								Remove Medical History
							</button>

							<button
								className={`py-2 px-4 rounded ml-44 shadow-xl shadow-cyan-600 font-bold ${
									selectedAction === "view"
										? "bg-cyan-900"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("view")}>
								View Medical History
							</button>

							<button
								className={`py-2 px-4 rounded ml-44 shadow-xl shadow-cyan-600  font-bold ${
									selectedAction === "update"
										? "bg-cyan-900"
										: "bg-cyan-800 hover:bg-cyan-900"
								}`}
								onClick={() => handleActionChange("update")}>
								Update Medical History
							</button>
						</div>
					</div>

					{selectedAction == "add" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="patientName"
									className="block font-medium text-white">
									Full Name
								</label>
								<input
									type="text"
									id="patientName"
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<div>
								<label
									htmlFor="medicalCondition"
									className="block font-medium text-white">
									Medical Condition
								</label>
								<input
									type="text"
									id="medicalCondition"
									value={medicalCondition}
									onChange={(e) => setMedicalCondition(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<div>
								<label
									htmlFor="prescriptions"
									className="block font-medium text-white">
									Prescriptions
								</label>
								<input
									type="text"
									id="prescriptions"
									value={prescriptions}
									onChange={(e) => setPrescriptions(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Add Medical History
							</button>
						</form>
					)}
					{selectedAction == "remove" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="patientID"
									className="block font-medium text-white">
									Patient ID
								</label>
								<input
									type="text"
									id="patientID"
									value={patientId}
									onChange={handleInputChange}
									className="border border-gray-300 p-2 rounded w-1/4"
									required
								/>
							</div>

							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Remove Medical History
							</button>
							<p className="text-white">{message}</p>
						</form>
					)}
					{selectedAction === "view" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="patientID"
									className="block font-medium text-white">
									Patient ID
								</label>
								<input
									type="text"
									id="patientID"
									value={patientId}
									onChange={handleInputChange}
									className="border border-gray-300 p-2 rounded w-1/4"
									required
								/>
							</div>

							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								View Medical History
							</button>
							<p className="text-white">{message}</p>
						</form>
					)}
					{selectedAction == "update" && (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="patientId"
									className="block font-medium text-white">
									Enter Patient Id
								</label>
								<input
									type="text"
									id="patientId"
									value={patientId}
									onChange={(e) => setPatientId(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<div>
								<label
									htmlFor="patientName"
									className="block font-medium text-white">
									Full Name
								</label>
								<input
									type="text"
									id="patientName"
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<div>
								<label
									htmlFor="medicalCondition"
									className="block font-medium text-white">
									Medical Condition
								</label>
								<input
									type="text"
									id="medicalCondition"
									value={medicalCondition}
									onChange={(e) => setMedicalCondition(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<div>
								<label
									htmlFor="prescriptions"
									className="block font-medium text-white">
									Prescriptions
								</label>
								<input
									type="text"
									id="prescriptions"
									value={prescriptions}
									onChange={(e) => setPrescriptions(e.target.value)}
									className="border border-gray-300 p-2 rounded "
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-cyan-800 hover:bg-cyan-900 text-white py-2 px-4 rounded">
								Update Medical History
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Admin;
