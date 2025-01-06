// import { Tabs } from "expo-router";
// import { Image, ImageSourcePropType, Text, View } from "react-native";

// const TabIcon = ({
//   focused,
//   icon,
//   title,
// }: {
//   focused: boolean;
//   icon: ImageSourcePropType;
//   title: string;
// }) => (
//   <View className="flex-1 mt-3 flex flex-col items-center">
//     <Image
//       source={icon}
//       tintColor={focused ? "#0061FF" : "#666876"}
//       resizeMode="contain"
//       className="size-6"
//     />
//     <Text
//       className={`${
//         focused
//           ? "text-primary-300 font-rubik-medium"
//           : "text-black-200 font-rubik"
//       } text-xs w-full text-center mt-1`}
//     >
//       {title}
//     </Text>
//   </View>
// );

// const TabsLayout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           position: "absolute",
//           borderTopColor: "#0061FF1A",
//           borderTopWidth: 1,
//           minHeight: 70,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={icons.home} title="Home" />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon focused={focused} icon={icons.search} title="Explore" />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;

import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Text } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

// Defining the layout of the custom tab navigator
export default function Layout() {
    return (
        <Tabs>
            <TabSlot />
            <TabList>
                <TabTrigger name="home" href="/">
                    <FontAwesome icon={SolidIcons.home}/>
                </TabTrigger>
                <TabTrigger name="article" href="/search">
                    <FontAwesome />
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}