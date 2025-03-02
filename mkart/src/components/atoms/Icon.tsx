import React, { FC } from 'react';
import { Platform } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface IconProps {
    name: string,
    size: number,
    color?: string,
    iconFamily: "IonIcons" | "MaterialIcons" | "FontAwesome" | "MaterialCommunityIcons" | "AntDesign" | "Fontisto"
}

const Icon: FC<IconProps> = ({ name, size, color, iconFamily }) => {
  return (
    <>
      {iconFamily === "IonIcons" && <IonIcons name={name} size={Platform.OS==='ios'? size:size+2} color={color} />}
      {iconFamily === "MaterialIcons" && <MaterialIcons name={name} size={size} color={color} />}
      {iconFamily === "FontAwesome" && <FontAwesome name={name} size={size} color={color} />}
      {iconFamily === "MaterialCommunityIcons" && <MaterialCommunityIcons name={name} size={size} color={color} />}
      {iconFamily === "AntDesign" && <AntDesign name={name} size={size} color={color} />}
      {iconFamily === "Fontisto" && <Fontisto name={name} size={size} color={color} />}
    </>
  );
}

export default Icon;