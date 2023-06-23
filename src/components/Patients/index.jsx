import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import TestsModal from "./TestsModal";
import DoctorModal from "./DoctorModal";
import EditDetailsModal from "./EditDetailsModal";

import { LoginDetailsContext } from "../../App";

import {
	Badge,
	Typography,
	Button,
} from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

import Table from "./Table";
import DischargeModal from "./DischargeModal";

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

function Patients({ setPage, activeTrips, setActiveTrips }) {
	const [modal, setModal] = useState("");
	const {loginDetails} = useContext(LoginDetailsContext);

	const [data, setData] = useState([]);
	const [curData, setCurData] = useState([]);
	const [numRows, setNumRows] = useState(5);

	useEffect(() => {
		getHospitalNotification();
	}, []);

	const getHospitalNotification = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/tripnotification/getHospitalNotification/`;
		const data = {
			email: loginDetails.email,
			password: loginDetails.password,
		};
		const headers = { "Content-Type": "application/json" };
		console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			setActiveTrips(response.data.length)
			// Handle the response data here
		} catch (error) {
			console.error(error);
			// toast.error(error.response.data.detail, toastOptions);
			// Handle the error here
		}
	};

	const sendApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCases/`;
		const data = {
			email: loginDetails.email,
			password: loginDetails.password,
		};
		const headers = { "Content-Type": "application/json" };

		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data.cases.reverse());
			setData(response.data.cases.reverse());
			setCurData(response.data.cases.reverse().slice(0, numRows));
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
				{modal==="tests" && <TestsModal setModal={setModal} />}
				{modal==="doctors" && <DoctorModal setModal={setModal} />}
				{modal==="editDetails" && <EditDetailsModal setModal={setModal} sendApiCall={sendApiCall}/>}
				{modal==="discharge" && <DischargeModal setModal={setModal} sendApiCall={sendApiCall}/>}

				<div className="ml-32 mt-7 flex justify-between pr-20">
					<Typography variant="h3" color="black">
						Emergency Ward Patients Record
					</Typography>
					{activeTrips > 0 ? (
						<Badge withBorder content={`${activeTrips}`}>
						<Button
							className="flex items-center gap-2 w-40"
							onClick={() => setPage("trips")}
						>
							<TruckIcon className="h-4 w-4" />
							Active Trips
						</Button>
					</Badge>				
					) : (
						<Button
							className="flex items-center gap-2 w-40"
							onClick={() => setPage("trips")}
						>
							<TruckIcon className="h-4 w-4" />
							Active Trips
						</Button>
					)}


				</div>
				<Table
					setModal={setModal}
					modal={modal}
					sendApiCall={sendApiCall}
					data={data}
					curData={curData}
					setCurData={setCurData}
					numRows={numRows}
					setNumRows={setNumRows}
				/>
			</div>
		</>
	);
}

export default Patients;
