import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';
import DateInput from '../../../Components/DateInput';
import Background from '../../../Components/Background/index';
import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = ({ route, navigation }) => {

  const [ date, setDate ] = useState(new Date());
  const [ hours, setHours ] = useState([]);
  const provider = route.params.provider;

  useEffect(
    () => {
      async function loadAvailable() {
        const response = await api.get(`providers/${provider.id}/available`,
        {
          params: {
            date: date.getTime(),
          }
        });
        setHours(response.data);
      }
      loadAvailable()
    },[date, provider.id]
  );

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  };

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList 
          data={hours}
          keyExtractor={ item => item.time}
          renderItem={ ({ item }) => (
            <Hour enabled={item.available} onPress={() => handleSelectHour(item.value)} >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  )
}

const ConfigSelectDateTime = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity onPress={
      () => {navigation.goBack();}
    }>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  )
});

export { SelectDateTime, ConfigSelectDateTime };