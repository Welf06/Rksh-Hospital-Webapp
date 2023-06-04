import React, { useState, useRef, useEffect } from "react";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";
import {
	UserIcon,
	PencilSquareIcon,
	CurrencyRupeeIcon,
	Bars3Icon,
	ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import {
	ChevronRightIcon,
	ChevronDownIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";

import { useOnClickOutside } from "../utils/useClickOutside";

function SidebarMenu({ setMenuOpen, setPage, setModal }) {
	const [open, setOpen] = useState(0);
	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};
	return (
		<Card className="absolute top-14 left-0 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-white-900/5 bg-background text-white rounded-none z-50">
			<ArrowLeftIcon
				className="h-6 w-6 text-white absolute top-4 right-4 cursor-pointer"
				onClick={() => setMenuOpen(false)}
			/>
			<div className="mb-2 p-4 pt-12">
				<div className="flex justify-left items-center gap-4">
					<UserCircleIcon className="h-12 w-12 text-white" />
					<div className="flex flex-col justify-left items-start">
						<Typography variant="h5" color="white">
							St. John’s Hospital
						</Typography>
						<Typography variant="small" color="white">
							Koramangla
						</Typography>
					</div>
				</div>
			</div>
			<List className="text-white">
				<Accordion
					open={open === 1}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${
								open === 1 ? "rotate-180" : ""
							}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 1}>
						<AccordionHeader
							onClick={() => handleOpen(1)}
							className="border-b-0 p-3 text-white"
						>
							<ListItemPrefix>
								<UserIcon className="h-5 w-5 text-white" />
							</ListItemPrefix>
							<Typography
								variant="h5"
								color="white"
								className="mr-auto font-normal"
							>
								Patients
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1 text-white">
						<List className="p-0 pl-10 text-white">
							<ListItem
								onClick={() => {
									setPage("patients");
									setMenuOpen(false);
								}}
							>
								Ongoing
							</ListItem>
							<ListItem
								onClick={() => {
									setPage("completed");
									setMenuOpen(false);
								}}
							>
								Completed
							</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 2}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform text-white ${
								open === 2 ? "rotate-180" : ""
							}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 2}>
						<AccordionHeader
							onClick={() => handleOpen(2)}
							className="border-b-0 p-3 text-white"
						>
							<ListItemPrefix>
								<PencilSquareIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography
								variant="h5"
								color="white"
								className="mr-auto font-normal"
							>
								Edit/Add
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0 pl-10 text-white">
							<ListItem
								onClick={() => {
									setModal("doctors");
									setMenuOpen(false);
								}}
							>
								Doctors
							</ListItem>
							<ListItem
								onClick={() => {
									setModal("tests");
									setMenuOpen(false);
								}}
							>Tests</ListItem>
							<ListItem
								onClick={() => {
									setModal("treatments");
									setMenuOpen(false);
								}}>Treatments</ListItem>
							<ListItem>Beds</ListItem>
							{/* <ListItem>Ambulances</ListItem> */}
							<ListItem>Patients</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
				<Accordion
					open={open === 3}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${
								open === 3 ? "rotate-180" : ""
							}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 3}>
						<AccordionHeader
							onClick={() => handleOpen(3)}
							className="border-b-0 p-3 text-white"
						>
							<ListItemPrefix>
								<CurrencyRupeeIcon className="h-5 w-5 text-white" />
							</ListItemPrefix>
							<Typography
								variant="h5"
								color="white"
								className="mr-auto font-normal"
							>
								Prices
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1 text-white">
						<List className="p-0 pl-10 text-white">
							<ListItem>Tests</ListItem>
							<ListItem>Treatments</ListItem>
							<ListItem>Ambulances</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
			</List>
		</Card>
	);
}

export default function Sidebar({ setPage, setModal }) {
	const [open, setMenuOpen] = useState(false);
	const node = useRef();

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [open]);

	const handleOpen = () => {
		setMenuOpen(true);
	};

	// useOnClickOutside(node, () => setMenuOpen(false));
	return (
		<>
			<Bars3Icon
				className="h-12 w-12 ml-10 cursor-pointer absolute left-4 top-20"
				onClick={() => {
					setMenuOpen(true);
				}}
			/>
			{open && (
				<SidebarMenu
					setMenuOpen={setMenuOpen}
					setPage={setPage}
					setModal={setModal}
				/>
			)}
			{open && (
				<div
					className="bg-black opacity-25 absolute top-14 left-0 h-[100%] w-[100%] z-10 "
					onClick={() => {
						setMenuOpen(false);
					}}
				></div>
			)}
		</>
	);
}
