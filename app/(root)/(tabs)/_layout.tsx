import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, Text } from "react-native";
import { usePathname } from "expo-router";

export default function Layout() {
    const currentPath = usePathname(); // Get the current route to determine the active tab

    return (
        <Tabs>
            <TabSlot />
            <TabList style={styles.tabList}>
                {/* Home Tab */}
                <TabTrigger
                    name="home"
                    href="/"
                    style={[
                        styles.tabTrigger,
                        currentPath === "/" && styles.activeTab, // Apply active style conditionally
                    ]}
                >
                    <FontAwesomeIcon
                        icon={faHome}
                        size={20}
                        style={currentPath === "/" ? styles.activeIcon : styles.icon}
                    />
                    <Text style={currentPath === "/" ? styles.activeLabel : styles.label}>
                        Home
                    </Text>
                </TabTrigger>

                {/* Search Tab */}
                <TabTrigger
                    name="search"
                    href="/search"
                    style={[
                        styles.tabTrigger,
                        currentPath === "/search" && styles.activeTab, // Apply active style conditionally
                    ]}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size={20}
                        style={currentPath === "/search" ? styles.activeIcon : styles.icon}
                    />
                    <Text
                        style={
                            currentPath === "/search" ? styles.activeLabel : styles.label
                        }
                    >
                        Search
                    </Text>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 5,
        backgroundColor: "#f9f9f9", // Light background
        borderTopWidth: 1, // Border at the top
        borderColor: "#ddd", // Subtle border color
    },
    tabTrigger: {
        alignItems: "center",
        padding: 5,
    },
    activeTab: {
        backgroundColor: "#e0f7fa", // Light blue background for active tab
        borderRadius: 8, // Rounded corners for the active tab
        padding: 5 // Add padding to enhance touch target size
    },
    icon: {
        color: "#757575", // Default gray icon color
    },
    activeIcon: {
        color: "#00796b", // Active tab icon color
    },
    label: {
        fontSize: 12,
        color: "#757575", // Default gray text color
        marginTop: 5,
    },
    activeLabel: {
        fontSize: 12,
        color: "#00796b", // Active tab text color
        fontWeight: "bold",
        marginTop: 5,
    },
});
