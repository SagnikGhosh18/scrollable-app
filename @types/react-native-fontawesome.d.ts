declare module "@fortawesome/react-native-fontawesome" {
  import { ReactNode } from "react";
  import { StyleProp, TextStyle } from "react-native";
  import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

  interface FontAwesomeIconProps {
    icon: IconDefinition;
    style?: StyleProp<TextStyle>;
    size?: number;
    color?: string;
  }

  export function FontAwesomeIcon(props: FontAwesomeIconProps): ReactNode;
}
