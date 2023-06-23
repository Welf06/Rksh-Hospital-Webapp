import React, { useState, useContext } from "react";

import {
	Typography,
	Button,
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

function DischargeModal({ setModal }) {
   const [loading, setLoading] = useState(false);
	const { detail, setDetail } = useContext(DetailContext);
	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);


	const dischargePatient = async () => {
      setLoading(true);
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/dischargeCase/`;
		const data = {
			hospital: { 
				email: loginDetails.email,
				password: loginDetails.password,
			},
			name: detail.name,
		};
		const headers = { "Content-Type": "application/json" };
		console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			toast.success("Patient Discharged, Refresh the Page to see the Changes", toastOptions);
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
				className="bg-black opacity-25 absolute top-14 left-0 h-[120vh] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setModal("");
				}}
			></div>
			<div className="bg-white opacity-100 absolute top-[20vh] left-0 max-h-[80vh] min-h-[40vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1 pb-4">
				<div className="rounded-2xl overflow-auto max-h-[75vh]">
					<div className="flex flex-col items-center justify-center">
						<Typography variant="h5" className="text-center mt-8">
							Confirm Discharge of {detail.name}?
						</Typography>
						<hr className="border-1 border-gray-600 mt-4 w-[90%] mb-8" />
						<div className="flex flex-row items-center justify-center mt-4 gap-8">
							<Button
								variant="contained"
								color="primary"
								className="mx-2 w-40 text-md"
								onClick={() => {
									dischargePatient();
								}}
                        disabled={loading}
							>
								Yes
							</Button>
							<Button
								className="mx-2 w-40 text-md"
								onClick={() => {
									setModal("");
								}}
                        disabled={loading}
							>
								No
							</Button>
						</div>
						<Typography
							variant="h6"
							className="text-center mt-20"
							style={{ color: "#ff0000" }}
						>
							Note: This action cannot be undone.
						</Typography>
					</div>
				</div>
			</div>
		</>
	);
}

export default DischargeModal;
