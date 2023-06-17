import { useState, useEffect, useContext } from "react";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";

import axios from "axios";

import Patients from "./Patients";
import Completed from "./Completed";
import Doctors from "./Doctor";
import Tests from "./Tests";
import Treatments from "./Treatments";
import NotificationModal from "./NotificationModal";

import { LoginDetailsContext, toastOptions } from "../App";
import { toast } from "react-toastify";

function Page({ page, modal, setModal }) {
	const [notificationQueue, setNotificationQueue] = useState([]);
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
			console.log(data);
			const headers = { "Content-Type": "application/json" };

      axios.post(url, JSON.stringify(data), { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.detail, toastOptions);
        });

		} else if (permission === "denied") {
			console.log("you denied notification permission");
      toast.error("You denied notification permission.", toastOptions);
		}
	}

	onMessage(messaging, (payload) => {
		console.log("Message received. ", payload);
		setNotificationQueue([...notificationQueue, payload.notification]);
		// ...
	});

	return (
		<>
			{notificationQueue.length > 0 && (
				<NotificationModal
					notificationQueue={notificationQueue}
					setNotificationQueue={setNotificationQueue}
				/>
			)}
			{page === "patients" && <Patients />}
			{page === "completed" && <Completed />}
			{modal === "doctors" && <Doctors setModal={setModal} />}
			{modal === "tests" && <Tests setModal={setModal} />}
			{modal === "treatments" && <Treatments setModal={setModal} />}
		</>
	);
}

export default Page;
