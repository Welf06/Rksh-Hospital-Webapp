import { useState, useEffect, useContext } from "react";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";

import axios from "axios";

import Patients from "./Patients/index";
import Completed from "./Completed/index";
import Trips from "./Trips/index";
import Doctors from "./Edit Modals/Doctor";
import Tests from "./Edit Modals/Tests";
import Treatments from "./Edit Modals/Treatments";
import NotificationModal from "./common/NotificationModal";

import { LoginDetailsContext, toastOptions } from "../App";
import { toast } from "react-toastify";

function Page({ page, modal, setModal, setPage }) {
	const [notificationQueue, setNotificationQueue] = useState([]);
// 	const [notificationQueue, setNotificationQueue] = useState([JSON.parse(
// "{\"ambulance_license_plate\":\"1234\",\"driver_phone\":\"1234567890\",\"driver_name\":\"Test2_driver\",\"estimated_time_of_arrival\":\"2023-06-18T01:00:00Z\",\"start_location\":\"Kathmandu\",\"start_time\":\"2023-18-06T01:00:00Z\",\"password\":\"mypassword123\",\"video_url\":\"video_url\",\"nature_of_emergency\":\"Accident\",\"name\":\"Test3_patient\",\"location\":\"Kathmandu\",\"id\":2,\"conscious\":\"Y\",\"document_url\":\"document_url\",\"email\":\"info@cityhospital.com\",\"hospital_name\":\"City Hospital\"}"
// 	)]);
	const { loginDetails } = useContext(LoginDetailsContext);

	useEffect(() => {
		requestNotificationPermission();
	}, []);

	useEffect(() => {
		console.log(notificationQueue);
	}, [notificationQueue]);

	async function requestNotificationPermission() {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			// Generating token for the instance
			console.log("getting the token");
			const token = await getToken(messaging, {
				validKey:
					"BEGnFm9aWNi4pW8_jlhusRsKF7PvglvtDwL4EpHYNkGk7fb6BhQVYXwxtKmJJ3o4RjITToCQY0iRODWjw-pnxQg",
			});
			console.log(token);
			// Sending the token to the Backend

			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/createGCMDevice/`;
			const data = {
				hospital: {
					email: loginDetails.email,
					password: loginDetails.password,
				},
        registration_id: token,
			};
			const headers = { "Content-Type": "application/json" };

      axios.post(url, JSON.stringify(data), { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
			 if (error.response)
          toast.error(error.response.data.detail, toastOptions);
			 else
			 toast.error(error.message, toastOptions)
        });

		} else if (permission === "denied") {
			console.log("you denied notification permission");
      toast.error("You denied notification permission.", toastOptions);
		}
	}

	onMessage(messaging, (payload) => {
		console.log("Message received. ", payload);
		setNotificationQueue([JSON.parse(payload.data.trip_details), ...notificationQueue,]);
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
			{page === "patients" && <Patients setPage={setPage}/>}
			{page === "completed" && <Completed />}
			{page === "trips" && <Trips />}
			{modal === "doctors" && <Doctors setModal={setModal} />}
			{modal === "tests" && <Tests setModal={setModal} />}
			{modal === "treatments" && <Treatments setModal={setModal} />}
		</>
	);
}

export default Page;
