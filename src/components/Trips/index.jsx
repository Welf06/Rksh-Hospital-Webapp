import React, { useState } from "react";

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

function Trips({setPage}) {
   const [modal, setModal] = useState("")
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
				/>
			</div>
         <VideoImageModal modal={modal} setModal={setModal} />
			{modal.type === "accept" && <AcceptModal modal={modal} setModal={setModal} />}
			{modal.type === "addDetails" && <AddDetailsModal modal={modal} setModal={setModal} />}
		</>	
	);
}

export default Trips;
