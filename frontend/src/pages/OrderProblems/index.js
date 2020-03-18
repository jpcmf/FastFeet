import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { MdVisibility, MdDeleteForever, MdMoreHoriz } from 'react-icons/md';

import { FiLoader } from 'react-icons/fi';

import {
  Container,
  Button,
  ActionButton,
  ContextMenu,
  ModalBox,
  ModalShowOrder,
  BodyContent,
} from './styles';

import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

export default function OrderProblems() {
  const [page, setPage] = useState(1);
  const [orderProblems, setOrderProblems] = useState([]);
  const [oneProblem, setOneProblem] = useState({});
  const [reg, setReg] = useState(null);
  const [visible, setVisible] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  useEffect(() => {
    setLoading(true);

    async function loadOrderProblems() {
      const response = await api.get('/delivery-problems', {
        params: { page },
      });

      const data = response.data.rows.map(problem => {
        return {
          ...problem,
          shortDescription:
            problem.description.length > 100
              ? `${problem.description.substring(0, 100)}...`
              : problem.description,
        };
      });

      setReg(response.data.count);
      setLoading(false);
      setOrderProblems(data);
    }

    loadOrderProblems();
  }, [page, reg]);

  async function handleDelete(id) {
    async function deleteProblem() {
      try {
        await api.delete(`/problem/${id}/cancel-delivery`);

        toast.success('Encomenda cancelada com sucesso.');

        setVisible(0);

        setPage(1);
      } catch (error) {
        toast.error('Não foi possível cancelar esta encomenda.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteProblem}
          onClose={onClose}
          title="Tem certeza que deseja cancelar esta encomenda?"
          message={
            <p>
              Ao confirmar que a encomenda <strong>{id}</strong> será cancelada
              não será possível reverter. <br />
              Tem certeza que deseja cancelar?
            </p>
          }
        />
      ),
    });
  }

  function handleVisible(orderProblem) {
    if (orderProblem === visible) {
      setVisible(0);
    }
    setVisible(orderProblem);
  }

  function handleShow(orderProblem) {
    setModalShow(!modalShow);
    setOneProblem(orderProblem);
  }

  return (
    <>
      <ModalShowOrder visible={modalShow}>
        <ModalBox>
          <button type="button" onClick={handleShow}>
            X
          </button>
          <p className="modalTitle">VISUALIZAR PROBLEMA</p>
          <p>{oneProblem && oneProblem.description}</p>
        </ModalBox>
      </ModalShowOrder>

      <Container>
        <header>
          <p>Problemas na entrega</p>
        </header>

        <BodyContent visible={loading}>
          <div className="loadingIndicator">
            <FiLoader size={50} color="#7d40e7" />
          </div>

          <div className="table">
            <div className="line lineTitle">
              <div className="tableTitle">Encomenda</div>
              <div className="tableTitle">Problema</div>
              <div className="tableTitle">Ações</div>
            </div>

            {reg !== 0 ? (
              ''
            ) : (
              <span className="noData">Nenhum problema localizado.</span>
            )}

            {orderProblems.map(problem => (
              <div key={problem.id} className="line">
                <div className="tableTitle">#{problem.delivery.id}</div>
                <div className="tableTitle">{problem.shortDescription}</div>

                <div className="tableTitle">
                  <ActionButton
                    focusOut={() => handleVisible(problem.id)}
                    onClick={() => handleVisible(problem.id)}
                  >
                    {problem.id === visible ? (
                      <MdMoreHoriz size={30} color="#f5f5f5" />
                    ) : (
                      <MdMoreHoriz size={30} color="#c6c6c6" />
                    )}
                  </ActionButton>
                  <ContextMenu
                    available={
                      !(problem.end_date || problem.delivery.canceled_at)
                    }
                    visible={visible === problem.id}
                    className={problem.id}
                  >
                    <ul>
                      <li>
                        {' '}
                        <MdVisibility size={20} color="#8E5BE8" />{' '}
                        <button
                          type="button"
                          onClick={() => [setVisible(0), handleShow(problem)]}
                        >
                          Visualizar
                        </button>
                      </li>

                      <span className="actionDelete">
                        <li>
                          {' '}
                          <MdDeleteForever size={20} color="#DE3B3B" />{' '}
                          <button
                            type="button"
                            onClick={() => handleDelete(problem.id)}
                          >
                            Cancelar encomenda
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
              (page !== 1 && reg / 5 <= page) ||
              (page === 1 && orderProblems.length < 5) ||
              reg === 5
            }
          >
            Próxima página
          </Button>
        </footer>
      </Container>
    </>
  );
}
