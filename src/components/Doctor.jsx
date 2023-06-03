import React, { useEffect } from "react";

import { MuiTelInput } from "mui-tel-input";

import {
	Card,
	Typography,
	Button,
	Input,
	Checkbox,
	ListItemPrefix,
	ListItem,
	List,
} from "@material-tailwind/react";

import {
	UserIcon,
	BuildingOfficeIcon,
	AcademicCapIcon,
	PhoneIcon,
} from "@heroicons/react/24/solid";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Doctor({ setModal }) {
	const [value, setValue] = React.useState("");

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

	useEffect(() => {
		const sendApiCall = async () => {
			const url =
				"http://dev-env.eba-dbbpfsiz.ap-south-1.elasticbeanstalk.com/hospital/addDoctor/";
			// const url = 'http://127.0.0.1:8000/hospital/getCases/';

			const data = {
				hospital: {
					email: " test@gmail.com",
					password: " abc123",
				},
				name: "bcde",
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
				toast.success("Doctor Added Successfully", toastOptions);
				// Handle the response data here
			} catch (error) {
				console.error(error);
				toast.error(error.detail, toastOptions);
				// Handle the error here
			}
		};

		sendApiCall();
	}, []);

	const handleChange = (newValue) => {
		setValue(newValue);
	};
	return (
		<>
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
			<div
				className="bg-black opacity-25 absolute top-14 left-0 h-[100%] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setModal("none");
				}}
			></div>
			<Card className="bg-white opacity-100 absolute top-14 left-0 max-h-[80vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1">
				<div className="rounded-2xl overflow-auto max-h-[75vh]">
					<div className="flex items-center p-9">
						<Typography variant="h3" color="black" className="">
							Add Doctor
						</Typography>
					</div>
					<hr className="mt-[-2rem] border-gray-300 w-[90%] m-[auto]" />
					<form className="px-4">
						<div className="flex items-center gap-2 px-9 py-4 pt-10">
							<UserIcon className="h-6 w-6 text-gray-900" />
							<Input label="Name" type="text" color="lightBlue" />
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<BuildingOfficeIcon className="h-6 w-6 text-gray-900" />
							<Input label="Department" type="text" color="lightBlue" />
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<AcademicCapIcon className="h-6 w-6 text-gray-900" />
							<Input label="Qualification" type="text" color="lightBlue" />
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<PhoneIcon className="h-6 w-6 text-gray-900" />
							<Input label="Phone Number" type="number" color="lightBlue" />
						</div>
						<div className="flex items-center p-9 justify-center">
							<Button className="m-auto">
								<Typography variant="small" color="white">
									Submit
								</Typography>
							</Button>
							<Button className="m-auto">
								<Typography variant="small" color="white">
									Cancel
								</Typography>
							</Button>
						</div>
					</form>
				</div>
			</Card>
		</>
	);
}

export default Doctor;
