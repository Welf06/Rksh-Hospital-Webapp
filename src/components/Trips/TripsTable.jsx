import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import {
	TruckIcon,
	UserIcon,
	IdentificationIcon,
	VideoCameraIcon,
	PencilSquareIcon
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


import { DetailContext } from "../../App";

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
	{ label: "Ward", value: "wardDetails" },
	{ label: "Patient", value: "patientData" },
	{ label: "Accident Details", value: "accidentDetails" },
	{ label: "Ambulance Details", value: "ambulanceDetails" },
	{ label: "ID", value: "id" },
	{ label: "Video", value: "authenticationVideo" },
	{ label: "Details", value: "accept" },
	{ label: "Admit", value: "admit" },
];


function Table({ setModal, modal, curData, setCurData, data, setData, numRows, setNumRows, sendApiCall}) {
	const [filter, setFilter] = useState("");
	const [curPage, setCurPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const { detail, setDetail } = useContext(DetailContext);

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

	const formatTime = (time) => {
		// input format - 2023-06-23T20:57:14.126377+05:30
		const date = new Date(time);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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
									className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 text-center"
									onClick={() => {
										const newData = [...data];
										newData.sort((a, b) => {
											let value1, value2;
											if (value === "patientData") {
												value1 = a.name;
												value2 = b.name;
											} else if (value === "accidentDetails") {
												value1 = a.startTime;
												value2 = b.startTime;
											} else if (value === "wardDetails") {
												value1 = `${a.ward}${a.bed}`;
												value2 = `${b.ward}${b.bed}`;
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
											value === "wardDetails") && (
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
									age,
									ambulanceLicense,
									bed,
									bloodGroup,
									consciousness,
									document,
									driverName,
									driverPhone,
									estimatedTimeOfArrival,
									gender,
									hospital,
									id,
									isUserApp,
									location,
									name,
									natureOfEmergency,
									startLocation,
									startTime,
									video,
									ward,
								},
								index
							) => {
								const isLast = index === data.length - 1;
								const classes = isLast
									? "p-2"
									: "p-2 border-b border-blue-gray-50";

								return (
									<tr
										key={index}
										onClick={() => {
											setDetail({
												age,
												ambulanceLicense,
												bed,
												bloodGroup,
												consciousness,
												document,
												driverName,
												driverPhone,
												estimatedTimeOfArrival,
												gender,
												hospital,
												id,
												isUserApp,
												location,
												name,
												natureOfEmergency,
												startLocation,
												startTime,
												video,
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
														{isUserApp === "Y" ? (
															<UserIcon className="h-8 w-8" />
														) : (
															<TruckIcon className="h-8 w-8" />
														)}
													</Typography>
												</div>
											</div>
										</td>
										<td>
											<div className="flex flex-col items-center justify-center">
											<Typography
													variant="medium"
													color="blue-gray"
													className="font-normal"
												>
												{ward !== null && bed !== null ? (
														<>{ward} | {bed}</>
													):(<></>)}
												</Typography>
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
														{name}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal opacity-70"
													>
													{age !== null && `${age} | `}{gender !== null && `${gender} | `}{bloodGroup !== null && bloodGroup}
														
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
													{formatTime(startTime)}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal opacity-70"
												>
												{natureOfEmergency} | {" "}
													{consciousness === "Y" ? "Conscious" : "Unconscious"}
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

										<td className={`${classes} text-center`}>
											<div>
												<Button
												className="w-15 text-center p-2"
													onClick={() => {
														setModal({ type: "image", url: document });
													}}
												>
													<IdentificationIcon
														className="h-6 w-6"
														/>
												</Button>
											</div>
										</td>
										<td className={`${classes} text-center`}>
											<Button
											className="w-15 text-center p-2"
												onClick={() => {
													setModal({ type: "video", url: video });
												}}
											>
												<VideoCameraIcon
													className="h-6 w-6"
													/>
											</Button>
										</td>
										<td className={`${classes} text-center`}>
											<Button 
											className="w-15 text-center p-2"
											onClick={() => setModal({ type: "addDetails" })}>
												<PencilSquareIcon
													className="h-6 w-6"
													/> 
											</Button>
										</td>
										<td className={`${classes} text-center`}>
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
														return toast.error("Enter the Patient Details", toastOptions);
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
