import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CustomText } from '../components/Text';
import { FormularioFilterVenda, FormularioPanelVenda } from '../components/Formulario';

export default function Venda() {
  return (
    <View style={styles.container}>

        <CustomText style={{ fontSize: 30, color: 'white', marginTop: 10}}>Vendas</CustomText>

        <FormularioFilterVenda/>
        <FormularioPanelVenda/>


        <Text style={{marginBottom:400}}></Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, 
  },
});

