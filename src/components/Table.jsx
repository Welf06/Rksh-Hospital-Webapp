import React, { useState, useEffect, useContext } from "react";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import { UsersIcon, BeakerIcon } from "@heroicons/react/24/solid";
import {
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
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
	IconButton,
} from "@material-tailwind/react";

import { toast } from "react-toastify";

import { DetailContext } from "../App";
import { LoginDetailsContext } from "../App";

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
	{ label: "Bed No.", value: "bedNo" },
	{ label: "Patient Name", value: "patientData" },
	{ label: "Accident Details", value: "accidentDetails" },
	{ label: "Guardian Details", value: "guardianDetails" },
	{ label: "Ward Details", value: "wardDetails" },
	{ label: "Medical Procedures", value: "medicalProcedures" },
	{ label: "Discharge", value: "discharge" },
];

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

function Table({ setTestModal, setDoctorModal, setDischargeModal }) {
	const [data, setData] = useState([]);
	const [curData, setCurData] = useState([]);
	const [filter, setFilter] = useState("");
	const [active, setActive] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(10);

	const { detail, setDetail } = useContext(DetailContext);
	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	const getItemProps = (index) => ({
		variant: active === index ? "filled" : "text",
		color: active === index ? "blue" : "blue-gray",
		onClick: () => setActive(index),
	});

	const next = () => {
		if (active === 5) return;

		setActive(active + 1);
	};

	const prev = () => {
		if (active === 1) return;

		setActive(active - 1);
	};

	useEffect(() => {
		sendApiCall();
	}, []);

	useEffect(() => {
		setTotalPages(Math.ceil(data.length / 10));
		// console.log(data);
	}, [data]);

   const sendApiCall = async () => {
			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/getCases/`;
			// const url = 'http://127.0.0.1:8000/hospital/getCases/';

			const data = {
				email: loginDetails.email,
				password: loginDetails.password,
			};

			const headers = { "Content-Type": "application/json" };
			console.log(data);
			try {
				const response = await axios.post(url, JSON.stringify(data), {
					headers,
				});
				console.log(response.data.cases);
				setData(response.data.cases);
				setCurData(response.data.cases.slice(0, 10));
				// Handle the response data here
			} catch (error) {
				console.error(error);
				toast.error(error.response.data.detail, toastOptions);
				// Handle the error here
			}
		};

	const handleSearch = (e) => {
		if (e.target.value !== "") {
			const newData = curData.filter((row) => {
				return row.name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setCurData(newData);
		} else {
			const newData = data.filter((row) => {
				return row.ward.toLowerCase().includes(filter.toLowerCase());
			});
			setCurData(newData);
		}
	};

	return (
		<Card className="h-full w-full px-14">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-4">
					<Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab
									key={value}
									value={value}
									onClick={() => {
										if (value === "all") {
											setFilter("all");
											setCurData(data);
											return;
										}

										const newData = data.filter((row) => {
											return row.ward
												.toLowerCase()
												.includes(value.toLowerCase());
										});
										setFilter(value);
										setCurData(newData);
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
			<CardBody className="p-0 overflow-scroll px-0">
				<table className="w-full min-w-max table-auto text-left">
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
												value1 = a.name;
												value2 = b.name;
											} else if (value === "accidentDetails") {
												value1 = a.emergencyType;
												value2 = b.emergencyType;
											} else if (value === "bedNo") {
												value1 = a.bed;
												value2 = b.bed;
											}

											if (value1 < value2) {
												return -1;
											}
											if (value1 > value2) {
												return 1;
											}
											return 0;
										});
										setCurData(newData);
									}}
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
									>
										{label}{" "}
										{(value === "patientData" ||
											value === "accidentDetails" ||
											value === "bedNo") && (
											<ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
										)}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{curData.map(
							(
								{
									accidentLocation,
									accidentTime,
									age,
									bed,
									bloodGroup,
									consciousness,
									emergencyType,
									gender,
									guardianApproval,
									guardianName,
									hospital,
									id,
									name,
									status,
									volunteer,
									ward,
								},
								index
							) => {
								const isLast = index === data.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr
										key={name}
										onClick={() => {
											setDetail({
												accidentLocation,
												accidentTime,
												age,
												bed,
												bloodGroup,
												consciousness,
												emergencyType,
												gender,
												guardianApproval,
												guardianName,
												hospital,
												id,
												name,
												status,
												volunteer,
												ward,
											});
										}}
									>
										<td className={classes}>
											<div className="flex items-center gap-3">
												{/* <Avatar src={img} alt={name} size="sm" /> */}
												<div className="flex flex-col">
													<Typography
														variant="lead"
														color="blue-gray"
														className="font-normal"
													>
														{bed}
													</Typography>
												</div>
											</div>
										</td>
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
														{`${age} | ${gender} | ${
															bloodGroup ? bloodGroup : "A+ve"
														} | ${
															consciousness === "Y"
																? "conscious"
																: "unconscious"
														}`}
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
													{emergencyType}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{accidentLocation}
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
													{guardianApproval}
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
													variant={ward === "EW" ? "filled" : "outlined"}
													color="blue"
												/>
												<Chip
													value="ICU"
													variant={ward === "ICU" ? "filled" : "outlined"}
													color="blue"
												/>
												<Chip
													value="GW"
													variant={ward === "GW" ? "filled" : "outlined"}
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
											<Button
                                 onClick={() => {setDischargeModal(true)}}
                                 >Discharge</Button>
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
				<div className="flex items-center gap-4">
					<Button
						variant="text"
						color="blue-gray"
						className="flex items-center gap-2"
						onClick={prev}
						disabled={active === 1}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
					</Button>
					<div className="flex items-center gap-2">
						{Array.from(Array(totalPages)).map((page, index) => {
							<IconButton key={index} {...getItemProps(index)}>
								{index}
							</IconButton>;
						})}
					</div>
					<Button
						variant="text"
						color="blue-gray"
						className="flex items-center gap-2"
						onClick={next}
						disabled={active === 5}
					>
						Next
						<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}

export default Table;
