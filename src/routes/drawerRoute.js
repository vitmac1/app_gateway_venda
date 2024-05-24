import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro'
import CadastroProduto from '../screens/CadastroProduto'
import Configuracao from '../screens/Configuracao'
import Dashboard from '../screens/Dashboard'
import Financa from '../screens/Financa'
import Produto from '../screens/Produto'
import Negocio from '../screens/Negocio'
import Venda from '../screens/Venda'

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator screenOptions={{title: ''}}>
            <Drawer.Screen
                name='login'
                component={Login}
                options={{
                    drawerLabel: 'Login'
                }}
            />

            <Drawer.Screen
                name='cadastro'
                component={Cadastro}
                options={{
                    drawerLabel: 'Cadastro'
                }}
            />

            <Drawer.Screen
                name='cadastro produto'
                component={CadastroProduto}
                options={{
                    drawerLabel: 'Cadastro Produto'
                }}
            />

            <Drawer.Screen
                name='dashboard'
                component={Dashboard}
                options={{
                    drawerLabel: 'Dashboard'
                }}
            />

            <Drawer.Screen
                name='configuracao'
                component={Configuracao}
                options={{
                    drawerLabel: 'Configuração'
                }}
            />

            {/* <Drawer.Screen
                name='financa'
                component={Financa}
                options={{
                    drawerLabel: 'Financa'
                }}
            /> */}

            <Drawer.Screen
                name='produto'
                component={Produto}
                options={{
                    drawerLabel: 'Produto'
                }}
            />

            <Drawer.Screen
                name='negocio'
                component={Negocio}
                options={{
                    drawerLabel: 'Negocio'
                }}
            />

            <Drawer.Screen
                name='venda'
                component={Venda}
                options={{
                    drawerLabel: 'Venda'
                }}
            />
        </Drawer.Navigator> 
    )
}