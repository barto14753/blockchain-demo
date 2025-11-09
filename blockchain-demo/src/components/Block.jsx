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
	Chip,
	Avatar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import LockIcon from "@mui/icons-material/Lock";
import TimerIcon from "@mui/icons-material/Timer";
import SpeedIcon from "@mui/icons-material/Speed";
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
					background: valid 
						? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
						: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
					borderColor: valid ? "#10b981" : "#ef4444",
					borderWidth: 2,
					position: "relative",
					overflow: "hidden",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "3px",
						background: valid 
							? "linear-gradient(90deg, #10b981, #34d399)"
							: "linear-gradient(90deg, #ef4444, #f87171)",
					},
				}}
			>
				<CardHeader
					sx={{
						pb: 2,
						"& .MuiCardHeader-content": {
							overflow: "hidden",
							"& .MuiCardHeader-title": {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								fontWeight: 600,
								fontSize: "1.25rem",
							},
							"& .MuiCardHeader-subheader": {
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								color: "text.secondary",
							},
						},
					}}
					avatar={
						<Avatar sx={{ 
							bgcolor: valid ? "success.main" : "error.main",
							width: 32,
							height: 32,
						}}>
							{valid ? <CheckCircleIcon /> : <ErrorIcon />}
						</Avatar>
					}
					title={
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography variant="h6" component="span">
								Block #{block.id}
							</Typography>
							<Chip
								size="small"
								label={valid ? "Valid" : "Invalid"}
								color={valid ? "success" : "error"}
								variant="outlined"
							/>
						</Box>
					}
					subheader={
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
							<TimerIcon sx={{ fontSize: 16 }} />
							<Typography variant="body2" color="text.secondary">
								{new Date(block.created).toLocaleString()}
							</Typography>
						</Box>
					}
				/>
				<CardContent sx={{ py: 2, px: 3 }}>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<FormControl fullWidth variant="filled">
							<InputLabel sx={{ color: "text.secondary" }}>Nonce</InputLabel>
							<FilledInput
								id="nonce"
								type="number"
								value={block.nonce}
								onChange={onNonceChange}
								startAdornment={<LockIcon sx={{ mr: 1, color: "text.secondary" }} />}
								sx={{
									"& .MuiFilledInput-input": {
										fontFamily: "monospace",
										fontSize: "0.875rem",
									},
								}}
							/>
						</FormControl>

						<FormControl fullWidth variant="filled">
							<InputLabel sx={{ color: "text.secondary" }}>Data</InputLabel>
							<FilledInput
								id="data"
								defaultValue={block.data}
								multiline={true}
								rows={2}
								onChange={onDataChange}
								sx={{
									"& .MuiFilledInput-input": {
										fontSize: "0.875rem",
									},
								}}
							/>
						</FormControl>

						<FormControl fullWidth variant="filled">
							<InputLabel sx={{ color: "text.secondary" }}>Previous Hash</InputLabel>
							<FilledInput
								id="prev"
								disabled={true}
								value={block.prev}
								multiline={true}
								rows={2}
								sx={{
									"& .MuiFilledInput-input": {
										fontFamily: "monospace",
										fontSize: "0.75rem",
										color: "text.secondary",
									},
								}}
							/>
						</FormControl>

						<FormControl fullWidth variant="filled">
							<InputLabel sx={{ color: "text.secondary" }}>Current Hash</InputLabel>
							<FilledInput
								id="hash"
								disabled={true}
								value={isMining ? currentHash : block.hash}
								multiline={true}
								rows={2}
								sx={{
									"& .MuiFilledInput-input": {
										fontFamily: "monospace",
										fontSize: "0.75rem",
										color: valid ? "success.main" : "error.main",
										fontWeight: 500,
									},
								}}
							/>
						</FormControl>

						<Box sx={{ mt: 2 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
								<SpeedIcon sx={{ color: "primary.main" }} />
								<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
									Mining Difficulty
								</Typography>
								<Chip
									size="small"
									label={`Level ${difficulty}`}
									color="primary"
									variant="outlined"
								/>
							</Box>
							<Slider
								value={difficulty}
								min={1}
								max={5}
								step={1}
								marks
								onChange={handleDifficultyChange}
								valueLabelDisplay="auto"
								sx={{
									"& .MuiSlider-markLabel": {
										fontSize: "0.75rem",
									},
								}}
							/>
						</Box>
					</Box>
				</CardContent>
				<CardActions sx={{ px: 3, pb: 3, pt: 2 }}>
					<Box sx={{ 
						display: "flex", 
						flexDirection: "column", 
						gap: 2, 
						width: "100%" 
					}}>
						<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
							<Button 
								variant="contained" 
								onClick={mineBlock} 
								disabled={isMining}
								size="large"
								sx={{
									minWidth: 120,
									background: isMining 
										? "linear-gradient(45deg, #64748b, #94a3b8)"
										: "linear-gradient(45deg, #3b82f6, #60a5fa)",
									"&:hover": {
										background: "linear-gradient(45deg, #1d4ed8, #3b82f6)",
									},
								}}
							>
								{isMining ? "Mining..." : "Mine Block"}
							</Button>
							{isMining && (
								<CircularProgress 
									size={24} 
									sx={{ 
										color: "primary.main",
									}} 
								/>
							)}
						</Box>
						
						{(executionTime > 0 || isMining) && (
							<Box sx={{ 
								p: 2, 
								bgcolor: "background.paper", 
								borderRadius: 2,
								border: "1px solid",
								borderColor: "divider",
							}}>
								<Box sx={{ 
									display: "flex", 
									justifyContent: "space-between",
									alignItems: "center",
									flexWrap: "wrap",
									gap: 2,
								}}>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										<TimerIcon sx={{ fontSize: 16, color: "primary.main" }} />
										<Typography variant="body2" sx={{ fontWeight: 500 }}>
											Time: {executionTime}s
										</Typography>
									</Box>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										<SpeedIcon sx={{ fontSize: 16, color: "secondary.main" }} />
										<Typography variant="body2" sx={{ fontWeight: 500 }}>
											Hashes: {currentNonce.toLocaleString()}
										</Typography>
									</Box>
								</Box>
								{isMining && (
									<Box sx={{ mt: 1 }}>
										<Typography variant="caption" color="text.secondary">
											Current Hash: {currentHash.substring(0, 20)}...
										</Typography>
									</Box>
								)}
							</Box>
						)}
					</Box>
				</CardActions>
			</Card>
		</Box>
	);
}
