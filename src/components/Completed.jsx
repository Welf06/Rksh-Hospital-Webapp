import React, { useEffect, useState } from "react";
import "axios";

import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tabs,
	TabsHeader,
	Tab,
} from "@material-tailwind/react";

import MUIDataTable from "mui-datatables";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
	filterType: "checkbox",
	selectableRowsHideCheckboxes: true,
	selectableRowsHeader: false,
	searchPlaceholder: "Search...",
	pagination: true,
	rowsPerPage: 10,
	rowsPerPageOptions: [10, 20, 50, 100],
	responsive: "standard",
	elevation: 0,
	searchAlwaysOpen: true,
};

const toastOptions = {
	position: "top-center",
	autoClose: 1000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};

function Completed() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const sendApiCall = async () => {
			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getDoctors/`;
			// const url = 'http://127.0.0.1:8000/hospital/getCases/';

			const data = {
				email: " test@gmail.com",
				password: " abc123",
			};
         
         const headers = { "Content-Type": "application/json" };
         console.log(data);
			try {
				const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
				console.log(response.data);
				// Handle the response data here
			} catch (error) {
				console.error(error);
				toast.error(error.response.data.detail, toastOptions);
				// Handle the error here
			}
		};

		sendApiCall();
	}, []);

	const columns = [
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "phone",
			label: "Phone",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "amount",
			label: "Amount",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "datetime",
			label: "Date/Time",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "orgName",
			label: "Organization Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "location",
			label: "Location",
			options: {
				filter: true,
				sort: true,
			},
		},
	];

	const tableData = [
		{
			name: "Ganesh",
			phone: "9876543210",
			amount: "1000",
			datetime: "12/12/2021 12:00",
			orgName: "St. John's Hospital",
			location: "Koramangla",
		},
		{
			name: "Ganesh",
			phone: "9876543210",
			amount: "1000",
			datetime: "12/12/2021 12:00",
			orgName: "St. John's Hospital",
			location: "Koramangla",
		},
		{
			name: "Ganesh",
			phone: "9876543210",
			amount: "1000",
			datetime: "12/12/2021 12:00",
			orgName: "St. John's Hospital",
			location: "Koramangla",
		},
		{
			name: "Ganesh",
			phone: "9876543210",
			amount: "1000",
			datetime: "12/12/2021 12:00",
			orgName: "St. John's Hospital",
			location: "Koramangla",
		},
	];
	return (
		<div>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Typography variant="h3" color="black" className="ml-32 mt-7">
				Completed Patients Record
			</Typography>
			<div className="mx-16 my-4">
				<MUIDataTable
					className="mt-8"
					data={tableData}
					columns={columns}
					options={options}
				/>
			</div>
		</div>
	);
}

export default Completed;
