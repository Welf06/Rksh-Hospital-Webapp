import { useState, useEffect, useContext } from "react";
import { useFirstRender } from "../hooks/useFirstRender";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";

import axios from "axios";

import Login from "./Login/Login";
import Patients from "./Patients/index";
import Completed from "./Completed/index";
import Trips from "./Trips/index";
import Doctors from "./Edit Modals/Doctor";
import Tests from "./Edit Modals/Tests";
import Treatments from "./Edit Modals/Treatments";
import NotificationModal from "./common/NotificationModal";
import Navbar from "./common/navbar";
import Sidebar from "./common/sidebar";

import { LoginDetailsContext, toastOptions } from "../App";
import { toast } from "react-toastify";

function Page({ page, modal, setModal, setPage }) {
	const [notificationQueue, setNotificationQueue] = useState([]);
// 	const [notificationQueue, setNotificationQueue] = useState([JSON.parse(
// "{\"ambulance_license_plate\":\"1234\",\"driver_phone\":\"1234567890\",\"driver_name\":\"Test2_driver\",\"estimated_time_of_arrival\":\"2023-06-18T01:00:00Z\",\"start_location\":\"Kathmandu\",\"start_time\":\"2023-18-06T01:00:00Z\",\"password\":\"mypassword123\",\"video_url\":\"video_url\",\"nature_of_emergency\":\"Accident\",\"name\":\"Test3_patient\",\"location\":\"Kathmandu\",\"id\":2,\"conscious\":\"Y\",\"document_url\":\"document_url\",\"email\":\"info@cityhospital.com\",\"hospital_name\":\"City Hospital\"}"
// 	)]);
	const [activeTrips, setActiveTrips] = useState(0)
	const { loginDetails } = useContext(LoginDetailsContext);
	const firstRender = useFirstRender();

	useEffect(() => {
		// setActiveTrips(localStorage.getItem("activeTrips"));
		// console.log(localStorage.getItem("activeTrips"))
		// sendApiCall();
	}, [])

	useEffect(() => {
		console.log(notificationQueue);
	}, [notificationQueue]);

	useEffect(() => {
		console.log(activeTrips)
		if (firstRender) return;
		localStorage.setItem("activeTrips", activeTrips);
	}, [activeTrips])



	onMessage(messaging, (payload) => {
		console.log("Message received. ", payload);
		setNotificationQueue([JSON.parse(payload.data.trip_details), ...notificationQueue,]);
		setActiveTrips(activeTrips + 1)
		// ...
	});

	return (
		<>
			{notificationQueue.length > 0 && (
				<NotificationModal
					notificationQueue={notificationQueue}
					setNotificationQueue={setNotificationQueue}
					page = {page}
				/>
			)}
			<Navbar setPage={setPage} />
			{page !== "login" && <Sidebar setPage={setPage} setModal={setModal} />}
			{page === "login" && <Login setPage={setPage} />}
			{page === "patients" && <Patients setPage={setPage} setActiveTrips={setActiveTrips} activeTrips={activeTrips}/>}
			{page === "trips" && <Trips setPage={setPage} setActiveTrips={setActiveTrips} activeTrips={activeTrips}/>}
			{page === "completed" && <Completed />}
			{modal === "doctors" && <Doctors setModal={setModal} />}
			{modal === "tests" && <Tests setModal={setModal} />}
			{modal === "treatments" && <Treatments setModal={setModal} />}
		</>
	);
}

export default Page;
