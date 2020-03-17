import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { zonedTimeToUtc } from 'date-fns-tz';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Input } from '@rocketseat/unform';
import {
  MdAdd,
  MdSearch,
  MdVisibility,
  MdEdit,
  MdDeleteForever,
  MdRefresh,
} from 'react-icons/md';

import { FiLoader } from 'react-icons/fi';

import {
  Container,
  StyledLink,
  Button,
  StatusContent,
  ActionButton,
  ContextMenu,
  ModalBox,
  ModalShowOrder,
  BodyContent,
} from './styles';

import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';
import history from '~/services/history';

export default function List() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [oneOrder, setOneOrder] = useState({});
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  const getFormattedStatus = order => {
    let status = {};

    if (order.canceled_at) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }

    if (order.end_date) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }

    if (order.start_date) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }

    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };
    return status;
  };

  useEffect(() => {
    setLoading(true);

    async function loadOrders() {
      const response = await api.get('/orders', {
        params: { page, q },
      });

      console.log(response.data);

      const data = response.data.rows.map(order => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return {
          ...order,
          formattedStatus: getFormattedStatus(order),
          startDateFormatted: order.start_date
            ? format(
                zonedTimeToUtc(order.start_date, timezone),
                "d 'de' MMMM 'de' yyyy",
                { locale: pt }
              )
            : null,
          endDateFormatted: order.end_date
            ? format(
                zonedTimeToUtc(order.end_date, timezone),
                "d 'de' MMMM 'de' yyyy",
                { locale: pt }
              )
            : null,
          avatarUrl:
            order.deliveryman_id && order.deliveryman.avatar
              ? order.deliveryman.avatar.url
              : `https://avatar.oxro.io/avatar?name=`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setOrders(data);
    }
    loadOrders();
  }, [page, q, reg]);

  async function handleDelete(id) {
    async function deleteOrder() {
      try {
        await api.delete(`/orders/${id}`);

        toast.success('Encomenda excluída com sucesso.');

        setOrders(orders.filter(currentOrder => currentOrder.id !== id));
      } catch (error) {
        toast.error('Não foi possível excluir esta encomenda.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteOrder}
          onClose={onClose}
          title="Tem certeza que deseja excluir esta encomenda?"
          message={
            <p>
              Ao confirmar que a encomenda <strong>{id}</strong> será excluída
              não será possível reverter. Tem certeza que deseja excluir?
            </p>
          }
        />
      ),
    });
  }

  function handleVisible(order) {
    if (order === visible) {
      setVisible(0);
    }
    setVisible(order);
  }

  function handleShow(order) {
    setModalShow(!modalShow);
    setOneOrder(order);
  }

  return (
    <>
      <ModalShowOrder visible={modalShow}>
        <ModalBox>
          <button type="button" onClick={handleShow}>
            X
          </button>
          <p className="modalTitle">Informações da encomenda</p>
          <p>
            {oneOrder.recipient && oneOrder.recipient.street}
            <span>,</span>
            {oneOrder.recipient && oneOrder.recipient.number}
          </p>
          <p>
            {oneOrder.recipient && oneOrder.recipient.city}
            <span>,</span>
            {oneOrder.recipient && oneOrder.recipient.state}
          </p>
          <p>{oneOrder.recipient && oneOrder.recipient.cep}</p>
          <hr />
          <p className="modalTitle">Datas</p>
          <p>
            <strong>Retirada:</strong> {oneOrder && oneOrder.startDateFormatted}
          </p>
          <p>
            <strong>Entrega:</strong> {oneOrder && oneOrder.endDateFormatted}
          </p>
          <hr />
          <div className="modalTitle">Assinatura do destinatário</div>
          {oneOrder.signature ? (
            <img src={oneOrder.signature.url} alt={oneOrder.signature.name} />
          ) : (
            <p>Não há nenhuma assinatura registrada.</p>
          )}
        </ModalBox>
      </ModalShowOrder>

      <Container>
        <header>
          <p>Gerenciando encomendas</p>
        </header>
        <div>
          <div className="search">
            <MdSearch size={20} color="#999" />
            <Input
              name="search"
              type="text"
              placeholder="Buscar por encomendas"
              value={q}
              onChange={e => [setQ(e.target.value), setPage(1)]}
            />
          </div>

          <StyledLink to="/orders/edit" type="button">
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
              <div className="tableTitle">Destinatário</div>
              <div className="tableTitle">Entregador</div>
              <div className="tableTitle">Cidade</div>
              <div className="tableTitle">Estado</div>
              <div className="tableTitle">Status</div>
              <div className="tableTitle">Ações</div>
            </div>

            {reg !== 0 ? (
              ''
            ) : (
              <span className="noData">Nenhuma encomenda localizada.</span>
            )}

            {orders.map(order => (
              <div key={order.id} className="line">
                <div className="tableTitle">#{order.id}</div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.name}
                </div>
                <div className="tableTitle">
                  <img
                    src={
                      order.deliveryman && order.deliveryman.avatar
                        ? order.deliveryman.avatar.url
                        : `${order.avatarUrl}sem+entregador`
                    }
                    alt="avatar"
                  />
                  {order.deliveryman.id
                    ? order.deliveryman.name
                    : 'Sem entregador'}
                </div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.city}
                </div>
                <div className="tableTitle">
                  {order.recipient_id && order.recipient.state}
                </div>
                <div className="tableTitle">
                  <StatusContent id="status" status={order.formattedStatus}>
                    <span>{order.formattedStatus.text}</span>
                  </StatusContent>
                </div>
                <div className="tableTitle">
                  <ActionButton
                    focusOut={() => handleVisible(order.id)}
                    onClick={() => handleVisible(order.id)}
                  >
                    {order.id === visible ? ' X' : '...'}
                  </ActionButton>
                  <ContextMenu
                    available={!(order.end_date || order.canceled_at)}
                    visible={visible === order.id}
                    className={order.id}
                  >
                    <ul>
                      <li>
                        {' '}
                        <MdVisibility size={20} color="#8E5BE8" />{' '}
                        <button
                          type="button"
                          onClick={() => [setVisible(0), handleShow(order)]}
                        >
                          Visualizar
                        </button>
                      </li>
                      <li>
                        {' '}
                        <MdEdit size={20} color="#4D85EE" />{' '}
                        <button
                          type="button"
                          onClick={() =>
                            history.push(`/orders/edit/${order.id}`, { order })
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
                            onClick={() => handleDelete(order.id)}
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
              (page === 1 && orders.length < 4) ||
              (q !== '' && reg === 4) ||
              reg === 4
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
