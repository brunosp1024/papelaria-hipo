import "./List.css";
import axios from '../../../axios.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbMoodEmpty } from "react-icons/tb";
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from "react-toastify";
import { formatToCurrencyBr } from "../../../Utils/formatCurrency";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfirmeDeleteModal from "../../../components/ConfirmDeleteModal";

const List = () => {
    const [salesList, setSalesList] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        loadSales();
    }, []);

    const handleDelete = async (id) => {
        setId(id);
        setShow(true);
    };

    const handleModalDelete = () => {
        handleClose();
        loadSales();
      };

    const handleClose = () => {
        setShow(false);
        setId(null);
      };

    const loadSales = () => {
        axios.get('/sales')
            .then((response) => {
                setSalesList(response.data);
            });
    }

    const hadleCollapse = (id) => {
        const element = document.querySelector(`.sale-${id}`)
        const labelElement = document.querySelector(`.text-more-${id}`)
        const textContent = labelElement.innerHTML
        if (element){
            labelElement.innerHTML = textContent === 'Ver mais' ? 'Fechar' : 'Ver mais'
            element.classList.toggle('collapse')
            element.classList.toggle('collapsed')
        }
    }

  return (
    <>
        <ToastContainer />
        <ConfirmeDeleteModal
            id={id}
            show={show}
            handleClose={handleClose}
            handleModalDelete={handleModalDelete}
            url={`/sales/${id}`}
        />
        <div className='container card p-5 mt-5 shadow-sm container-sales-list'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className='text-start'>Vendas realizadas</h2>
                <Link to="/vendas/adicionar">
                    <Button style={{backgroundColor: "#00585E"}}>Inserir nova venda</Button>
                </Link>
            </div>
            <hr />
            <div className="table-responsive style-table">
                <Table className='mt-3'>
                    <thead style={{position: 'sticky', top: 0}}>
                        <tr>
                        <th>Nota Fiscal</th>
                        <th>Cliente</th>
                        <th>Vendedor</th>
                        <th>Data da Venda</th>
                        <th>Valor Total</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesList.length ? salesList.map((sale) => (
                            <Fragment key={sale.id}>
                                <tr>
                                    <td>{sale.invoice}</td>
                                    <td>{sale.customer}</td>
                                    <td>{sale.seller}</td>
                                    <td>{moment(sale.saleDate).format("DD/MM/YYYY - HH:mm")}</td>
                                    <td>{formatToCurrencyBr(sale.total)}</td>
                                    <td>
                                        <span className="more-items" data-toggle="collapse" onClick={() => hadleCollapse(sale.id)}
                                            data-target={`.sale-${sale.id}`} aria-controls={`multiCollapse${sale.id}`}>
                                                <span className={`text-more-${sale.id}`}>Ver mais</span>
                                        </span>
                                        <Link to={`/vendas/${sale.id}/atualizar`}>
                                            <FaEdit className='mx-4'/>
                                        </Link>
                                        <span className="text-danger cursor-pointer" onClick={() => handleDelete(sale.id)}><FaTrash /></span>
                                    </td>
                                </tr>
                                {sale.items ? (
                                    <tr className={`child-list mt-3 collapse sale-${sale.id}`} id={`multiCollapse${sale.id}`}>
                                        <td colSpan={6}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Produto/Serviço</th>
                                                        <th>Quantidade</th>
                                                        <th>Preço unitário</th>
                                                        <th>Total do produto</th>
                                                        <th>% de comissão</th>
                                                        <th>Comissão</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sale.items.length ? sale.items.map((item) => (
                                                        <tr key={item.sale_item_id}>
                                                            <td>{item.product}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{formatToCurrencyBr(item.product_price)}</td>
                                                            <td>{formatToCurrencyBr(item.item_total)}</td>
                                                            <td>{String(item.product_commission).replace('.', ',')+'%'}</td>
                                                            <td>{formatToCurrencyBr(item.commission_total)}</td>
                                                        </tr>
                                                      )) : <tr><td className="py-4 text-center" colSpan={6}>
                                                                Lista vazia <TbMoodEmpty className="fs-4"/></td></tr>
                                                    }
                                                    <tr className="rowInfo">
                                                        <th>Total venda</th>
                                                        <th colSpan={2}>{sale.total_quantity}</th>
                                                        <th colSpan={2}>{formatToCurrencyBr(sale.total)}</th>
                                                        <th>{formatToCurrencyBr(sale.commission_total)}</th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </td>
                                    </tr>
                                ) : null}
                            </Fragment>
                          )) : <tr><td className="py-4 text-center" colSpan={6}>
                                Lista vazia <TbMoodEmpty className="fs-4"/></td></tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    </>
  );
};

export default List;