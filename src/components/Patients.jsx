import React, { useState } from "react";

import TestsModal from "./TestsModal";
import DoctorModal from "./DoctorModal";
import DischargeModal from "./DischargeModal";
import { Typography } from "@material-tailwind/react";


import Table from "./Table";



function Patients() {
	const [testModal, setTestModal] = useState(false);
	const [doctorModal, setDoctorModal] = useState(false);
	const [dischargeModal, setDischargeModal] = useState(false);
	return (
		<>
			<div className="overflow-hidden">
				{testModal && <TestsModal setTestModal={setTestModal} />}
				{doctorModal && (
					<DoctorModal
						setDoctorModal={setDoctorModal}
					/>
				)}
				{dischargeModal && (
					<DischargeModal setDischargeModal={setDischargeModal} />
				)}
				{/* {doctorModal && <DoctorModal setDoctorModal={setDoctorModal} />} */}
				<Typography variant="h3" color="black" className="ml-32 mt-7">
					Emergency Ward Patients Record
				</Typography>
				<Table setTestModal={setTestModal} setDoctorModal={setDoctorModal} setDischargeModal={setDischargeModal}/>
			</div>
		</>
	);
}

export default Patients;
