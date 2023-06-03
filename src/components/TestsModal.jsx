import React from 'react'

import {
	Typography,
	Button,
	Checkbox,
	ListItemPrefix,
	ListItem,
	List,
} from "@material-tailwind/react";

function TestsModal({ setTestModal, sampleData }) {
	return (
		<>
			<div
				className="bg-black opacity-25 absolute top-14 left-0 h-[100%] w-[100%] z-20 overflow-hidden"
				onClick={() => {
					setTestModal(false);
				}}
			></div>
			<div className="bg-white opacity-100 absolute top-14 left-0 max-h-[80vh] w-[40%] ml-[30%] mt-20 z-30 rounded-2xl border-2 border-background p-1">
				<div className="rounded-2xl overflow-auto max-h-[75vh]">
					<div className="flex items-center p-9">
						<Typography variant="h3" color="black" className="">
							Tests & Treatments
						</Typography>
					</div>
					<hr className="mt-[-2rem] border-gray-300 w-[90%] m-[auto]" />
					<div className="px-9 py-1">
						<Typography variant="h6" color="black" className="">
							<div>{sampleData.name}</div>
						</Typography>
						<div>
							<Typography variant="small" color="black" className="">
								{sampleData.age} | {sampleData.gender} | {sampleData.bloodGroup}{" "}
								| {sampleData.consciousness}
							</Typography>
						</div>
					</div>
					<div className="px-4">
               <Typography variant="h5" color="black" className="p-5">
							Tests
						</Typography>
						<hr className="mt-[-1rem] border-gray-300 w-[95%] m-[auto]" />
						<List>
							{sampleData.tests.map((test) => {
								return (
									<ListItem key={test} className="p-0">
										<label
											htmlFor={test}
											className="px-3 py-2 flex items-center w-full cursor-pointer"
										>
											<ListItemPrefix className="mr-3">
												<Checkbox
													id={test}
													ripple={false}
													className="hover:before:opacity-0"
													containerProps={{
														className: "p-0",
													}}
												/>
											</ListItemPrefix>
											<Typography
												color="blue-gray"
												className="font-medium pl-4"
											>
												{test}
											</Typography>
										</label>
									</ListItem>
								);
							})}
						</List>
					</div>
					<div className="px-4">
						<Typography variant="h5" color="black" className="p-5">
							Treatments
						</Typography>
						<hr className="mt-[-1rem] border-gray-300 w-[95%] m-[auto]" />
						<div>
							<List>
								{sampleData.treatments.map((test) => {
									return (
										<ListItem key={test} className="p-0">
											<label
												htmlFor={test}
												className="px-3 py-2 flex items-center w-full cursor-pointer"
											>
												<ListItemPrefix className="mr-3">
													<Checkbox
														id={test}
														ripple={false}
														className="hover:before:opacity-0"
														containerProps={{
															className: "p-0",
														}}
													/>
												</ListItemPrefix>
												<Typography
													color="blue-gray"
													className="font-medium pl-4"
												>
													{test}
												</Typography>
											</label>
										</ListItem>
									);
								})}
							</List>
						</div>
					</div>
					<div className="text-center pt-4">
						<Button className="m-auto">
							<Typography variant="small" color="white">
								Submit
							</Typography>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}

export default TestsModal
