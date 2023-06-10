import React, { useState, useEffect } from "react";
import backgroundImg from "../../../../assets/background1.png";
import Logo from "../../../../assets/logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OwnerProfit = () => {
	const [transactions, setTransactions] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [profit, setProfit] = useState(0);
	const [expenses, setExpenses] = useState(0);

	useEffect(() => {
		// Fetch transactions from the database
		axios
			.get("/api/transactions")
			.then((response) => {
				const fetchedTransactions = response.data;

				// Calculate total amount
				const amountSum = fetchedTransactions.reduce(
					(sum, transaction) => sum + transaction.amount,
					0,
				);
				setTotalAmount(amountSum);

				// Categorize transactions into profit and expenses
				const profitTransactions = fetchedTransactions.filter(
					(transaction) => transaction.type === "profit",
				);
				const expenseTransactions = fetchedTransactions.filter(
					(transaction) => transaction.type === "expense",
				);

				// Calculate profit and expenses amounts
				const profitSum = profitTransactions.reduce(
					(sum, transaction) => sum + transaction.amount,
					0,
				);
				const expenseSum = expenseTransactions.reduce(
					(sum, transaction) => sum + transaction.amount,
					0,
				);

				setProfit(profitSum);
				setExpenses(expenseSum);

				// Set the fetched transactions
				setTransactions(fetchedTransactions);
			})
			.catch((error) => {
				console.error("Error fetching transactions:", error);
			});
	}, []);

	const navigate = useNavigate();
  const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("ownerId");
		navigate("/ownerlogin", { replace: true });
	};

	const gotoOwner = () => {
		navigate("/dashboard/owner");
	};
	const gotoOwnerAdmin = () => {
		navigate("/dashboard/owneradmin");
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
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoOwner()}>
						<h4 className="mt-2">Dashboard</h4>
					</div>
					<div
						className="bg-gray-700 flex justify-center border-b-2 border-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-400"
						onClick={() => gotoOwnerAdmin()}>
						<h4 className="ml-3 mt-2">Admin</h4>
					</div>
					<div className="bg-gray-400 flex justify-center text-gray-800  border-b-2 border-gray-500 cursor-pointer0">
						<h4 className="mt-2 mr-2">Profit & Lost</h4>
					</div>
				</div>
			</div>
			<div className="w-3/4 bg-none">
				<div className="bg-white text-black h-12 flex">
					<h2 className="bg-white h-12 text-black font-bold font-serif ml-4 pt-2 underline">
						OWNER DASHBOARD
					</h2>
					<h5 className="absolute right-32 mt-2 text-xl uppercase">
						Welcome 
					</h5>
					<button
						className="absolute right-2 mt-2 bg-cyan-900 w-24 h-8 text-white rounded-full"
						onClick={handleLogout}>
						Log Out
					</button>
				</div>

				<div className="p-4">
					<h2 className="text-2xl font-bold mb-4">Profit and Loss</h2>

					<div className="grid grid-cols-2 gap-4">
						<div className="bg-white rounded-md shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">Revenue</h3>
							<p className="text-gray-700">${profit}</p>
						</div>

						<div className="bg-white rounded-md shadow-md p-4">
							<h3 className="text-lg font-semibold mb-2">Expenses</h3>
							<p className="text-gray-700">${expenses}</p>
						</div>

						<div className="bg-white rounded-md shadow-md p-4 col-span-2">
							<h3 className="text-lg font-semibold mb-2">Net Profit</h3>
							<p
								className={`text-2xl font-bold ${
									profit >= expenses ? "text-green-600" : "text-red-600"
								}`}>
								${profit - expenses}
							</p>
						</div>

						<div className="bg-white rounded-md shadow-md p-4 col-span-2">
							<h3 className="text-lg font-semibold mb-2">Transactions</h3>
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th className="px-4 py-2">Date</th>
										<th className="px-4 py-2">Description</th>
										<th className="px-4 py-2">Amount</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((transaction) => (
										<tr key={transaction.id}>
											<td className="px-4 py-2">{transaction.date}</td>
											<td className="px-4 py-2">{transaction.description}</td>
											<td className="px-4 py-2">${transaction.amount}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="bg-white rounded-md shadow-md p-4 col-span-2">
							<h3 className="text-lg font-semibold mb-2">Total Amount</h3>
							<p className="text-2xl font-bold">${totalAmount}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OwnerProfit;
