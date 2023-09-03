import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Block() {
	return (
		<Box sx={{ p: 2 }}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5" component="div">
						Block
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.primary">
						Nonce
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Mine</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
