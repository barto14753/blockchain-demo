import { Box, Fab, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Block from "./Block";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
		<Box sx={{ p: { xs: 3, sm: 6 } }}>
			<Grid container spacing={6}>
				{blocks.map((block) => (
					<Grid item xs={12} sm={6} md={6} lg={4} key={block.id}>
						<Block block={block} blocks={blocks} setBlocks={setBlocks} />
					</Grid>
				))}
			</Grid>
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
				<Fab color="error" onClick={clearBlocks} aria-label="clear">
					<DeleteIcon />
				</Fab>
				<Fab color="primary" onClick={addBlock} aria-label="add">
					<AddIcon />
				</Fab>
			</Box>
		</Box>
	);
}
