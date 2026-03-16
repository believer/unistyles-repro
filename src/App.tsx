import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import "./theme";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function First() {
	return (
		<View style={styles.container()}>
			<Pressable style={styles.button}>
				<Text>Themed button</Text>
			</Pressable>
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
				headerRight: () => (
					<Pressable onPress={() => navigation.navigate("Settings")}>
						<Text>Settings</Text>
					</Pressable>
				),
			}),
		},
		Settings,
	},
});

const Navigation = createStaticNavigation(RootStack);

function App() {
	return <Navigation />;
}

const styles = StyleSheet.create((theme, rt) => ({
	container: () => {
		console.log(rt.themeName);

		return {
			backgroundColor: theme.colors.bg,
			rowGap: 23,
			flex: 1,
		};
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 23,
	},
}));

export default App;
