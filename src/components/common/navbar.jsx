import React from "react";
import Logo from "../../assets/logo.png";
import {
	Badge,
   Typography,
	IconButton
}
from "@material-tailwind/react";
import { TruckIcon } from "@heroicons/react/24/solid";

function navbar({setPage}) {
	return (
		<div className="bg-gray-300 h-14 flex justify-between items-center px-5 pl-10">
         <img src={Logo} alt="logo" className="h-12 w-24"/>
			<div className="flex items-center">
			<Typography variant="h5" color="black">
            St. John’s Hospital - Koramangla
         </Typography>
			</div>
		</div>
	);
}

export default navbar;
