import type React from "react";
import { Text, View } from "react-native";
import {
	GestureHandlerRootView,
	RectButton,
} from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	StyleSheet,
	UnistylesRuntime,
	withUnistyles,
} from "react-native-unistyles";
import "./theme";
import type { AppTheme } from "./theme";

const StyledRectButton = withUnistyles(RectButton);
type Color = keyof AppTheme["colors"];

const typography = StyleSheet.create((theme) => ({
	text: (color: Color = "red") => {
		console.log("style", color);

		return {
			color: theme.colors[color],
			fontSize: 16,
		};
	},
	test: (isSelected: boolean = false) => {
		console.log("test", isSelected);

		return {
			color: isSelected ? theme.colors.green : theme.colors.red,
		};
	},
}));

function Typography({
	children,
	color,
}: {
	children: React.ReactNode;
	color?: Color;
}) {
	return <Text style={typography.text(color)}>{children}</Text>;
}

function First() {
	return (
		<View style={{ rowGap: 24 }}>
			<View>
				<Typography>Test</Typography>
				<Typography color="green">Test</Typography>
				<Text style={typography.test()}>Test</Text>
			</View>
			<StyledRectButton
				style={styles.button}
				onPress={() => {
					UnistylesRuntime.setTheme(
						UnistylesRuntime.themeName === "light" ? "dark" : "light",
					);
				}}
			>
				<View accessible role="button">
					<Text>Click</Text>
				</View>
			</StyledRectButton>
		</View>
	);
}

function App() {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView
				style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			>
				<First />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.secondary,
		rowGap: 24,
	},
	card: {
		backgroundColor: "#333",
		padding: 24,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 24,
	},
}));

export default App;
