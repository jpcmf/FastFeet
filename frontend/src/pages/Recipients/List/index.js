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

export default function RecipientsList() {
  const [page, setPage] = useState(1);
  const [recipients, setRecipients] = useState([]);
  const [reg, setReg] = useState(null);
  const [q, setQ] = useState('');
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: { page, q },
      });

      console.log(response.data.rows);

      const data = response.data.rows.map(recipient => {
        return {
          ...recipient,
          avatarUrl: recipient.avatar
            ? recipient.avatar.url
            : `https://avatar.oxro.io/avatar?name=${recipient.name}`,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setRecipients(data);
    }

    loadRecipients();
  }, [page, q, reg]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  async function handleDelete(recipient) {
    console.log(recipient);

    async function deleteRecipient() {
      try {
        await api.delete(`/recipients/${recipient.id}`);

        toast.success('Destinatário excluído com sucesso.');

        setRecipients(
          recipients.filter(
            currentRecipient => currentRecipient.id !== recipient.id
          )
        );
      } catch (error) {
        toast.error('Não foi possível excluir este destinatário.');
        setVisible(0);
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteRecipient}
          onClose={onClose}
          title="Tem certeza que deseja excluir este destinatário?"
          message={
            <p>
              Ao confirmar que o destinatário <strong>{recipient.name}</strong>{' '}
              será excluído não será possível reverter. <br />
              Tem certeza que deseja excluir?
            </p>
          }
        />
      ),
    });
  }

  function handleVisible(recipient) {
    if (recipient === visible) {
      setVisible(0);
    }
    setVisible(recipient);
  }

  return (
    <Container>
      <header>
        <p>Gerenciando destinatários</p>
      </header>
      <div>
        <div className="search">
          <MdSearch size={20} color="#999" />
          <Input
            name="search"
            type="text"
            placeholder="Buscar por destinatários"
            value={q}
            onChange={e => [setQ(e.target.value), setPage(1)]}
          />
        </div>

        <StyledLink to="/recipients/edit" type="button">
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
            <div className="tableTitle">Nome</div>
            <div className="tableTitle">Endereço</div>
            <div className="tableTitle">Ações</div>
          </div>

          {reg !== 0 ? (
            ''
          ) : (
            <span className="noData">Nenhum destinatário localizado.</span>
          )}

          {recipients.map(recipient => (
            <div key={recipient.id} className="line">
              <div className="tableTitle">#{recipient.id}</div>
              <div className="tableTitle">{recipient.name}</div>
              <div className="tableTitle">
                {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                {recipient.state}
                {recipient.complement ? ` - ${recipient.complement}` : ''}
              </div>

              <div className="tableTitle">
                <ActionButton
                  focusOut={() => handleVisible(recipient.id)}
                  onClick={() => handleVisible(recipient.id)}
                >
                  {recipient.id === visible ? (
                    <MdMoreHoriz size={30} color="#f5f5f5" />
                  ) : (
                    <MdMoreHoriz size={30} color="#c6c6c6" />
                  )}
                </ActionButton>
                <ContextMenu
                  visible={visible === recipient.id}
                  className={recipient.id}
                >
                  <ul>
                    <li>
                      {' '}
                      <MdEdit size={20} color="#4D85EE" />{' '}
                      <button
                        type="button"
                        onClick={() =>
                          history.push(`/recipients/edit/${recipient.id}`, {
                            recipient,
                          })
                        }
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      {' '}
                      <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                      <button
                        type="button"
                        onClick={() => handleDelete(recipient)}
                      >
                        Excluir
                      </button>
                    </li>
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
            (page === 1 && recipients.length < 4) ||
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
