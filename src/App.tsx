import React from "react";
import { Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import "./theme";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";

function First() {
	const [checked, setChecked] = React.useState(false);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container()}>
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
				</View>
			</View>
		</View>
	);
}

function Settings() {
	return (
		<View style={styles.container()}>
			<Pressable
				style={styles.button}
				onPress={() => {
					UnistylesRuntime.setRootViewBackgroundColor("light");
					UnistylesRuntime.setTheme("light");
				}}
			>
				<Text>Light</Text>
			</Pressable>
			<Pressable
				style={styles.button}
				onPress={() => {
					UnistylesRuntime.setRootViewBackgroundColor("dark");
					UnistylesRuntime.setTheme("dark");
				}}
			>
				<Text>Dark</Text>
			</Pressable>
		</View>
	);
}

const RootStack = createNativeStackNavigator({
	screens: {
		First: {
			screen: First,
			options: ({ navigation }) => ({
				headerRight: () => {
					return (
						<Pressable
							onPress={() => {
								navigation.navigate("Settings");
							}}
						>
							<Text>Settings</Text>
						</Pressable>
					);
				},
			}),
		},
		Settings,
	},
});

const Navigation = createStaticNavigation(RootStack);

function App() {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Navigation />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	checkbox: (checked: boolean) => ({
		backgroundColor: checked ? theme.colors.green : theme.colors.red,
		width: 40,
		height: 40,
	}),
	container: () => {
		console.log(rt.themeName);

		return {
			backgroundColor: theme.colors.bg,
			rowGap: 23,
			flex: 1,
		};
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
