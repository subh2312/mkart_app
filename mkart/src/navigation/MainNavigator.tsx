import { View, Text, Platform } from 'react-native'
import React, { FC, useState } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '@modules/home'
import { Colors } from '@utils/Constants'
import Categories from '@modules/categories'
import Account from '@modules/account'
import Cart from '@modules/cart'
import { AccountIcon, CartIcon, CategoryIcon, HomeIcon } from './TabIcons'

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
    const [cartItemCount, setCartItemCount] = useState(2)
  return (
    <Tab.Navigator screenOptions={{headerShown: false, 
    tabBarActiveTintColor:Colors.active, 
    tabBarInactiveTintColor:Colors.inactive,
    tabBarHideOnKeyboard:true,
    lazy:true,
    tabBarStyle:{paddingTop: Platform.OS === 'android' ? 0 : 10}}}>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarIcon: ({focused,color,size}) => (
                <HomeIcon focused={focused} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name="Categories" component={Categories} options={{
            tabBarIcon: ({focused,color,size}) => (
                <CategoryIcon focused={focused} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name="Account" component={Account} options={{
            tabBarIcon: ({focused,color,size}) => (
                <AccountIcon focused={focused} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name="Cart" component={Cart}options={{
            tabBarIcon: ({focused,color,size}) => (
                <CartIcon focused={focused} color={color} size={size} />
            ),
            tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
            tabBarBadgeStyle: {
                height: 16,
                width: 16,
            }
        }} />
    </Tab.Navigator>
  )
}

export default MainNavigator