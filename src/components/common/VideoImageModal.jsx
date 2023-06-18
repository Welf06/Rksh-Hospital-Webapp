import React from "react";

import { Card, Typography, Button, Input } from "@material-tailwind/react";

function ImageModal({url}) {
	return (
		<img
			alt="id"
			style={{
				objectFit: "cover",
				objectPosition: "center",
				width: "100%",
				maxHeight: "100%",
				borderRadius: "10px",
			}}
			src={ 
            url ? url :
				"https://mswordidcards.com/wp-content/uploads/2018/05/Non-government-organization-id-card-1-CRC.jpg"
			}
		></img>
	);
}

function VideoModal({url}) {
	return (
		<video
			controls
			style={{
				objectFit: "cover",
				objectPosition: "center",
				width: "100%",
				maxHeight: "100%",
				borderRadius: "10px",
			}}
		>
			<source
				src={
               url ? url :
					"https://static.vecteezy.com/system/resources/previews/015/548/935/mp4/2023-neon-effect-free-video.mp4"
				}
				type="video/mp4"
			/>
		</video>
	);
}
function VideoImageModal({ modal, setModal }) {
   console.log(modal)
	return (
		<>
			{modal === "" && <></>}
			{modal !== "" && (
				<div>
					<div
						className="bg-black opacity-25 absolute top-14 left-0 h-[125vh] w-[100%] z-20 overflow-hidden"
						onClick={() => {
							setModal("");
						}}
					></div>
					<Card className="bg-white opacity-100 absolute top-0 left-0 min-h-[70vh] max-h-[120vh] w-[60%] ml-[20%] mt-20 z-30 rounded-2xl border-2 border-background p-1">
						{modal.type === "video" && <VideoModal url={modal.url} />}
						{modal.type === "image" && <ImageModal url={modal.url}/>}
					</Card>
				</div>
			)}
		</>
	);
}

export default VideoImageModal;
