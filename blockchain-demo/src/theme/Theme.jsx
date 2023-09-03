// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		type: "dark",
		background: {
			default: "#303030",
			paper: "#424242",
		},
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
	},
	typography: {
		fontSize: 15,
		fontWeightLight: 200,
		fontWeightRegular: 300,
		fontFamily: "Lato",
	},
});

export default theme;
