import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../services/api';

import Background from '../../../Components/Background/index';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ route, navigation }) => {

  const provider = route.params.provider;
  const time = route.params.time;
  const DateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.reset({
      routes: [{name: 'Dashboard'}]
    });
  }

  return (
    <Background>
      <Container>
        <Avatar 
          source={{
            uri: provider.avatar
            ? provider.avatar.url
            : `https://api.adorable.io/avatar/50/${provider.name}.png`
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{DateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment} >
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

const ConfigConfirm = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity onPress={
      () => {navigation.goBack();}
    }>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  )
});

export { Confirm, ConfigConfirm };