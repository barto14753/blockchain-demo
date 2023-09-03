import { Grid } from "@mui/material";
import * as React from "react";
import Block from "./Block";

export default function Blockchain() {
	return (
		<Grid
			container
			rowSpacing={1}
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			sx={{ p: 3 }}
		>
			<Grid xs={6}>
				<Block />
			</Grid>
			<Grid xs={6}>
				<Block />
			</Grid>
			<Grid xs={6}>
				<Block />
			</Grid>
			<Grid xs={6}>
				<Block />
			</Grid>
		</Grid>
	);
}
