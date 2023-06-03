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

function Completed() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log(
		`${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCompletedCase`
	);
	// useEffect(() => {
	//    axios.get(`${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCompletedCases`, {
	//       name: "Test",
	//       email: " test@gmail.com",
	//       password: " abc123"
	//    } )
	//    .then(res => {
	//       if (res.status === 301) {
	//          const redirectUrl = res.headers.location;
	//          console.log('Received redirect response. Redirecting to:', redirectUrl);
	//          return axios.get(redirectUrl); // Make a new request to the redirected URL
	//        }
	//       setData(res.data)
	//       setLoading(false)
	//    })
	//    .catch(err => {
	//       console.log(err)
	//    })
	// }, [])

	useEffect(() => {
		const sendApiCall = async () => {
			const url =
				"http://dev-env.eba-dbbpfsiz.ap-south-1.elasticbeanstalk.com/hospital/addDoctor/";
			// const url = 'http://127.0.0.1:8000/hospital/getCases/';

			const data = {
				hospital: {
					email: " test2@gmail.com",
					password: " 1234",
				},
				name: "bcd",
				specialization: "Surgery",
				phone: 907534253,
				qualification: "MBBS",
			};

			const headers = { "Content-Type": "application/json" };

			try {
				const response = await axios.post(url, JSON.stringify(data), {
					headers,
				});
				console.log(response.data);
				// Handle the response data here
			} catch (error) {
				console.error(error);
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
