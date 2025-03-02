import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { FC } from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { menuData } from '@utils/db'
import MenuItem from '../atoms/MenuItem'
import Icon from '@components/atoms/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@utils/Constants'

const MenuHeader:FC<{scrollY:any}> = ({scrollY}) => {
    const [focusedIndex, setFocusedIndex] = React.useState(0)
    const opacityFadingStyle = useAnimatedStyle(() => {
        const opacity= interpolate(
            scrollY.value,
            [0, 80],
            [1, 0]
        )
        return {
            opacity
        }
    })
  return (
    <Animated.View style={[styles.constainer, opacityFadingStyle]}>
      <SafeAreaView/>
       <View style={styles.flexRow}>
        {menuData.map((item, index) => (
            <MenuItem key={index} item={item} isFocused={focusedIndex===index} onSelect={()=>setFocusedIndex(index)}/>
        )
        )}
       </View>
       <View style={styles.addressContainer}>
        <Icon name="location" size={20} color="black" iconFamily='IonIcons'/>
        <Text style={[styles.homeText]}>Delivering to :</Text>
        <Text style={[styles.addressText]}>C/180, Sector 6, Rourkela-769002</Text>
        <Icon name="chevron-forward-sharp" size={20} color="black" iconFamily='IonIcons'/>
       </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    constainer:{
        top: Platform.OS === 'android' ? -60 : -30,
        padding: 5
    },
    flexRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    addressContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
    },
    homeText:{
        color:Colors.text,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    addressText:{
        color:Colors.text,
        flex: 1,
        fontSize: RFValue(9),
    }
})

export default MenuHeader