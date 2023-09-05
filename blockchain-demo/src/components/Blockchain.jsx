import { Box } from "@mui/material";
import * as React from "react";
import Block from "./Block";

export default function Blockchain() {
	return (
		<Box sx={{ display: "flex", flexWrap: "wrap" }}>
			<Block />
			<Block />
			<Block />
			<Block />
			<Block />
		</Box>
	);
}
