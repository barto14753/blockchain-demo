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
import {
	isValid,
	mineGenerator,
	propagateHashChange,
} from "../utils/BlockUtils";

export default function Block({ block, blocks, setBlocks }) {
	const [isMining, setIsMining] = React.useState(false);
	const [difficulty, setDifficulty] = React.useState(1);
	const [executionTime, setExecutionTime] = React.useState(0);
	const [currentNonce, setCurrentNonce] = React.useState(0);
	const [currentHash, setCurrentHash] = React.useState("");
	const startTimeRef = React.useRef(null);
	const miningRef = React.useRef(null);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (startTimeRef.current && isMining) {
				const currentTime = performance.now();
				setExecutionTime(
					((currentTime - startTimeRef.current) / 1000).toFixed(2)
				);
			}
		}, 10);

		return () => clearInterval(interval);
	}, [isMining]);

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
		startTimeRef.current = performance.now();
		const generator = mineGenerator(block, difficulty);

		const performMining = () => {
			const result = generator.next();

			if (!result.done) {
				setCurrentNonce(result.value.nonce);
				setCurrentHash(result.value.hash);

				if (result.value.finished) {
					// Mining complete
					const endTime = performance.now();
					setExecutionTime(
						((endTime - startTimeRef.current) / 1000).toFixed(2)
					);
					setIsMining(false);

					// Update block
					let blocksCopy = [...blocks];
					blocksCopy[block.id] = {
						...block,
						nonce: result.value.nonce,
						hash: result.value.hash,
					};
					const newBlocks = propagateHashChange(block.id, blocksCopy, true);
					setBlocks(newBlocks);
				} else {
					// Continue mining in the next frame
					miningRef.current = requestAnimationFrame(performMining);
				}
			}
		};

		miningRef.current = requestAnimationFrame(performMining);
	};

	React.useEffect(() => {
		return () => {
			if (miningRef.current) {
				cancelAnimationFrame(miningRef.current);
			}
		};
	}, []);

	const handleDifficultyChange = (event, newValue) => {
		setDifficulty(newValue);
	};

	return (
		<Box sx={{ width: "100%", p: 1 }}>
			<Card
				sx={{
					height: "100%",
					p: { xs: 2, sm: 3 },
					background: valid ? "#C9C9C9" : "#ef5350",
				}}
			>
				<CardHeader
					sx={{
						pb: 3,
						"& .MuiCardHeader-content": {
							overflow: "hidden",
							"& .MuiCardHeader-title": {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							},
							"& .MuiCardHeader-subheader": {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							},
						},
					}}
					title={"Block #" + block.id}
					subheader={"Created: " + new Date(block.created).toISOString()}
				/>
				<CardContent sx={{ py: 2 }}>
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
							value={isMining ? currentHash : block.hash}
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
				<CardActions sx={{ flexWrap: "wrap", gap: 2, pt: 2 }}>
					<Button variant="contained" onClick={mineBlock} disabled={isMining}>
						{isMining ? "Mining..." : "Mine"}
					</Button>
					{isMining && <CircularProgress size={24} sx={{ ml: 2 }} />}
					{(executionTime > 0 || isMining) && (
						<Typography sx={{ ml: 2 }}>
							Time: {executionTime}s | Hashes: {currentNonce}
						</Typography>
					)}
				</CardActions>
			</Card>
		</Box>
	);
}
