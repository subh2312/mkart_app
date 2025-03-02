import Icon from "@components/atoms/Icon";
import { FC } from "react";

interface TabIconsProps {
    focused: boolean;
    size: number;
    color: string;
}

export const HomeIcon:FC<TabIconsProps> = ({ focused, size, color }: TabIconsProps) => {
    return (
        <Icon name={focused?'home':'home-outline'} size={size} color={color} iconFamily="IonIcons" />
    )
}

export const CategoryIcon:FC<TabIconsProps> = ({ focused, size, color }: TabIconsProps) => {
    return (
        <Icon name={focused?'grid':'grid-outline'} size={size} color={color} iconFamily="IonIcons" />
    )
}

export const CartIcon:FC<TabIconsProps> = ({ focused, size, color }: TabIconsProps) => {
    return (
        <Icon name={focused?'cart':'cart-outline'} size={size} color={color} iconFamily="IonIcons" />
    )
}

export const AccountIcon:FC<TabIconsProps> = ({ focused, size, color }: TabIconsProps) => {
    return (
        <Icon name={focused?'person':'person-outline'} size={size} color={color} iconFamily="IonIcons" />
    )
}