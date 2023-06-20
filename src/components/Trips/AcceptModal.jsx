import React, { useState, useContext } from "react";

import { Button, Card, Typography } from "@material-tailwind/react";

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

function AcceptModal({ modal, setModal }) {
	const [loading, setLoading] = useState(false);
	const { detail, setDetail } = useContext(DetailContext);
	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	const admitPatient = async () => {
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
			toast.success(
				"Patient Discharged, Refresh the Page to see the Changes",
				toastOptions
			);
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
			<div className="bg-white opacity-100 absolute top-[10vh] left-0 max-h-[90vh] min-h-[40vh] w-[40%] ml-[30%] mt-0 z-30 rounded-2xl border-2 border-background p-1 pb-4">
				<div className="rounded-2xl overflow-auto max-h-[90vh]">
					<div className="flex flex-col items-center justify-center">
						<Typography variant="h4" className="text-center mt-8">
							Admit Patient
						</Typography>
						<hr className="border-1 border-gray-600 mt-4 w-[90%] mb-4" />
						<div>
                     
							<Card className="max-h-80 overflow-auto px-7 py-4">
								<Typography variant="h5" color="black" className="text-center mt-0">
									Confirm the Patient's Details
								</Typography>
								<hr className="mt-1 border-gray-500 w-[100%] m-[auto]" />
								<div className="flex flex-col items-start gap-0 mt-2">
									{/* {detail.map((test) => (
								<div className="flex items-center gap-1 pl-1 py-2">
									<Typography variant="text" color="black">
										{`${test.category}: ${test.name}`}
									</Typography>
								</div>
							))} */}
									<div className="flex-column items-center gap-1 pl-1 py-2">
										<Typography variant="text" color="black">
											{`Name: ${detail.name}`}
										</Typography>
                              <Typography variant="text" color="black">
                                 {`Age: ${detail.age}`}
                              </Typography>
                              <Typography variant="text" color="black">
                                 {`Gender: ${detail.gender}`}
                              </Typography>
                              <Typography variant="text" color="black">
                                 {`Blood Group: ${detail.blood_group}`}
                              </Typography>
                              <Typography variant="text" color="black">
                                 {`Consciousness: ${detail.consciousness}`}
                              </Typography>
                              <Typography variant="text" color="black">
                                 {`Type: ${detail.type}`}
                              </Typography>
                              <Typography variant="text" color="black">
                                 {`Location: ${detail.location}`}
                              </Typography>
									</div>
								</div>
							</Card>
                     <div className="flex gap-8 items-center justify-center my-4">
                        <Typography variant="h6" color="black" className="text-center mt-4">
                           {`Ward: ${detail.ward}`}
                        </Typography>
                        <Typography variant="h6" color="black" className="text-center mt-4">
                           {`Bed: ${detail.bed}`}
                        </Typography>
                     </div>
						</div>
						<div className="flex flex-row items-center justify-center mt-4 gap-8">
							<Button
								variant="contained"
								color="primary"
								className="mx-2 w-40 text-md"
								onClick={() => {
									admitPatient();
								}}
								disabled={loading}
							>
								Admit
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
						<div>
							<Typography
								variant="h6"
								className="relative text-center bottom-0 mt-10"
								style={{ color: "#ff0000" }}
							>
								Note: This action cannot be undone.
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AcceptModal;
