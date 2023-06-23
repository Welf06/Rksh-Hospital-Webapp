import React, { useState } from "react";

import TestsModal from "./TestsModal";
import DoctorModal from "./DoctorModal";
import DischargeModal from "./DischargeModal";
import {
	Badge,
	Typography,
	IconButton,
	Button,
} from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

import Table from "./Table";

function Patients({ setPage, notificationCount }) {
	const [testModal, setTestModal] = useState(false);
	const [doctorModal, setDoctorModal] = useState(false);
	const [dischargeModal, setDischargeModal] = useState(false);
	console.log(notificationCount)
	return (
		<>
			<div className="overflow-hidden">
				{testModal && <TestsModal setTestModal={setTestModal} />}
				{doctorModal && <DoctorModal setDoctorModal={setDoctorModal} />}
				{dischargeModal && (
					<DischargeModal setDischargeModal={setDischargeModal} />
				)}
				<div className="ml-32 mt-7 flex justify-between pr-20">
					<Typography variant="h3" color="black">
						Emergency Ward Patients Record
					</Typography>
					{notificationCount > 0 ? (
						<Badge withBorder content={`${notificationCount}`}>
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
					setTestModal={setTestModal}
					setDoctorModal={setDoctorModal}
					setDischargeModal={setDischargeModal}
				/>
			</div>
		</>
	);
}

export default Patients;
