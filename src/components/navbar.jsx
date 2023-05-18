import React from "react";
import Logo from "../assets/logo.png";
import {
   Typography
}
from "@material-tailwind/react";

function navbar() {
	return (
		<div className="bg-gray-300 h-14 flex justify-between items-center px-5 pl-10">
         <img src={Logo} alt="logo" className="h-12 w-24"/>
			<Typography variant="h5" color="black">
            St. John’s Hospital - Koramangla
         </Typography>
		</div>
	);
}

export default navbar;
