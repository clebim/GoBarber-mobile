import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

import api from '../../services/api';
import Background from '../../Components/Background/index';
import Appointment from '../../Components/Appointment/index';
import { Container, Title, List } from './styles';

const Dashboard = () => {

  const isFocused = useIsFocused();
  const [ appointments, setAppointments] = useState([])

  
  async function LoadAppointments () {
    const response = await api.get('appointments');

    setAppointments(response.data)
  }

  useEffect(
    () => {
      if(isFocused) {
        LoadAppointments();
      }
    },[isFocused, appointments]
  )

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment => 
        appointment.id === id ? {
          ... appointment, canceled_at: response.data.canceled_at,
        } 
        : appointment
        
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={ ({ item }) => (
            <Appointment onCancel={ () => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  )
}

const ConfigDashboard = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: () => (
    <Icon name="event" size={20} color="#FFF" />
  )
}

export { Dashboard, ConfigDashboard };