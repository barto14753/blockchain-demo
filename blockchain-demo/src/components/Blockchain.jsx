import { Box, Fab, Grid, Typography, Paper, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import Block from "./Block";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { createRootBlock, newBlock } from "../utils/BlockUtils";

const STORAGE_KEY = "blockchain_state";
const initialBlocks = [createRootBlock()];

export default function Blockchain() {
	const [blocks, setBlocks] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? JSON.parse(saved) : initialBlocks;
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
	}, [blocks]);

	const addBlock = () => {
		const lastBlock = blocks[blocks.length - 1];
		const block = newBlock(lastBlock, "Some data");
		setBlocks([...blocks, block]);
		scrollDown();
	};

	const clearBlocks = () => {
		setBlocks(initialBlocks);
	};

	const scrollDown = () => {
		setTimeout(
			() =>
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: "smooth",
				}),
			100
		);
	};

	return (
		<Box sx={{ 
			minHeight: "100vh",
			background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
			pt: 4,
			pb: 8,
		}}>
			{/* Header Section */}
			<Box sx={{ px: { xs: 3, sm: 6 }, mb: 4 }}>
				<Paper 
					elevation={0}
					sx={{ 
						p: 4, 
						background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
						borderRadius: 3,
						border: "1px solid #334155",
					}}
				>
					<Box sx={{ textAlign: "center" }}>
						<Typography 
							variant="h4" 
							sx={{ 
								fontWeight: 700,
								mb: 2,
								background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							Interactive Blockchain
						</Typography>
						<Typography 
							variant="body1" 
							color="text.secondary" 
							sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
						>
							Explore how blockchain technology works by adding blocks, mining them, 
							and watching the cryptographic chain form. Each block contains data 
							and is secured through proof-of-work mining.
						</Typography>
						<Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<InfoIcon sx={{ fontSize: 16, color: "primary.main" }} />
								<Typography variant="body2" color="text.secondary">
									Total Blocks: {blocks.length}
								</Typography>
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<InfoIcon sx={{ fontSize: 16, color: "success.main" }} />
								<Typography variant="body2" color="text.secondary">
									Chain Length: {blocks.length - 1} connections
								</Typography>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>

			{/* Blocks Grid */}
			<Box sx={{ px: { xs: 3, sm: 6 } }}>
				<Grid container spacing={4}>
					{blocks.map((block) => (
						<Grid item xs={12} sm={6} md={6} lg={4} key={block.id}>
							<Block block={block} blocks={blocks} setBlocks={setBlocks} />
						</Grid>
					))}
				</Grid>
			</Box>

			{/* Floating Action Buttons */}
			<Box
				sx={{
					position: "fixed",
					right: { xs: "16px", sm: "32px" },
					bottom: { xs: "16px", sm: "32px" },
					display: "flex",
					flexDirection: "column",
					gap: 2,
					zIndex: 1000,
				}}
			>
				<Tooltip title="Clear all blocks and start fresh" placement="left">
					<Fab 
						color="error" 
						onClick={clearBlocks} 
						aria-label="clear"
						sx={{
							background: "linear-gradient(45deg, #ef4444, #f87171)",
							"&:hover": {
								background: "linear-gradient(45deg, #dc2626, #ef4444)",
							},
						}}
					>
						<DeleteIcon />
					</Fab>
				</Tooltip>
				<Tooltip title="Add a new block to the chain" placement="left">
					<Fab 
						color="primary" 
						onClick={addBlock} 
						aria-label="add"
						sx={{
							background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
							"&:hover": {
								background: "linear-gradient(45deg, #1d4ed8, #3b82f6)",
							},
						}}
					>
						<AddIcon />
					</Fab>
				</Tooltip>
			</Box>
		</Box>
	);
}
