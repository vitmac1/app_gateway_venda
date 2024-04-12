import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const ProfilePicture = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handlePictureChange = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permissão para acessar a biblioteca de mídia é necessária!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
        }

        setProfilePic(pickerResult.uri);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePictureChange}>
                <View style={styles.profileContainer}>
                    <Image source={profilePic ? { uri: profilePic } : require('../../assets/perfil.png')} style={styles.profileImage} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'left',
        alignItems: 'left',
        height: 100,
        marginLeft: 10,
        marginTop: 10
    },
    profileContainer: {
        width: 80,
        height: 80,
        borderRadius: 75,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
