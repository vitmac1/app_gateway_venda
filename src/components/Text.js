import React from "react";
import { Text, StyleSheet } from 'react-native'

export const CustomText = (props) => {
    
    const combinedStyles = {
        ...styles.titleNovaConta,
        ...props.style,
    };
    
    return (
        <Text style={combinedStyles}>
            {props.children}
        </Text>
    )
}

export const TermoUsoText = (props) => {
    
    const combinedStyles = {
        ...styles.termoUsoText,
        ...props.style,
    };

    return (
        <Text style={combinedStyles}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    titleNovaConta: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 25
    },
    termoUsoText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20
    }
});