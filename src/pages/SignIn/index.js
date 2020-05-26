import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest }  from '../../store/modules/auth/actions'
import Logo from '../../assets/logo.png';
import Background from '../../Components/Background/index';

import { 
  Container, 
  Form, 
  FormInput, 
  SubmitButton, 
  SignLink, 
  SignLinkText 
} from './styles';

const SignIn = ({ navigation }) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
    setEmail('');
    setPassword('');
    navigation.navigate('App');
  }

  return (
   <Background>
     <Container>
      <Image source={Logo} />
      <Form>
        <FormInput 
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          returnKeyType="next"
          onSubmitEditing={ () => passwordRef.current.focus() }
          value={email}
          onChangeText={setEmail}
        />

        <FormInput 
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha secreta"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Acessar
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignUp') }>
        <SignLinkText>Criar conta gratuita</SignLinkText>
      </SignLink>
     </Container>
   </Background>
  )
}

export default SignIn;