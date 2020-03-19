import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';

import {
  Container,
  Avatar,
  NameTitle,
  Name,
  EmailTitle,
  Email,
  CreatedDateTitle,
  CreatedDate,
  Logout,
  LogoutText,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const deliveryman = useSelector(state => state.auth);

  async function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={
          !deliveryman.avatar
            ? {
                uri: `https://ui-avatars.com/api/?name=${deliveryman.name}&background=7159c1&color=fff`,
              }
            : { uri: deliveryman.avatar.url }
        }
      />
      <NameTitle>Nome completo</NameTitle>
      <Name>{deliveryman.name}</Name>
      <EmailTitle>E-mail</EmailTitle>
      <Email>{deliveryman.email}</Email>
      <CreatedDateTitle>Data de cadastro</CreatedDateTitle>
      <CreatedDate>
        {format(parseISO(deliveryman.createdAt), 'dd/MM/yyyy')}
      </CreatedDate>
      <Logout onPress={handleLogout}>
        <LogoutText>Logout</LogoutText>
      </Logout>
    </Container>
  );
}
