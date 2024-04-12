import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from '../routes/drawerRoute'

export default function Routes() {
    return (
        <NavigationContainer>
            <DrawerRoutes/>
        </NavigationContainer>
    )
}