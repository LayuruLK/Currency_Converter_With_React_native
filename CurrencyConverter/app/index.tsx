import { Text, View } from "react-native";
import  Converter  from "../components/Converter"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Converter/>
    </View>
  );
}
