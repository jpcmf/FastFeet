import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@rocketseat/unform';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { FiLoader } from 'react-icons/fi';
import {
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdMoreHoriz,
} from 'react-icons/md';

import {
  Container,
  StyledLink,
  Button,
  ActionButton,
  ContextMenu,
  BodyContent,
} from './styles';

import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliveryMenList() {
  const [page, setPage] = useState(1);
  const [deliverymen, setDeliverymen] = useState([]);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function loadDeliveryMen() {
      const response = await api.get('/deliverymen', {
        params: { page, q },
      });

      const data = response.data.rows.map(deliveryman => {
        return {
          ...deliveryman,
          avatarUrl: deliveryman.avatar
            ? deliveryman.avatar.url
            : `https://avatar.oxro.io/avatar?name=${deliveryman.name}`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setDeliverymen(data);
    }

    loadDeliveryMen();
  }, [page, q]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(deliveryman) {
    async function deleteDeliveryman() {
      try {
        await api.delete(`/deliverymen/${deliveryman.id}`);

        toast.success('Entregador excluído com sucesso.');

        setDeliverymen(
          deliveryman.filter(
            currentDeliveryman => currentDeliveryman.id !== deliveryman.id
          )
        );
      } catch (error) {
        toast.error('Não foi possível excluir este entregador.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteDeliveryman}
          onClose={onClose}
          title="Tem certeza que deseja excluir este entregador?"
          message={
            <p>
              Ao confirmar que o entregador <strong>{deliveryman.name}</strong>{' '}
              será excluído não será possível reverter. <br />
              Tem certeza que deseja excluir?
            </p>
          }
        />
      ),
    });
  }

  function handleVisible(deliveryman) {
    if (deliveryman === visible) {
      setVisible(0);
    }
    setVisible(deliveryman);
  }

  return (
    <Container>
      <header>
        <p>Gerenciando entregadores</p>
      </header>
      <div>
        <div className="search">
          <MdSearch size={20} color="#999" />
          <Input
            name="search"
            type="text"
            placeholder="Buscar por entregadores"
            value={q}
            onChange={e => [setQ(e.target.value), setPage(1)]}
          />
        </div>

        <StyledLink to="/deliverymen/edit" type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </StyledLink>
      </div>

      <BodyContent visible={loading}>
        <div className="loadingIndicator">
          <FiLoader size={50} color="#7d40e7" />
        </div>

        <div className="table">
          <div className="line lineTitle">
            <div className="tableTitle">ID</div>
            <div className="tableTitle">Foto</div>
            <div className="tableTitle">Nome</div>
            <div className="tableTitle">E-mail</div>
            <div className="tableTitle">Ações</div>
          </div>

          {reg !== 0 ? (
            ''
          ) : (
            <span className="noData">Nenhum entregador localizado.</span>
          )}

          {deliverymen.map(deliveryman => (
            <div key={deliveryman.id} className="line">
              <div className="tableTitle">#{deliveryman.id}</div>
              <div className="tableTitle">
                <img src={deliveryman.avatarUrl} alt="avatar" />
              </div>
              <div className="tableTitle">{deliveryman.name}</div>
              <div className="tableTitle">{deliveryman.email}</div>

              <div className="tableTitle">
                <ActionButton
                  focusOut={() => handleVisible(deliveryman.id)}
                  onClick={() => handleVisible(deliveryman.id)}
                >
                  {deliveryman.id === visible ? (
                    <MdMoreHoriz size={30} color="#f5f5f5" />
                  ) : (
                    <MdMoreHoriz size={30} color="#c6c6c6" />
                  )}
                </ActionButton>
                <ContextMenu
                  visible={visible === deliveryman.id}
                  className={deliveryman.id}
                >
                  <ul>
                    <li>
                      {' '}
                      <MdEdit size={20} color="#4D85EE" />{' '}
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/deliverymen/edit/${deliveryman.id}`, {
                            deliveryman,
                          })
                        }
                      >
                        Editar
                      </button>
                    </li>
                    <span className="actionDelete">
                      <li>
                        {' '}
                        <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                        <button
                          type="button"
                          onClick={() => handleDelete(deliveryman)}
                        >
                          Excluir
                        </button>
                      </li>
                    </span>
                  </ul>
                </ContextMenu>
              </div>
            </div>
          ))}
        </div>
      </BodyContent>

      <footer>
        <Button type="button" onClick={handlePrevPage} disabled={page === 1}>
          Página anterior
        </Button>
        <Button
          type="button"
          onClick={handleNextPage}
          disabled={
            (page !== 1 && reg / 4 <= page) ||
            (page === 1 && deliverymen.length < 4) ||
            (q !== '' && reg === 4) ||
            reg === 4
          }
        >
          Próxima página
        </Button>
      </footer>
    </Container>
  );
}
