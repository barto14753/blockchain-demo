import { Box, Fab } from "@mui/material";
import React, { useState } from "react";
import Block from "./Block";
import AddIcon from '@mui/icons-material/Add';
import { createRootBlock, newBlock } from "../utils/BlockUtils";


const initialBlocks = [
	createRootBlock()
];
export default function Blockchain() {
	const [blocks, setBlocks] = useState(initialBlocks);

	const addBlock = () => {
		const lastBlock = blocks[blocks.length - 1]
		console.log(lastBlock)
		const block = newBlock(lastBlock, "Some data")
		setBlocks([...blocks, block])
		scrollDown()
	}

	const scrollDown = () => {
		setTimeout(
			() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
			100
		)
	}

	return (
		<>
		<Box sx={{ display: "flex", flexWrap: "wrap", p: 5 }}>
			{blocks.map((block) => (
				<Block
					key={block.id}
					data={block}
					blocks={blocks}
					setBlocks={setBlocks}
				/>
			))}
			<Fab color="primary" onClick={addBlock} aria-label="add" style={{position: 'fixed', right: '50px', bottom: '50px'}}>
				<AddIcon />
			</Fab>
		</Box>
		</>
	);
}
