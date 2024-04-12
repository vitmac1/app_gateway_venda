import React from 'react';
import { StyleSheet, Image } from 'react-native';
import logoImagem from '../../assets/Shiftway.png';
import logoImagemWhite from '../../assets/ShiftwayWhite.png';

export const Logo = () => {
    return (
        <Image style={styles.logoHeader} source={logoImagem}/>
    )
}

export const LogoWhite = () => {
    return (
        <Image style={styles.logoHeader} source={logoImagemWhite}/>
    )
}

const styles = StyleSheet.create({
    logoHeader: {
        width: 230,
        height: 100,
        resizeMode: 'contain',
    },
});