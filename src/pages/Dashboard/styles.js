import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  color: #FFF;
`;

export const List = styled.FlatList.attrs({
  showsVerticaScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
