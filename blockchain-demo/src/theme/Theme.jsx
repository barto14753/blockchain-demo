// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#0a0a0a",
			paper: "#1a1a1a",
		},
		primary: {
			main: "#3b82f6",
			dark: "#1d4ed8",
			light: "#60a5fa",
		},
		secondary: {
			main: "#8b5cf6",
			dark: "#7c3aed",
			light: "#a78bfa",
		},
		success: {
			main: "#10b981",
			dark: "#059669",
			light: "#34d399",
		},
		error: {
			main: "#ef4444",
			dark: "#dc2626",
			light: "#f87171",
		},
		warning: {
			main: "#f59e0b",
			dark: "#d97706",
			light: "#fbbf24",
		},
		text: {
			primary: "#f8fafc",
			secondary: "#94a3b8",
		},
		divider: "#334155",
	},
	typography: {
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		h1: {
			fontSize: "2.5rem",
			fontWeight: 600,
			letterSpacing: "-0.025em",
		},
		h2: {
			fontSize: "2rem",
			fontWeight: 600,
			letterSpacing: "-0.025em",
		},
		h3: {
			fontSize: "1.5rem",
			fontWeight: 600,
			letterSpacing: "-0.025em",
		},
		h4: {
			fontSize: "1.25rem",
			fontWeight: 600,
			letterSpacing: "-0.025em",
		},
		h5: {
			fontSize: "1.125rem",
			fontWeight: 600,
		},
		h6: {
			fontSize: "1rem",
			fontWeight: 600,
		},
		body1: {
			fontSize: "1rem",
			lineHeight: 1.6,
		},
		body2: {
			fontSize: "0.875rem",
			lineHeight: 1.5,
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backgroundColor: "#1e293b",
					border: "1px solid #334155",
					boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					transition: "all 0.2s ease-in-out",
					"&:hover": {
						boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
						transform: "translateY(-2px)",
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#1e293b",
					backgroundImage: "none",
					borderBottom: "1px solid #334155",
					boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 500,
					borderRadius: 8,
					padding: "8px 20px",
					transition: "all 0.2s ease-in-out",
				},
				contained: {
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
					"&:hover": {
						boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
						transform: "translateY(-1px)",
					},
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					"&:hover": {
						boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
						transform: "scale(1.05)",
					},
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: "#0f172a",
					borderRadius: 8,
					border: "1px solid #334155",
					"&:hover": {
						backgroundColor: "#1e293b",
						borderColor: "#475569",
					},
					"&.Mui-focused": {
						backgroundColor: "#1e293b",
						borderColor: "#3b82f6",
					},
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					color: "#3b82f6",
				},
				thumb: {
					backgroundColor: "#3b82f6",
					border: "2px solid #1e293b",
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
					"&:hover": {
						boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					},
				},
				track: {
					backgroundColor: "#3b82f6",
				},
				rail: {
					backgroundColor: "#334155",
				},
			},
		},
	},
});

export default theme;
