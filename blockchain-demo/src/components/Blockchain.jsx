import { Box } from "@mui/material";
import React, { useState } from "react";
import Block from "./Block";
import { fromRange } from "../utils/Random";
import sha256 from "crypto-js/sha256";

const initialBlocks = [
	{
		id: 0,
		created: new Date(Date.now()).toISOString(),
		nonce: fromRange(0, 100),
		data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, debitis?",
		prev: sha256("abc"),
		hash: sha256("def"),
	},
	{
		id: 1,
		created: new Date(Date.now()).toISOString(),
		nonce: fromRange(0, 100),
		data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nisi sed ducimus amet, nesciunt reprehenderit?",
		prev: sha256("abc"),
		hash: sha256("def"),
	},
	{
		id: 2,
		created: new Date(Date.now()).toISOString(),
		nonce: fromRange(0, 100),
		data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nisi sed ducimus amet, nesciunt reprehenderit?",
		prev: sha256("abc"),
		hash: sha256("def"),
	},
];
export default function Blockchain() {
	const [blocks, setBlocks] = useState(initialBlocks);
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", p: 5 }}>
			{blocks.map((block) => (
				<Block
					key={block.id}
					data={block}
					blocks={blocks}
					setBlocks={setBlocks}
				/>
			))}
		</Box>
	);
}
