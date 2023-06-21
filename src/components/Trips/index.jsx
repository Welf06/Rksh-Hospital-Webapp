import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
	Badge,
	Typography,
	IconButton,
	Button,
} from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

import TripsTable from "./TripsTable";
import VideoImageModal from "../common/VideoImageModal";
import AcceptModal from "./AcceptModal";
import AddDetailsModal from "./AddDetailsModal";

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

function Trips({setPage}) {
   const [modal, setModal] = useState("")
	const [data, setData] = useState([]);
	const [curData, setCurData] = useState([]);
	const [numRows, setNumRows] = useState(5);

	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	const sendApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/tripnotification/getHospitalNotification/`;
		// const url = 'http://127.0.0.1:8000/hospital/getCases/';
		const data = {
			email: loginDetails.email,
			password: loginDetails.password,
		};
		const headers = { "Content-Type": "application/json" };
		// console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			setData(response.data.reverse());
			setCurData(response.data.reverse().slice(0, numRows));
			// Handle the response data here
		} catch (error) {
			console.error(error);
			toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};
	return (
		<>
			<div className="overflow-hidden">
				{/* {doctorModal && <DoctorModal setDoctorModal={setDoctorModal} />} */}
				<div className="ml-32 mt-7 flex justify-between pr-20">
					<Typography variant="h3" color="black">
						Active Trips
					</Typography>
				</div>
				<TripsTable
            setModal={setModal}
            modal={modal}
					curData={curData}
					setCurData={setCurData}
					data={data}
					setData={setData}
					numRows={numRows}
					setNumRows={setNumRows}
					sendApiCall={sendApiCall}
				/>
			</div>
         <VideoImageModal modal={modal} setModal={setModal} />
			{modal.type === "accept" && <AcceptModal modal={modal} setModal={setModal} sendApiCall={sendApiCall}/>}
			{modal.type === "addDetails" && <AddDetailsModal modal={modal} setModal={setModal} sendApiCall={sendApiCall}/>}
		</>	
	);
}

export default Trips;
