import "./Form.css"
import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { formatToCurrencyBr } from "../../../Utils/formatCurrency";
import axios from 'axios';
import AddSaleItem from "../components/AddSaleItem.jsx";
import SaleItemsList from "../components/SaleItemsList.jsx";
import SelectDropdown from "../components/SelectDropdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import moment from "moment";
import 'react-toastify/dist/ReactToastify.css';

const SalesForm = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState(moment(new Date()).format("DD/MM/YYYY - HH:mm"));
    const baseUrl = 'https://api.mockfly.dev/mocks/b71e0a83-72ad-41f3-8759-89e8ad0ba88a';

    const [addedProducts, setAddedProducts] = useState([]);
    const [salesTotal, setSalesTotal] = useState('0,00');
    const [seller, setSeller] = useState('');
    const [customer, setCustomer] = useState('');
    const [invoice, setInvoice] = useState('');

    const sellers = [
        {
          "id": 1,
          "name": "Naruto Uzumaki",
          "email": "detabayou@gmail.com",
          "phone": " (87) 9 9635-8234"
        },
        {
          "id": 2,
          "name": "Goku e Vejeta",
          "email": "gojeta@gmail.com",
          "phone": " (87) 9 9835-8234"
        },
        {
          "id": 3,
          "name": "spiderman",
          "email": "aranha@gmail.com",
          "phone": " (83) 9 9835-8234"
        },
        {
          "id": 4,
          "name": "Lufy Gomo Foguete",
          "email": "gomo@gmail.com",
          "phone": " (83) 9 9835-8234"
        },
        {
          "id": 5,
          "name": "Tony Stark",
          "email": "ironman@gmail.com",
          "phone": " (83) 9 9835-8234"
        },
        {
          "id": 6,
          "name": "Steve Rogers",
          "email": "capitao@gmail.com",
          "phone": " (83) 9 9835-8234"
        }
      ]

    const customers = [
        {
          "id": 1,
          "name": "Bruno Salvador",
          "email": "bruno@gmail.com",
          "phone": " (87) 9 9635-8234"
        },
        {
          "id": 2,
          "name": "Allan Rafael de Oliveira",
          "email": "allan@gmail.com",
          "phone": " (87) 9 9835-8234"
        },
        {
          "id": 3,
          "name": "David Danilo",
          "email": "davi@gmail.com",
          "phone": " (83) 9 9835-8234"
        },
        {
          "id": 4,
          "name": "Lucas dos Santos",
          "email": "lulu@gmail.com",
          "phone": " (83) 9 9835-8234"
        },
        {
          "id": 5,
          "name": "Taina da Silva",
          "email": "tata@gmail.com",
          "phone": " (83) 9 9835-8234"
        }
      ]

    useEffect(() => {
        if (!id) return
    
        const sale = axios.get(`https://653c42afd5d6790f5ec7e632.mockapi.io/vendas/${id}`).then(
            response => {
                setDate(moment(response.data.saleDate).format("DD/MM/YYYY - HH:mm"))
                axios.get(`${baseUrl}/clientes/1`).then(
                    reponseCustomer => setCustomer(
                        {
                            value: reponseCustomer.data.id,
                            label: `${reponseCustomer.data.id} - ${reponseCustomer.data.name}`
                        }
                    )
                )
                axios.get(`${baseUrl}/vendedores/1`).then(
                    reponseSeller => setSeller(
                        {
                            value: reponseSeller.data.id,
                            label: `${reponseSeller.data.id} - ${reponseSeller.data.name}`}
                    )
                )
                setInvoice(response.data.invoice)
                setSalesTotal(response.data.totalValue)
                setAddedProducts(response.data.items || [])
            }
        )
    
        if (!sale) return


    }, [id, baseUrl])

    const saveData = (e) => {
        e.preventDefault()
        const jsonItems = addedProducts.map((p) => (
            {
                id: p.product.value,
                unitPrice: p.product.price,
                description: p.product.label,
                quantity: p.quantity,
                total: p.total
            }
        ))
        axios.post(`https://653c42afd5d6790f5ec7e632.mockapi.io/vendas`, {
            invoice: Math.floor(Math.random() * 1000),
            seller: seller.label,
            customer: customer.label,
            dateSale: date,
            totalValue: salesTotal,
            saleItems: jsonItems
        }).then(() => {
            navigate("/vendas")
            setTimeout(() => {
                toast.success(
                    'Salvo com sucesso',
                    { autoClose: 2000 }
                )
            }, 1)
        })
    }

    const toNewAddedProduct = (addedProduct) => {
        let products = [...addedProducts, addedProduct]
        setAddedProducts(products)
        setSalesTotal(
            products.reduce((total, product) => { return total + product.total }, 0)
        )
    }

    const onDelete = (product) => {
        var newListProducts = addedProducts.filter(function(e) { return e.product.value !== product.product.value })
        setAddedProducts([...newListProducts])
        setSalesTotal(salesTotal - product.total)
    }

    return (
        <div className='container card shadow-sm p-5 mt-5'>
            <ToastContainer />
            <h2 className='text-start'>{id ? `Alterar venda - N° ${invoice}` : 'Nova venda'}</h2>
            <hr />
            <div>
                <Row>
                    <Col lg={8} >
                        <h3>Produtos</h3>
                        <div className="container-products pe-3">
                            <div className="mt-4">
                                <AddSaleItem addedProducts={addedProducts} toAddProduct={product => toNewAddedProduct(product)} />
                            </div>
                            <SaleItemsList addedProducts={addedProducts} onDelete={product => onDelete(product)} />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Form onSubmit={saveData}>
                            <h3>Dados da venda</h3>
                            <div className="mt-4 container-sales-data">
                                <div className="mb-5">
                                    <div className="mb-3">
                                        <Form.Label htmlFor="saleDateDisabled">
                                            Data e hora da venda
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="saleDateDisabled"
                                            disabled={true}
                                            value={date}
                                            aria-describedby="saleDateDisabledHelpBlock"
                                        />
                                    </div>
                                    <SelectDropdown
                                        id="selectSeller"
                                        label='Escolha um vendedor'
                                        value={seller}
                                        items={sellers}
                                        onChanged={seller => setSeller(seller)}
                                        url={baseUrl + '/vendedores'}
                                    />
                                    <SelectDropdown
                                        id="selectCustomer"
                                        label='Escolha um cliente'
                                        value={customer}
                                        items={customers}
                                        onChanged={customer => setCustomer(customer)}
                                        url={baseUrl + '/clientes'}
                                    />
                                </div>
                                <div className="pt-5">
                                    <div className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="fw-bold">Valor total da venda: </h5>
                                            <h4 className="fw-bold">{formatToCurrencyBr(salesTotal)}</h4>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to="/vendas">
                                                <Button style={{ backgroundColor: "#00585E" }}>Cancelar</Button>
                                            </Link>
                                            <Button 
                                                className="fs-4"
                                                type="submit"
                                                style={{ backgroundColor: "#2B7D83" }}
                                                disabled={addedProducts.length > 0 && seller && customer ? false : true}
                                            >Finalizar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SalesForm;
