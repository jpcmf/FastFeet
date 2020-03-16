import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link className="logo" to="/">
            <img src={logo} alt="FastFeet" />
          </Link>
          <ul>
            <NavLink activeStyle={{ color: '#444' }} id="orders" to="/orders">
              ENCOMENDAS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#444' }}
              id="deliverymen"
              to="/deliverymen"
            >
              ENTREGADORES
            </NavLink>
            <NavLink
              activeStyle={{ color: '#444' }}
              id="recipients"
              to="/recipients"
            >
              DESTINATÁRIOS
            </NavLink>
            <NavLink
              activeStyle={{ color: '#444' }}
              id="order-problems"
              to="/order-problems"
            >
              PROBLEMAS
            </NavLink>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <NavLink to="/" onClick={handleSignOut}>
                sair do sistema
              </NavLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
