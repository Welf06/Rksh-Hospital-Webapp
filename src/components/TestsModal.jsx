import React, { useEffect, useState, useContext } from "react";

import {
	Typography,
	Button,
	Checkbox,
	ListItemPrefix,
	ListItem,
	List,
} from "@material-tailwind/react";

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

function TestsModal({ setTestModal, sampleData }) {
	const [tests, setTests] = useState([]);
	const [selectedTests, setSelectedTests] = useState([]);
	const [treatments, setTreatments] = useState([]);
	const [selectedTreatments, setSelectedTreatments] = useState([]);
	const [loading, setLoading] = useState(false);

	const { detail, setDetail } = useContext(DetailContext);

	useEffect(() => {
		console.log(detail.name);
		sendTestApiCall();
		sendTreatmentApiCall();
		sendCaseTestsApiCall(detail.name);
		sendCaseTreatmentsApiCall(detail.name);
	}, []);

	useEffect(() => {
		console.log(selectedTests);
	}, [selectedTests]);

	useEffect(() => {
		console.log(selectedTreatments);
	}, [selectedTreatments]);

	const sendTestApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getTests/`;
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
			console.log(response.data.tests);
			setTests(response.data.tests);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	const sendTreatmentApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getTreatments/`;
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
			console.log(response.data.treatments);
			setTreatments(response.data.treatments);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	const sendCaseTestsApiCall = async (name) => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCaseTests/`;
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
			console.log(response.data.caseTests);
			setSelectedTests(response.data.caseTests);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};
	const sendCaseTreatmentsApiCall = async (name) => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCaseTreatments/`;
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
			console.log(response.data.caseTreatments);
			setSelectedTreatments(response.data.caseTreatments);
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
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
				className="bg-black opacity-25 absolute top-14 left-0 h-[120vh] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setTestModal(false);
				}}
			></div>
			<div className="bg-white opacity-100 absolute top-14 left-0 max-h-[80vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1 pb-4">
				<div className="rounded-2xl overflow-auto max-h-[75vh]">
					<div className="flex items-center p-9">
						<Typography variant="h3" color="black" className="">
							Tests & Treatments
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
							Tests
						</Typography>
						<hr className="mt-[-1rem] border-gray-300 w-[95%] m-[auto]" />
						<List>
							{tests.map(({ category, hospital, id, name, price }) => {
								return (
									<ListItem key={id} className="p-0">
										<label
											htmlFor={id}
											className="px-3 py-2 flex items-center w-full cursor-pointer"
										>
											<ListItemPrefix className="mr-3">
												<Checkbox
													id={id}
													ripple={false}
													className="hover:before:opacity-0"
													checked={selectedTests
														.map((row) => row.test.name)
														.includes(name)}
													containerProps={{
														className: "p-0",
													}}
													onChange={() => {
														if (
															selectedTests
																.map((row) => row.test.name)
																.includes(name)
														) {
															setSelectedTests(
																selectedTests.filter(
																	(row) => row.test.name !== name
																)
															);
														} else {
															setSelectedTests([
																...selectedTests,
																{
																	test: {
																		category,
																		hospital,
																		id,
																		name,
																		price,
																	},
																},
															]);
														}
													}}
												/>
											</ListItemPrefix>
											<Typography
												color="blue-gray"
												className="font-medium pl-4"
											>
												{name}
											</Typography>
										</label>
									</ListItem>
								);
							})}
						</List>
					</div>
					<div className="px-4">
						<Typography variant="h5" color="black" className="p-5">
							Treatments
						</Typography>
						<hr className="mt-[-1rem] border-gray-300 w-[95%] m-[auto]" />
						<div>
							<List>
								{treatments.map(({ category, hospital, id, name, price }) => {
									return (
										<ListItem key={name} className="p-0">
											<label
												htmlFor={name}
												className="px-3 py-2 flex items-center w-full cursor-pointer"
											>
												<ListItemPrefix className="mr-3">
													<Checkbox
														id={name}
														ripple={false}
														className="hover:before:opacity-0"
														containerProps={{
															className: "p-0",
														}}
														checked={selectedTreatments
															.map((row) => row.treatment.name)
															.includes(name)}
														onChange={() => {
															if (
																selectedTreatments
																	.map((row) => row.treatment.name)
																	.includes(name)
															) {
																setSelectedTreatments(
																	selectedTreatments.filter(
																		(row) => row.treatment.name !== name
																	)
																);
															} else {
																setSelectedTreatments([
																	...selectedTreatments,
																	{
																		treatment: {
																			category,
																			hospital,
																			id,
																			name,
																			price,
																		},
																	},
																]);
															}
														}}
													/>
												</ListItemPrefix>
												<Typography
													color="blue-gray"
													className="font-medium pl-4"
												>
													{name}
												</Typography>
											</label>
										</ListItem>
									);
								})}
							</List>
						</div>
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

export default TestsModal;
