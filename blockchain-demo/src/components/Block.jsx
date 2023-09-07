import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
	Box,
	CardHeader,
	FilledInput,
	FormControl,
	InputLabel,
} from "@mui/material";

export default function Block() {
	const valid = true;
	return (
		<Box sx={{ p: 2 }}>
			<Card
				sx={{
					width: 500,
					minHeight: 500,
					p: 1,
					background: valid ? "#C9C9C9" : "#ef5350",
				}}
			>
				<CardHeader title="Block #1" subheader="Created: " />
				<CardContent>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Nonce</InputLabel>
						<FilledInput id="nonce" defaultValue={123} />
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Data</InputLabel>
						<FilledInput
							id="data"
							defaultValue="This is block data"
							multiline={true}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Prev</InputLabel>
						<FilledInput
							id="prev"
							defaultValue="0000000000000000000000000000000000000000000000000000000000000000"
							multiline={true}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Hash</InputLabel>
						<FilledInput
							id="hash"
							defaultValue="00007a6453500118280ce6d1e20b66e3f9feb2f24b834f18c7a3698e8fd892a2"
							multiline={true}
						/>
					</FormControl>
				</CardContent>
				<CardActions>
					<Button variant="contained">Mine</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
