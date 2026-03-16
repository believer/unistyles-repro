import { StyleSheet } from "react-native-unistyles";

const lightTheme = {
	colors: {
		bg: "#fff",
		primary: "yellow",
		secondary: "#fff",
		red: "darkred",
		green: "green",
	},
};

const darkTheme = {
	colors: {
		bg: "#000",
		primary: "blue",
		secondary: "#000",
		red: "red",
		green: "lightgreen",
	},
};

const appThemes = {
	light: lightTheme,
	dark: darkTheme,
};

type AppThemes = typeof appThemes;
export type AppTheme = (typeof appThemes)[keyof typeof appThemes];

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
	themes: appThemes,
	settings: {
		initialTheme: "light",
	},
});
