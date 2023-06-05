import React, { useEffect, useState } from "react";

import {
	Card,
	Typography,
	Button,
	Input,
} from "@material-tailwind/react";

import {
	UserIcon,
	BuildingOfficeIcon,
	AcademicCapIcon,
	PhoneIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/solid";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function Doctor({ setModal }) {
	const [value, setValue] = React.useState("");
	const [name, setName] = useState("");
	const [specialization, setSpecialization] = useState("");
	const [phone, setPhone] = useState("");
	const [qualification, setQualification] = useState("");
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState([]);

	useEffect(() => {
		sendApiCall();
	}, [loading]);

	const sendApiCall = async () => {
			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getDoctors/`;
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
				console.log(response.data.doctors);
				setData(response.data.doctors);
				// Handle the response data here
			} catch (error) {
				console.error(error);
				toast.error(error.response.data.detail, toastOptions);
				// Handle the error here
			}
		};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(phone)) {
			toast.error("Invalid Phone Number", toastOptions);
			setLoading(false);
			return;
		}

		const url =
			`${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/addDoctor/`;
		const data = {
			hospital: {
				email: "info@cityhospital.com",
				password: "mypassword123",
			},
			name: name,
			specialization: specialization,
			phone: phone,
			qualification: qualification,
		};

		// console.log(data);

		const headers = { "Content-Type": "application/json" };

		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			toast.success(response.data.detail, toastOptions);

				setLoading(false);
			// setModal("none");
		} catch (error) {
			console.error(error);
			toast.error(error.response.data[0], toastOptions);
			setLoading(false);
		}
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
				className="bg-black opacity-25 absolute top-14 left-0 h-[125vh] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setModal("none");
				}}
			></div>
			<Card className="bg-white opacity-100 absolute top-0 left-0 max-h-[120vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1">
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
							<Input
								label="Name"
								type="text"
								color="blue-gray"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<BuildingOfficeIcon className="h-6 w-6 text-gray-900" />
							<Input
								label="Department"
								type="text"
								color="blue-gray"
								value={specialization}
								onChange={(e) => setSpecialization(e.target.value)}
							/>
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<AcademicCapIcon className="h-6 w-6 text-gray-900" />
							<Input
								label="Qualification"
								type="text"
								color="blue-gray"
								value={qualification}
								onChange={(e) => setQualification(e.target.value)}
							/>
						</div>
						<div className="flex items-center px-9 py-4 gap-2">
							<PhoneIcon className="h-6 w-6 text-gray-900" />
							<Input
								label="Phone Number"
								type="number"
								color="blue-gray"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div className="flex items-center p-9 justify-center gap-10">
							<div>
							<Button
								className="m-auto flex items-center gap-1 justify-center w-32"
								disabled={loading}
								onClick={handleSubmit}
							>
								<CheckCircleIcon className="h-6 w-6 text-white" />
								<Typography variant="small" color="white">
									Add 
								</Typography>
							</Button>
							</div>
							<div>
							<Button
								className="m-auto flex items-center gap-1 justify-center w-32"
								disabled={loading}
								onClick={() => setModal("")}

							>
								<XCircleIcon className="h-6 w-6 text-white" />
								<Typography variant="small" color="white">
									Cancel
								</Typography>
							</Button>
							</div>
						</div>
					</form>
				</div>
				<div className="overflow-hidden border-background border-solid border-2 rounded-2xl p-1 mx-14 mb-4">
				<Card className="h-80 overflow-auto px-7 py-4">
					<Typography variant="h5" color="black" className="text-left">
						Doctors
					</Typography>
					<hr className="mt-1 border-gray-500 w-[100%] m-[auto]" />
					<div className="flex flex-col items-start gap-0 mt-2">
						{data.map((doctor) => (
							<div key={doctor.name} className="flex items-center gap-1 pl-1 py-2">
								<UserIcon className="h-6 w-6 text-gray-900" />
								<Typography variant="text" color="black">
									{`${doctor.name}, ${doctor.qualification}: ${doctor.specialization}`}
								</Typography>
							</div>
						))}
					</div>
				</Card>
				</div>
			</Card>
		</>
	);
}

export default Doctor;
