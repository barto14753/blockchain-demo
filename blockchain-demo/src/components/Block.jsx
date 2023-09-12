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
import { isValid, propagateHashChange } from "../utils/BlockUtils";

export default function Block({ block, blocks, setBlocks }) {
	const valid = isValid(block)

	const onDataChange = (e) => {
		block.data = e.target.value
		let blocksCopy = [...blocks]
		blocksCopy[block.id] = block
		const newBlocks = propagateHashChange(block.id, blocksCopy)
		setBlocks(newBlocks)
	}

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
					title={"Block #" + block.id}
					subheader={"Created: " + new Date(block.created).toISOString()}
				/>
				<CardContent>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Nonce</InputLabel>
						<FilledInput id="nonce" defaultValue={block.nonce} />
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Data</InputLabel>
						<FilledInput id="data" defaultValue={block.data} multiline={true} onChange={onDataChange} />
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Prev</InputLabel>
						<FilledInput
							id="prev"
							disabled={true}
							value={block.prev}
							multiline={true}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Hash</InputLabel>
						<FilledInput
							id="hash"
							disabled={true}
							value={block.hash}
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
