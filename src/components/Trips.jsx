import React, { useState } from "react";

import VideoImageModal from "./VideoImageModal";
import {
	Badge,
	Typography,
	IconButton,
	Button,
} from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

import TripsTable from "./TripsTable";

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
		</>
	);
}

export default Trips;
