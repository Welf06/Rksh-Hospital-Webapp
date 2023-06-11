import React, { useEffect, useState } from "react";
import "axios";

import {
	Typography,
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
			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCompletedCases/`;
			// const url = 'http://127.0.0.1:8000/hospital/getCases/';

			const data = {
				email: "info@cityhospital.com",
				password: "mypassword123",
			};

			const headers = { "Content-Type": "application/json" };
			console.log(data);
			try {
				const response = await axios.post(url, JSON.stringify(data), {
					headers,
				});
				console.log(response.data.completedCases);
				setData(response.data.completedCases);
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
			name: "id",
			label: "ID",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "age",
			label: "Age",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "gender",
			label: "Gender",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "ward",
			label: "Ward",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "emergencyType",
			label: "Type",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "dateofdischarge",
			label: "Date of Discharge",
			options: {
				filter: true,
				sort: true,
			},
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
					data={data}
					columns={columns}
					options={options}
				/>
			</div>
		</div>
	);
}

export default Completed;
