import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet, Text } from "react-native";
import { usePathname } from "expo-router";

export default function Layout() {
    const currentPath = usePathname();

    return (
        <Tabs>
            <TabSlot />
            <TabList style={styles.tabList}>
                <TabTrigger
                    name="home"
                    href="/"
                    style={[
                        styles.tabTrigger,
                        currentPath === "/" && styles.activeTab,
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

                <TabTrigger
                    name="search"
                    href="/search"
                    style={[
                        styles.tabTrigger,
                        currentPath === "/search" && styles.activeTab,
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
        backgroundColor: "#f9f9f9",
        borderTopWidth: 1,
        borderColor: "#ddd",
        maxHeight: 60,
    },
    tabTrigger: {
        alignItems: "center",
        padding: 5,
    },
    activeTab: {
        backgroundColor: "#e0f7fa",
        borderRadius: 8,
        padding: 5
    },
    icon: {
        color: "#757575",
    },
    activeIcon: {
        color: "#00796b",
    },
    label: {
        fontSize: 12,
        color: "#757575",
        marginTop: 5,
    },
    activeLabel: {
        fontSize: 12,
        color: "#00796b",
        fontWeight: "bold",
        marginTop: 5,
    },
});
