import React, { useState } from "react";

import TestsModal from "./TestsModal";
import DoctorModal from "./DoctorModal";
import { Typography } from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DetailContext } from "../App";

import Table from "./Table";

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

const sampleData = {
	name: "John Doe",
	age: 25,
	gender: "M",
	bloodGroup: "O+",
	consciousness: "Conscious",
	tests: ["XRay", "MRI", "CT Scan", "Endoscopy", "Biopsy"],
	treatments: ["Surgery", "Medication", "Physiotherapy", "Radiation Therapy"],
};

function Patients() {
	const [testModal, setTestModal] = useState(false);
	const [doctorModal, setDoctorModal] = useState(false);
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="overflow-hidden">
				{testModal && (
					<TestsModal setTestModal={setTestModal} sampleData={sampleData} />
				)}
				{doctorModal && (
					<DoctorModal
						setDoctorModal={setDoctorModal}
						sampleData={sampleData}
					/>
				)}
				{/* {doctorModal && <DoctorModal setDoctorModal={setDoctorModal} />} */}
				<Typography variant="h3" color="black" className="ml-32 mt-7">
					Emergency Ward Patients Record
				</Typography>
				<Table setTestModal={setTestModal} setDoctorModal={setDoctorModal} />
			</div>
		</>
	);
}

export default Patients;
