import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import LinkIcon from "@mui/icons-material/Link";
import SecurityIcon from "@mui/icons-material/Security";

export default function Bar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar 
				position="static"
				elevation={0}
				sx={{
					background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
					backdropFilter: "blur(10px)",
				}}
			>
				<Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="blockchain"
							sx={{ 
								bgcolor: "primary.main",
								"&:hover": {
									bgcolor: "primary.dark",
									transform: "scale(1.05)",
								},
								transition: "all 0.2s ease-in-out",
							}}
						>
							<LinkIcon />
						</IconButton>
						<Box>
							<Typography 
								variant="h5" 
								component="div" 
								sx={{ 
									fontWeight: 700,
									background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									letterSpacing: "-0.025em",
								}}
							>
								Blockchain Demo
							</Typography>
							<Typography 
								variant="body2" 
								color="text.secondary"
								sx={{ fontSize: "0.75rem" }}
							>
								Interactive Blockchain Visualizer
							</Typography>
						</Box>
					</Box>
					
					<Box sx={{ flexGrow: 1 }} />
					
					<Box sx={{ display: "flex", gap: 1 }}>
						<Chip
							icon={<SecurityIcon />}
							label="Secure"
							size="small"
							color="success"
							variant="outlined"
							sx={{
								"& .MuiChip-icon": {
									fontSize: 16,
								},
							}}
						/>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
