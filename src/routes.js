// refactor code in other files, ( file very large )

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { Dashboard, ConfigDashboard } from './pages/Dashboard/index';
import { Profile, ConfigProfile } from './pages/Profile/index';
import { SelectProvider, ConfigSelectProvider } from './pages/New/SelectProvider/index';
import { SelectDateTime, ConfigSelectDateTime } from './pages/New/SelectDateTime/index';
import { Confirm, ConfigConfirm } from './pages/New/Confirm/index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Stack = createStackNavigator();
const SignStack = createStackNavigator()
const AppTab = createBottomTabNavigator();
const New = createStackNavigator();


function SignStackScreen (){
  return(
    <SignStack.Navigator headerMode="none" >
      <SignStack.Screen  name="SignIn" component={SignIn} />
      <SignStack.Screen  name="SignUp" component={SignUp} />
    </SignStack.Navigator>
  )
}

function NewScren() {
  return (
    <New.Navigator initialRouteName="SelectProvider" screenOptions={{
      headerTransparent: true,
      headerTintColor: '#FFF',
      headerLeftContainerStyle: {
        marginLeft: 20,
      }

    }} >
      <New.Screen name="SelectProvider" component={SelectProvider} options={ConfigSelectProvider} />
      <New.Screen name="SelectDateTime" component={SelectDateTime} options={ConfigSelectDateTime} />
      <New.Screen name="Confirm" component={Confirm} options={ConfigConfirm} />
    </New.Navigator>
  )
}

function AppTabScreen (){
  return(
    <AppTab.Navigator tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#FFF',
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      style: {
        backgroundColor: '#8d41a8',
      }
    }} >
      <AppTab.Screen name="Dashboard" component={Dashboard} options={ConfigDashboard} />
      <AppTab.Screen name="New" component={NewScren}  options={{
        tabBarLabel: 'Agendar',
        tabBarVisible: false,
        tabBarIcon: () => (
          <Icon name="add-circle-outline" size={20} color="rgba(255, 255, 255, 0.6)" /> 
        ),
      }} />
      <AppTab.Screen name="Profile" component={Profile} options={ConfigProfile} />
    </AppTab.Navigator>
  )
}

export default Routes = (signed = false) => {

  return(
    <Stack.Navigator  headerMode="none" initialRouteName={
      signed ? "App" : "Sign"
    } >  
      <Stack.Screen name="Sign" component={SignStackScreen} />
      <Stack.Screen  name="App" component={AppTabScreen} />
    </Stack.Navigator>
  )
}

