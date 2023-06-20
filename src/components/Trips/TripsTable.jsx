import React, { useState, useEffect, useContext } from "react";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import {
	UsersIcon,
	BeakerIcon,
	TruckIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
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

import { DetailContext } from "../../App";
import { LoginDetailsContext } from "../../App";

const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "User",
		value: "Y",
	},
	{
		label: "Ambulance",
		value: "N",
	},
];

const TABLE_HEAD = [
	{ label: "Type", value: "type" },
	{ label: "Patient Details", value: "patientData" },
	{ label: "Accident Details", value: "accidentDetails" },
	{ label: "Ambulance Details", value: "ambulanceDetails" },
	{ label: "Ward Details", value: "wardDetails" },
	{ label: "ID", value: "id" },
	{ label: "Authentication Video", value: "authenticationVideo" },
	{ label: "Add Details", value: "accept" },
	{ label: "Admit", value: "admit" },
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

function Table({ setModal, modal }) {
	const [data, setData] = useState([]);
	const [curData, setCurData] = useState([]);
	const [filter, setFilter] = useState("");
	const [curPage, setCurPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [numRows, setNumRows] = useState(5);

	const { detail, setDetail } = useContext(DetailContext);
	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	const getItemProps = (index) => ({
		variant: curPage === index ? "filled" : "text",
		color: curPage === index ? "blue" : "blue-gray",
		onClick: () => setCurPage(index),
	});

	const next = () => {
		if (curPage === totalPages) return;
		setCurPage(curPage + 1);
		setCurData(data.slice(curPage * numRows, (curPage + 1) * numRows));
	};

	const prev = () => {
		if (curPage === 1) return;
		setCurPage(curPage - 1);
		setCurData(
			data.slice((curPage - numRows) * numRows, (curPage - 1) * numRows)
		);
	};

	useEffect(() => {
		sendApiCall();
	}, []);

	useEffect(() => {
		setTotalPages(Math.ceil(data.length / numRows));
		// console.log(data);
	}, [data]);

	const sendApiCall = async () => {
		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/tripnotification/getHospitalNotification/`;
		// const url = 'http://127.0.0.1:8000/hospital/getCases/';
		const data = {
			email: loginDetails.email,
			password: loginDetails.password,
		};
		const headers = { "Content-Type": "application/json" };
		// console.log(data);
		try {
			const response = await axios.post(url, JSON.stringify(data), {
				headers,
			});
			console.log(response.data);
			setData(response.data);
			setCurData(response.data.slice(0, numRows));
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
											return row.isUserApp
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
							label="Search"
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
									ambulanceLicense,
									conscious,
									document,
									driverName,
									driverPhone,
									estimatedTimeOfArrival,
									hospital,
									id,
									isUserApp,
									location,
									name,
									natureOfEmergency,
									startLocation,
									startTime,
									video,
								},
								index
							) => {
								const isLast = index === data.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr
										key={index}
										onClick={() => {
											setDetail({
												ambulanceLicense,
												conscious,
												document,
												driverName,
												driverPhone,
												estimatedTimeOfArrival,
												hospital,
												id,
												isUserApp,
												location,
												name,
												natureOfEmergency,
												startLocation,
												startTime,
												video,
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
														{isUserApp === "Y" ? (
															<UserIcon className="h-8 w-8" />
														) : (
															<TruckIcon className="h-8 w-8" />
														)}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<div className="flex flex-col">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal"
													>
														{}
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
													{natureOfEmergency}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{location} |{" "}
													{conscious === "Y" ? "Conscious" : "Unconscious"}
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
													{driverName}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{driverPhone}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
													{ambulanceLicense}
												</Typography>
											</div>
										</td>
										<td>Hello</td>
										<td>
											<div>
												<Button
													className="w-20"
													onClick={() => {
														setModal({ type: "image", url: document });
													}}
												>
													ID
												</Button>
											</div>
										</td>
										<td className={classes}>
											<Button
												onClick={() => {
													setModal({ type: "video", url: video });
												}}
											>
												{" "}
												Auth Video
											</Button>
										</td>
										<td className={classes}>
											<Button onClick={() => setModal({ type: "addDetails" })}>
												Add Details
											</Button>
										</td>
										<td className={classes}>
											<Button
												onClick={() => {
													if (
														!(
															detail.name &&
															detail.bloodGroup &&
															detail.ward &&
															detail.bed &&
															detail.gender
														)
													 )
													 return toast.error("Enter the Patient Details");
														setModal({ type: "accept" });
												}}
											>
												Admit
											</Button>
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
					Page {curPage} of {totalPages}
				</Typography>
				<div className="flex items-center gap-4">
					<Button
						variant="text"
						color="blue-gray"
						className="flex items-center gap-2"
						onClick={prev}
						disabled={curPage === 1}
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
						disabled={curPage === totalPages}
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
