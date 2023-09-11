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
import { isValid } from "../utils/BlockUtils";

export default function Block({ data, blocks, setBlocks }) {
	const valid = isValid(data)

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
				<CardHeader
					title={"Block #" + data.id}
					subheader={"Created: " + new Date(data.created).toISOString()}
				/>
				<CardContent>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Nonce</InputLabel>
						<FilledInput id="nonce" defaultValue={data.nonce} />
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Data</InputLabel>
						<FilledInput id="data" defaultValue={data.data} multiline={true} />
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Prev</InputLabel>
						<FilledInput
							id="prev"
							disabled={true}
							defaultValue={data.prev}
							multiline={true}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Hash</InputLabel>
						<FilledInput
							id="hash"
							disabled={true}
							defaultValue={data.hash}
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
