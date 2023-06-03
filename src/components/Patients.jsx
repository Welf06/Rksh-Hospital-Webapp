import React, { useState, useEffect } from "react";

import TestsModal from "./TestsModal";
import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import { UsersIcon, BeakerIcon } from "@heroicons/react/24/solid";
import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tabs,
	TabsHeader,
	Tab,
	Checkbox,
	ListItemPrefix,
	ListItem,
	List,
} from "@material-tailwind/react";

const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "EW",
		value: "EW",
	},
	{
		label: "ICU",
		value: "ICU",
	},
	{
		label: "GW",
		value: "GW",
	},
];

const TABLE_HEAD = [
	{ label: "Patient Data", value: "patientData" },
	{ label: "Accident Details", value: "accidentDetails" },
	{ label: "Guardian Details", value: "guardianDetails" },
	{ label: "Ward Details", value: "wardDetails" },
	{ label: "Medical Procedures", value: "medicalProcedures" },
	{ label: "Discharge", value: "discharge" },
];

const TABLE_ROWS = [
	{
		patientData: {
			name: "Mary Smith",
			age: 25,
			gender: "F",
			bloodGroup: "A-ve",
			consciousness: "Unconscious",
		},
		accidentDetails: {
			type: "Fall",
			location: "Home",
		},
		guardianDetails: {
			guardianName: "Jane Doe",
			approval: "Pending",
			volunteer: "",
		},
		wardDetails: "GW",
		medicalProcedures: "X-ray, CT scan",
	},
	{
		patientData: {
			name: "Peter Jones",
			age: 65,
			gender: "M",
			bloodGroup: "O+ve",
			consciousness: "Conscious",
		},
		accidentDetails: {
			type: "Heart Attack",
			location: "Home",
		},
		guardianDetails: {
			guardianName: "Susan Jones",
			approval: "Approved",
			volunteer: "John Doe",
		},
		wardDetails: "ICU",
		medicalProcedures: "Angiogram, Stent",
	},
	{
		patientData: {
			name: "Sarah Williams",
			age: 17,
			gender: "F",
			bloodGroup: "AB-ve",
			consciousness: "Unconscious",
		},
		accidentDetails: {
			type: "Car Accident",
			location: "Highway 101",
		},
		guardianDetails: {
			guardianName: "David Williams",
			approval: "Pending",
			volunteer: "",
		},
		wardDetails: "GW",
		medicalProcedures: "X-ray, CT scan, Surgery",
	},
	{
		patientData: {
			name: "Michael Brown",
			age: 45,
			gender: "M",
			bloodGroup: "A+ve",
			consciousness: "Conscious",
		},
		accidentDetails: {
			type: "Stroke",
			location: "Work",
		},
		guardianDetails: {
			guardianName: "Linda Brown",
			approval: "Approved",
			volunteer: "Mary Smith",
		},
		wardDetails: "EW",
		medicalProcedures: "Medication, Physical Therapy",
	},
];
function Table({ setTestModal, setDoctorModal }) {
	const [data, setData] = useState(TABLE_ROWS);
	const [filerData, setFilterData] = useState(TABLE_ROWS);

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			const newData = filerData.filter((row) => {
				return row.patientData.name
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			});
			setData(newData);
		} else {
			setData(filerData);
		}
	};
	return (
		<Card className="h-full w-full px-14">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab
									key={value}
									value={value}
									onClick={() => {
										if (value === "all") {
											setData(TABLE_ROWS);
											return;
										}

										const newData = TABLE_ROWS.filter((row) => {
											return row.wardDetails
												.toLowerCase()
												.includes(value.toLowerCase());
										});
										setData(newData);
										setFilterData(newData);
									}}
								>
									&nbsp;&nbsp;{label}&nbsp;&nbsp;
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
					<div className="w-full md:w-72 pt-1">
						<Input
							label="Search Patient Name"
							icon={<MagnifyingGlassIcon className="h-6 w-6 p-1" />}
							onChange={handleSearch}
						/>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="mt-4 w-full min-w-max table-auto text-left">
					<thead>
						<tr>
							{TABLE_HEAD.map(({ label, value }, index) => (
								<th
									key={label}
									className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
									onClick={() => {
										const newData = [...data];
										newData.sort((a, b) => {
											let value1, value2;
											if (value === "patientData") {
												value1 = a[value].name;
												value2 = b[value].name;
											} else if (value === "accidentDetails") {
												value1 = a[value].type;
												value2 = b[value].type;
											}

											if (value1 < value2) {
												return -1;
											}
											if (value1 > value2) {
												return 1;
											}
											return 0;
										});
										setData(newData);
									}}
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
									>
										{label}{" "}
										{(value === "patientData" ||
											value === "accidentDetails") && (
											<ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
										)}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map(
							(
								{
									patientData: { name, age, gender, bloodGroup, consciousness },
									accidentDetails: { type, location },
									guardianDetails: { guardianName, approval, volunteer },
									wardDetails,
									medicalProcedures,
								},
								index
							) => {
								const isLast = index === data.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr key={name}>
										<td className={classes}>
											<div className="flex items-center gap-3">
												{/* <Avatar src={img} alt={name} size="sm" /> */}
												<div className="flex flex-col">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal"
													>
														{name}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal opacity-70"
													>
														{`${age} | ${gender} | ${bloodGroup} | ${consciousness}`}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
												>
													{type}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{location}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{guardianName}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{approval}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{volunteer}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="w-max flex gap-2 color t">
												{/* <Chip
													variant="ghost"
													size="sm"
													value={wardDetails ? "online" : "offline"}
													color={wardDetails ? "green" : "blue-gray"}
												/> */}
												<Chip
													value="EW"
													variant={wardDetails === "EW" ? "filled" : "outlined"}
													color="blue"
												/>
												<Chip
													value="ICU"
													variant={
														wardDetails === "ICU" ? "filled" : "outlined"
													}
													color="blue"
												/>
												<Chip
													value="GW"
													variant={wardDetails === "GW" ? "filled" : "outlined"}
													color="blue"
												/>
											</div>
										</td>
										<td className={classes}>
											<div className="flex gap-4 ">
												<div className="">
													<div
														className="cursor-pointer flex-col justify-center items-center"
														onClick={() => {
															setDoctorModal(true);
														}}
													>
														<UsersIcon
															className="h-10 w-10 bg-blue-500 rounded p-1"
															color="white"
														/>
														<Typography
															variant="small"
															color="blue-gray"
															className="font-normal opacity-70"
														>
															Doctors
														</Typography>
													</div>
												</div>
												<div
													className="cursor-pointer z-1000"
													onClick={() => {
														setTestModal(true);
													}}
												>
													<BeakerIcon
														className="h-10 w-10 bg-blue-500 rounded p-1"
														color="white"
													/>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal opacity-70"
														S
													>
														Tests
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<Button>Discharge</Button>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 of 10
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" color="blue-gray" size="sm">
						Previous
					</Button>
					<Button variant="outlined" color="blue-gray" size="sm">
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}

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
			<div className="overflow-hidden">
				{testModal && <TestsModal setTestModal={setTestModal} sampleData={sampleData}/>}
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
