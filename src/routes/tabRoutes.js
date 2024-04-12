import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro'
import CadastroProduto from '../screens/CadastroProduto'
import Configuracao from '../screens/Configuracao'
import Dashboard from '../screens/Dashboard'
import Financa from '../screens/Financa'
import Produto from '../screens/Produto'
import Negocio from '../screens/Negocio'
import Venda from '../screens/Venda'

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator 
            screenOptions={{ headerShown: false, tabBarStyle: { height: 60 }, tabStyle: { justifyContent: 'center' }}}>
            <Tab.Screen
                name='login'
                component={Login}
            />

            <Tab.Screen
                name='Cadastro'
                component={Cadastro}
            />

            <Tab.Screen
                name='Cadastro Produto'
                component={CadastroProduto}
            />

            <Tab.Screen
                name='Dashboard'
                component={Dashboard}
            />

            <Tab.Screen
                name='Configuração'
                component={Configuracao}
            />

            <Tab.Screen
                name='Financa'
                component={Financa}
            />

            <Tab.Screen
                name='Produto'
                component={Produto}
            />

            <Tab.Screen
                name='Negocio'
                component={Negocio}
            />

            <Tab.Screen
                name='Venda'
                component={Venda}
            />
        </Tab.Navigator>
    )
}