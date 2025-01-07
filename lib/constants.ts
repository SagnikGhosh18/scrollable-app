import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const NAVIGATION_BAR_HEIGHT = 70;
const ITEM_HEIGHT = SCREEN_HEIGHT - NAVIGATION_BAR_HEIGHT;

export {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    NAVIGATION_BAR_HEIGHT,
    ITEM_HEIGHT
}