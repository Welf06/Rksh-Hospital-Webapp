import React, { useEffect, useState, useContext } from "react";

import { Card, Typography, Button, Input } from "@material-tailwind/react";

import { VideoCameraIcon, IdentificationIcon } from "@heroicons/react/24/solid";

import VideoImageModal from "./VideoImageModal";

function NotificationModal({ notificationQueue, setNotificationQueue, page }) {
	const [modal, setModal] = useState("");
	const notification = notificationQueue[0];
	console.log(notification);

	const getETA = (eta) => {
		return Math.floor(eta/60);
	};

	const getTime = (time) => {
		const date = new Date(time);
		console.log(date);
		return date.toLocaleTimeString();
	};
	
	return (
		<>
			<div className="bg-black opacity-25 absolute top-14 left-0 h-[125vh] w-[100%] z-20 overflow-hidden"></div>
			<Card className="bg-white opacity-100 absolute top-0 left-0 min-h-[60vh] max-h-[120vh] w-[50%] ml-[25%] mt-20 z-30 rounded-2xl border-2 border-background p-1">
				<div className="rounded-2xl">
					<div className="flex items-center p-9">
						<Typography variant="h3" color="black" className="">
							Emergency Notification
						</Typography>
					</div>
					<hr className="mt-[-2rem] border-gray-300 w-[90%] m-[auto]" />
					<div className="flex justify-between px-12 mt-4">
						<div>
							<Typography variant="h3" color="black" className="">
								{getETA(notification.estimated_time_of_arrival)} mins
							</Typography>
							<Typography variant="h5" color="black" className="">
								{notification.nature_of_emergency}
							</Typography>
							<Typography variant="lead">{notification.name}</Typography>
							<Typography variant="lead">
								{getTime(notification.start_time)} |{" "}
								{notification.conscious === "Y" ? "Conscious" : "Unconscious"}
							</Typography>
							<Typography variant="para">
								{notification.start_location}
							</Typography>
						</div>
						<div>
							<Typography variant="h4" color="black" className="">
								Reported By
							</Typography>
							<Typography variant="lead">{notification.driver_name}</Typography>
							<Typography variant="lead">Ambulance Driver</Typography>
							<Typography variant="lead">
								{notification.driver_phone}
							</Typography>
						</div>
					</div>
					<hr className="mt-[1rem] border-gray-300 w-[90%] m-[auto]" />
					<div className="flex justify-center gap-16 mt-4">
						<Button
							className="w-60 py-4 flex items-center gap-2 justify-center"
							onClick={() => setModal({type: "video", "url": notification.video_url})}
						>
							<VideoCameraIcon className="h-6 w-6" />
							Authentication Video
						</Button>
						<Button
							className="w-60 py-4 flex items-center gap-2 justify-center"
							onClick={() => setModal({"type": "image", "url":notification.document_url})}
						>
							<IdentificationIcon className="h-6 w-6" />
							Patient ID
						</Button>
					</div>
					<hr className="my-[1rem] border-gray-300 w-[90%] m-[auto]" />
					<div className="flex items-center justify-center">
						<Button
							className="w-40 py-4 mb-8 flex justify-center gap-2 text-center"
							onClick={() => {
								setNotificationQueue(notificationQueue.slice(1));
                if (page === "trips") {
                  window.location.reload();
                }
							}}
						>
							Okay
						</Button>
					</div>
				</div>
			</Card>
			<VideoImageModal modal={modal} setModal={setModal} />
		</>
	);
}

export default NotificationModal;
