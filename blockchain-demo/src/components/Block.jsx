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
	Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { isValid, mine, propagateHashChange } from "../utils/BlockUtils";

export default function Block({ block, blocks, setBlocks }) {
	const [isMining, setIsMining] = React.useState(false);
	const [difficulty, setDifficulty] = React.useState(1);

	const valid = isValid(block, difficulty);

	const onDataChange = (e) => {
		block.data = e.target.value;
		updateBlock(block);
	};

	const onNonceChange = (e) => {
		block.nonce = e.target.value;
		updateBlock(block);
	};

	const updateBlock = (updatedBlock) => {
		let blocksCopy = [...blocks];
		blocksCopy[updatedBlock.id] = updatedBlock;
		const newBlocks = propagateHashChange(updatedBlock.id, blocksCopy);
		setBlocks(newBlocks);
	};

	const mineBlock = () => {
		setIsMining(true);
		setTimeout(() => {
			let blocksCopy = [...blocks];
			blocksCopy[block.id] = mine(block, difficulty);
			setBlocks(blocksCopy);
			setIsMining(false);
		}, 1000); // Simulate mining delay
	};

	const handleDifficultyChange = (event, newValue) => {
		setDifficulty(newValue);
	};

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
						<FilledInput
							id="nonce"
							type="number"
							value={block.nonce}
							onChange={onNonceChange}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }} variant="filled">
						<InputLabel>Data</InputLabel>
						<FilledInput
							id="data"
							defaultValue={block.data}
							multiline={true}
							onChange={onDataChange}
						/>
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
					<Box sx={{ m: 2 }}>
						<Typography gutterBottom>Difficulty</Typography>
						<Slider
							value={difficulty}
							min={1}
							max={5}
							step={1}
							marks
							onChange={handleDifficultyChange}
							valueLabelDisplay="auto"
						/>
					</Box>
				</CardContent>
				<CardActions>
					<Button variant="contained" onClick={mineBlock} disabled={isMining}>
						{isMining ? "Mining..." : "Mine"}
					</Button>
					{isMining && <CircularProgress size={24} sx={{ ml: 2 }} />}
				</CardActions>
			</Card>
		</Box>
	);
}
