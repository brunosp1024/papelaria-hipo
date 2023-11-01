import "./List.css";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from "react-toastify";
import { formatToCurrencyBr } from "../../../Utils/formatCurrency";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import ConfirmeDeleteModal from "../../../components/ConfirmDeleteModal";

const List = () => {
    const [salesList, setSalesList] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    const urlSales = 'https://653c42afd5d6790f5ec7e632.mockapi.io/vendas'

    useEffect(() => {
        loadSales();
    }, []);

    const handleDelete = async (id) => {
        setId(id);
        setShow(true);
    };

    const handleModalDelete = () => {
        setShow(false);
        loadSales();
        setId(null);
      };

    const handleClose = () => {
        setShow(false);
        setId(null);
      };

    const loadSales = () => {
        axios.get(urlSales)
            .then((response) => {
                setSalesList(response.data);
            });
    }

    // const data = [
    //     {
    //         "id": "1",
    //         "invoice": 97897,
    //         "customer": "1",
    //         "seller": "1",
    //         "totalValue": "711.00",
    //         "saleDate": "2019-10-11T04:00:44.510Z",
    //         "items": [
    //             {
    //                 "product": "Pão",
    //                 "quantity": 10,
    //                 "unitPrice": 5.5,
    //                 "total": 55.00,
    //                 "commissionPercentage": 10.0,
    //                 "commission": 5.5

    //             },
    //             {
    //                 "product": "Mortadela",
    //                 "quantity": 2,
    //                 "unitPrice": 4.5,
    //                 "total": 9.0,
    //                 "commissionPercentage": 1,
    //                 "commission": 0.9

    //             }
    //         ]
    //     },
    //     {
    //         "id": "2",
    //         "invoice": 84942,
    //         "customer": "2",
    //         "seller": "2",
    //         "totalValue": "492.00",
    //         "saleDate": "2081-03-07T17:16:21.948Z",
    //         "items": [
    //             {
    //                 "product": "Bolacha",
    //                 "quantity": 15,
    //                 "unitPrice": 5.5,
    //                 "total": 55.00,
    //                 "commissionPercentage": 10.0,
    //                 "commission": 5.5

    //             },
    //             {
    //                 "product": "Café",
    //                 "quantity": 4,
    //                 "unitPrice": 4.5,
    //                 "total": 9.0,
    //                 "commissionPercentage": 1,
    //                 "commission": 0.9

    //             }
    //         ]
    //     },
    //     {
    //         "id": "3",
    //         "invoice": 76468,
    //         "customer": "Jacqueline Kassulke",
    //         "seller": "Howard Rippin V",
    //         "totalValue": "805.00",
    //         "saleDate": "2044-12-23T02:23:19.279Z",
    //     },
    //     {
    //         "id": "4",
    //         "invoice": 42958,
    //         "customer": "Steven Lindgren",
    //         "seller": "Marvin Moore III",
    //         "totalValue": "15.00",
    //         "saleDate": "2085-03-07T17:29:56.150Z",
    //     },
    //     {
    //         "id": "5",
    //         "invoice": 26641,
    //         "customer": "Miss Nicholas Lesch",
    //         "seller": "Natasha Dooley",
    //         "totalValue": "472.00",
    //         "saleDate": "1993-04-25T12:57:12.668Z",
    //     },
    //     {
    //         "id": "6",
    //         "invoice": 86308,
    //         "customer": "Gertrude Gutmann",
    //         "seller": "Beulah Wilkinson",
    //         "totalValue": "94.00",
    //         "saleDate": "2028-06-27T19:24:10.756Z",
    //     },
    //     {
    //         "id": "7",
    //         "invoice": 10660,
    //         "customer": "Mr. Deanna Blanda",
    //         "seller": "Cesar Reichert",
    //         "totalValue": "588.00",
    //         "saleDate": "2055-11-18T17:32:41.847Z",
    //     },
    //     {
    //         "id": "8",
    //         "invoice": 51751,
    //         "customer": "Florence Spinka",
    //         "seller": "Jacob Kemmer",
    //         "totalValue": "388.00",
    //         "saleDate": "2044-01-09T00:08:08.392Z",
    //     },
    //     {
    //         "id": "9",
    //         "invoice": 17659,
    //         "customer": "Jeanne Runolfsson",
    //         "seller": "Della Blick II",
    //         "totalValue": "978.00",
    //         "saleDate": "2008-03-07T15:35:02.258Z",
    //     },
    //     {
    //         "id": "10",
    //         "invoice": 32547,
    //         "customer": "Paula Macejkovic",
    //         "seller": "Gloria Ryan",
    //         "totalValue": "509.00",
    //         "saleDate": "2000-05-27T09:14:00.427Z",
    //     }
    // ]

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
            url={`${urlSales}/${id}`}
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
                        {salesList.map((sale) => (
                            <Fragment key={sale.id}>
                                <tr>
                                    <td>{sale.invoice}</td>
                                    <td>{sale.customer}</td>
                                    <td>{sale.seller}</td>
                                    <td>{moment(sale.saleDate).format("DD/MM/YYYY - HH:mm")}</td>
                                    <td>{formatToCurrencyBr(sale.totalValue)}</td>
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
                                                    {sale.items.map((item) => (
                                                        <tr key={item.product}>
                                                            <td>{item.product}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unitPrice}</td>
                                                            <td>{item.total}</td>
                                                            <td>{item.commissionPercentage}</td>
                                                            <td>{item.commission}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="rowInfo">
                                                        <th>Total venda</th>
                                                        <th colSpan={2}>
                                                            {sale.items.reduce(
                                                                (total, item) => {return total + item.quantity}, 0
                                                            )}
                                                        </th>
                                                        <th colSpan={2}>
                                                            {formatToCurrencyBr(sale.items.reduce(
                                                                (total, item) => {return total + item.total}, 0
                                                            ))}
                                                        </th>
                                                        <th>
                                                            {formatToCurrencyBr(sale.items.reduce(
                                                                (total, item) => {return total + item.commission}, 0
                                                            ))}
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </td>
                                    </tr>
                                ) : null}
                            </Fragment>
                        ))} 
                    </tbody>
                </Table>
            </div>
        </div>
    </>
  );
};

export default List;