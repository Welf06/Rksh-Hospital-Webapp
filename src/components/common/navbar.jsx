import {useContext} from "react";
import Logo from "../../assets/logo.png";
import {
	Badge,
   Typography,
	IconButton
}
from "@material-tailwind/react";

import { LoginDetailsContext } from "../../App";

function Navbar({setPage}) {
	const {loginDetails} = useContext(LoginDetailsContext);
	return (
		<div className="bg-gray-300 h-14 flex justify-between items-center px-5 pl-10">
         <img src={Logo} alt="logo" className="h-12 w-24"/>
			<div className="flex items-center">
			<Typography variant="h5" color="black">
            {loginDetails.name}
         </Typography>
			</div>
		</div>
	);
}

export default Navbar;
