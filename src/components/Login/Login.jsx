import React, { useState, useRef, useContext } from "react";
import { getToken } from "firebase/messaging";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { toast } from "react-toastify";
import { LoginDetailsContext } from "../../App";
import { messaging } from "../../firebase";

import axios from "axios";

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

function Login({ setPage }) {
	const [loading, setLoading] = useState(false);

	const emailInputElement = useRef();
	const passwordInputElement = useRef();

	const { loginDetails, setLoginDetails } = useContext(LoginDetailsContext);

	function handleLogin() {
		setLoading(true);
		if (
			!emailInputElement.current?.value ||
			!passwordInputElement.current?.value
		) {
			toast.error("Please fill all the fields", toastOptions);
			setLoading(false);
			return;
		}

		const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
		if (!emailRegex.test(emailInputElement.current?.value)) {
			toast.error("Please enter a valid email", toastOptions);
			setLoading(false);
			return;
		}

		const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/hospitalLogin/`;
		const data = {
			email: emailInputElement.current?.value,
			password: passwordInputElement.current?.value,
		};
		console.log(data);
		const headers = { "Content-Type": "application/json" };

		axios
			.post(url, JSON.stringify(data), { headers })
			.then((response) => {
				console.log(response)
				return response.data.hospital;} )
			.then((data) => {
				console.log(data.hospital);
				// Set login in local storage
				localStorage.setItem("login", true);

				toast.success("Login successful", toastOptions);
				setLoginDetails({
					email: emailInputElement.current?.value,
					password: passwordInputElement.current?.value,
					name: data.name,
					hospitalAddress: `${data.address}, ${data.city}`,
					address: data.address,
					bedcount: data.bedcount,
					city: data.city,
					hospital_email: data.email,
					erstatus: data.erstatus,
					id: data.id,
					phone: data.phone,
					pincode: data.pincode,
					state: data.state,
					website: data.website,
				});

				localStorage.setItem("email", emailInputElement.current?.value);
				localStorage.setItem("password", passwordInputElement.current?.value);
				localStorage.setItem("name", data.name);
				localStorage.setItem("hospitalAddress", `${data.address}, ${data.city}`);

				setTimeout(() => {
					setPage("patients");
					setLoading(false);
				}, 1000);
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.response.data.detail, toastOptions);
				setLoading(false);
			});
	}

	return (
		<>
			<div className="flex justify-center mt-20">
				<Card color="transparent" shadow={false}>
					<Typography variant="h4" color="blue-gray" className="text-center">
						Login
					</Typography>
					<Typography color="gray" className="mt-1 font-normal text-center">
						Enter your credentials by us and login to your account
					</Typography>
					<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
						<div className="mb-4 flex flex-col gap-6">
							{/* <Input size="lg" label="Name" inputRef={nameInputElement} /> */}
							<Input size="lg" label="Email" inputRef={emailInputElement} />
							<Input
								type="password"
								size="lg"
								label="Password"
								inputRef={passwordInputElement}
							/>
						</div>
						{/* <Checkbox
          label={
            (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="https://www.rksh-impact.com"
                  className="font-medium transition-colors hover:text-blue-500"
                  _target="blank"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            )
          }
          containerProps={{ className: "-ml-2.5" }}
        /> */}
						<Button
							className="mt-10"
							fullWidth
							disabled={loading}
							onClick={handleLogin}
						>
							Login
						</Button>
						{/* <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography> */}
					</form>
				</Card>
			</div>
		</>
	);
}

export default Login;
