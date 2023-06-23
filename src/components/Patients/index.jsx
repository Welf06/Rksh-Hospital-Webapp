import React, { useState } from "react";

import TestsModal from "./TestsModal";
import DoctorModal from "./DoctorModal";
import AddDetailsModal from "../Trips/AddDetailsModal";
import EditDetailsModal from "./EditDetailsModal";

import {
	Badge,
	Typography,
	Button,
} from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

import Table from "./Table";

function Patients({ setPage, activeTrips }) {
	const [modal, setModal] = useState("");
	
	return (
		<>
			<div className="overflow-hidden">
				{modal==="tests" && <TestsModal setModal={setModal} />}
				{modal==="doctors" && <DoctorModal setModal={setModal} />}
				{modal==="editDetails" && <EditDetailsModal setModal={setModal} />}

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
				/>
			</div>
		</>
	);
}

export default Patients;
