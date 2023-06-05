import React, { useEffect, useState, useContext } from "react";

import {
	Typography,
	Button,
	Checkbox,
	ListItemPrefix,
	ListItem,
	List,
} from "@material-tailwind/react";

import { UserCircleIcon } from "@heroicons/react/24/solid";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DetailContext } from "../App";

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

function DoctorModal({ setDoctorModal, sampleData }) {
	const [doctors, setDoctors] = useState([]);
	const [selectedDoctors, setSelectedDoctors] = useState([]);
	const [loading, setLoading] = useState(false);

	const { detail, setDetail } = useContext(DetailContext);

	useEffect(() => {
		console.log(detail.name);
		sendDocoterApiCall();
		sendCaseDoctorsApiCall(detail.name);
	}, []);

	useEffect(() => {
		console.log(selectedDoctors);
	}, [selectedDoctors]);

	const sendDocoterApiCall = async () => {
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
			setDoctors(response.data.doctors);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	const sendCaseDoctorsApiCall = async (name) => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCaseDoctors/`;
		const data = {
			email: "info@cityhospital.com",
			password: "mypassword123",
			name: name,
		};
		const headers = { "Content-Type": "application/json" };
		console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data.caseDoctors);
			setSelectedDoctors(response.data.caseDoctors);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	const sendAddTestsTreatmentsApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/addCaseTestsTreatmentsDoctors/`;
		const data = {
			hospital: {
				email: "info@cityhospital.com",
				password: "mypassword123",
			},
			name: "xyz",
			caseTests: ["TestName"],
			caseTreatments: ["TreatmentName"],
			caseDoctors: ["DoctorName"],
		};
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
				className="bg-black opacity-25 absolute top-14 left-0 h-[120vh] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setDoctorModal(false);
				}}
			></div>
			<div className="bg-white opacity-100 absolute top-14 left-0 max-h-[80vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1 pb-4">
				<div className="rounded-2xl overflow-auto max-h-[75vh]">
					<div className="flex items-center p-9">
						<Typography variant="h3" color="black" className="">
							Doctors
						</Typography>
					</div>
					<hr className="mt-[-2rem] border-gray-300 w-[90%] m-[auto]" />
					<div className="px-9 py-1">
						<Typography variant="h6" color="black" className="">
							<div>{detail.name}</div>
						</Typography>
						<div>
							<Typography variant="small" color="black" className="">
								{detail.age} | {detail.gender} |{" "}
								{detail.bloodGroup ? detail.bloodGroup : "A+ve"} |{" "}
								{detail.consciousness ? "Concious" : "Unconscious"}
							</Typography>
						</div>
					</div>
					<div className="px-4">
						<Typography variant="h5" color="black" className="p-5">
							Assigned Doctors
						</Typography>
						<hr className="mt-[-1rem] border-gray-300 w-[95%] m-[auto]" />
						<List>
							{selectedDoctors.map(({ doctor, hospitalcase, id }, index) => {
								{
									console.log(doctor);
								}
								return (
									<ListItem key={id} className="p-0">
										<UserCircleIcon className="w-10 h-10 text-blue-gray ml-4" />
										<label
											htmlFor={id}
											className="ml-[-1rem] py-2 flex items-center w-full cursor-pointer"
										>
											<ListItemPrefix className="mr-3"></ListItemPrefix>
											<div>
												<Typography
													color="blue-gray"
													className="font-medium pl-4"
												>
													{doctor.name}, {doctor.qualification}
												</Typography>
												<Typography
													color="blue-gray"
													className="pl-4"
													variant="small"
												>
													{doctor.specialization}
												</Typography>
											</div>
										</label>
									</ListItem>
								);
							})}
						</List>
					</div>
					<div className="text-center pt-4">
						<Button className="m-auto">
							<Typography variant="small" color="white">
								Submit
							</Typography>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default DoctorModal;
