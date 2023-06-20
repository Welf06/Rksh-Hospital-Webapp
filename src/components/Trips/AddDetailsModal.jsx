import React, { useState, useContext } from "react";

import {
	Button,
	Input,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";

import axios from "axios";

import { toast } from "react-toastify";

import { DetailContext } from "../../App";
import { LoginDetailsContext } from "../../App";

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

function AddDetailsModal({ modal, setModal, sendApiCall }) {
	const [loading, setLoading] = useState(false);
	const { detail, setDetail } = useContext(DetailContext);
	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	const addPatientDetails = async () => {
		setLoading(true);
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/tripnotification/addTripDetails/`;
		const data = {
			email: loginDetails.email,
			password: loginDetails.password,
			id: detail.id,
			gender: detail.gender,
			ward: detail.ward,
			name: detail.name,
			age: detail.age,
			consciousness: detail.consciousness,
			bloodGroup: detail.bloodGroup,
			bed: detail.bed,
		};
		const headers = { "Content-Type": "application/json" };
		console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			toast.success(
				"Patient Details Added",
				toastOptions
			);
         sendApiCall();
			setTimeout(() => {
				setModal("");
				setLoading(false);
			}, 1000);
			// Handle the response data here
		} catch (error) {
			setLoading(false);
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	return (
		<>
			<div
				className="bg-black opacity-25 absolute top-14 left-0 h-[100vh] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setModal("");
				}}
			></div>
			<div className="bg-white opacity-100 absolute top-[10vh] left-0 max-h-[100vh] min-h-[40vh] w-[50%] ml-[25%] mt-0 z-30 rounded-2xl border-2 border-background p-1 pb-4">
				<div className="rounded-2xl overflow-auto max-h-[90vh]">
					<div className="flex flex-col items-center justify-center">
						<Typography variant="h4" className="text-center mt-8">
							Add Patient Details
						</Typography>
						<hr className="border-1 border-gray-600 mt-4 w-[90%] mb-4" />
						<div className="flex flex-col items-center justify-center gap-4 my-4">
							<img
								alt="id"
								style={{
									objectFit: "cover",
									objectPosition: "center",
									width: "80%",
									maxHeight: "80%",
									borderRadius: "10px",
								}}
								src={
									"https://mswordidcards.com/wp-content/uploads/2018/05/Non-government-organization-id-card-1-CRC.jpg"
								}
							></img>

							<div className="flex flex-col items-center justify-center gap-4 my-4">
								<div className="flex gap-8">
									<Input
										type="text"
										label="Name"
										value={detail.name}
										onChange={(e) =>
											setDetail({ ...detail, name: e.target.value })
										}
									/>
									<Input
										type="number"
										label="Age"
										value={detail.age}
										onChange={(e) =>
											setDetail({ ...detail, age: e.target.value })
										}
									/>
								</div>
								<div className="flex gap-8">
									<Select
										label="Gender"
										value={detail.gender}
										onChange={(e) => setDetail({ ...detail, gender: e })}
									>
										<Option value="M">Male</Option>
										<Option value="F">Female</Option>
										<Option value="O">Other</Option>
									</Select>
                           <Select
                              label="Blood Group"
                              value={detail.bloodGroup}
                              onChange={(e) =>
                                 setDetail({ ...detail, bloodGroup: e })
                              }
                           >
                              <Option value="A+">A+</Option>
                              <Option value="A-">A-</Option>
                              <Option value="B+">B+</Option>
                              <Option value="B-">B-</Option>
                              <Option value="AB+">AB+</Option>
                              <Option value="AB-">AB-</Option>
                              <Option value="O+">O+</Option>
                              <Option value="O-">O-</Option>
                           </Select>
								</div>
								<Select
									label="Consciousness"
									value={detail.consciousness}
									onChange={(e) => setDetail({ ...detail, consciousness: e })}
								>
									<Option value="Y">Conscious</Option>
									<Option value="N">Unconscious</Option>
								</Select>
								<div className="flex gap-8">
									<Select
										label="Ward"
										value={detail.ward}
										onChange={(e) => setDetail({ ...detail, ward: e })}
									>
										<Option value="EW">EW</Option>
										<Option value="ICU">ICU</Option>
										<Option value="GW">GW</Option>
									</Select>
									<Input
										label="Bed"
										value={detail.bed}
										onChange={(e) =>
											setDetail({ ...detail, bed: e.target.value })
										}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center justify-center my-4 gap-8">
							<Button
								variant="contained"
								color="primary"
								className="mx-2 w-40 text-md"
								onClick={() => {
									addPatientDetails();
								}}
								disabled={loading}
							>
								Add
							</Button>
							<Button
								className="mx-2 w-40 text-md"
								onClick={() => {
									setModal("");
								}}
								disabled={loading}
							>
								Close
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddDetailsModal;
