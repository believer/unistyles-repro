import React from "react";
import { Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import "./theme";
import Animated from "react-native-reanimated";

function First() {
	const [checked, setChecked] = React.useState(false);

	return (
		<View style={styles.container}>
			<View style={{ rowGap: 24 }}>
				<Animated.View
					style={[
						styles.checkbox(checked),
						{
							transitionProperty: ["backgroundColor"],
							transitionDuration: 1000,
						},
					]}
				/>
				<Animated.View style={styles.checkbox(checked)} />
			</View>
			<View style={{ flexDirection: "row", columnGap: 8 }}>
				<Pressable style={styles.button} onPress={() => setChecked(!checked)}>
					<Text>Check box</Text>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						UnistylesRuntime.setTheme(
							UnistylesRuntime.themeName === "light" ? "dark" : "light",
						);
					}}
				>
					<Text>Change theme</Text>
				</Pressable>
			</View>
		</View>
	);
}

function App() {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<First />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create((theme) => ({
	checkbox: (checked: boolean) => {
		console.log({
			checked,
			color: checked ? theme.colors.green : theme.colors.red,
		});
		return {
			backgroundColor: checked ? theme.colors.green : theme.colors.red,
			width: 40,
			height: 40,
		};
	},
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
