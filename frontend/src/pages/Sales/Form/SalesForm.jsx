import "./Form.css"
import { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { formatToCurrencyBr } from "../../../Utils/formatCurrency";
import axios from '../../../axios.js';
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
    const [date, setDate] = useState(new Date());

    const [addedProducts, setAddedProducts] = useState([]);
    const [salesTotal, setSalesTotal] = useState('0,00');
    const [seller, setSeller] = useState();
    const [customer, setCustomer] = useState();
    const [sellerList, setSellerList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [invoice, setInvoice] = useState('');

    useEffect(() => {
        getSellers();
        getCustomers();

        if (!id) return

        axios.get(`/sales/${id}`).then(
            response => {
                const data = response.data
                setDate(data.date)
                setInvoice(data.invoice)
                setSalesTotal(data.total)
                setSeller({value:data.seller_id, label: data.seller_code + ' - ' + data.seller_name})
                setCustomer({value:data.customer_id, label: data.customer_code + ' - ' + data.customer_name})
                setAddedProducts(
                    data.items.map((p) => (
                        { 
                            value: p.product_id,
                            label: `${p.product_code} - ${p.product_name}`,
                            price: p.product_price,
                            quantity: p.quantity
                        }
                    )))
            }
        )

    }, [id])

    const getSellers = () => {
        axios.get("/sellers").then(
            response => {
                const sellers = response.data.map((seller) => (
                    { value: seller.seller_id, label: `${seller.code} - ${seller.name}` }
                ))
                setSellerList(sellers)
            }
        )
    }

    const getCustomers = () => {
        axios.get("/customers").then(
            response => {
                const customers = response.data.map((customer) => (
                    { value: customer.customer_id, label: `${customer.code} - ${customer.name}` }
                ))
                setCustomerList(customers)
            }
        )
    }

    const saveData = (e) => {
        e.preventDefault()
        const items = addedProducts.map((p) => (
            {
                product_id: p.value,
                quantity: p.quantity
            }
        ));
        axios.post("/sales", {
            sale_id: id,
            seller_id: seller.value,
            customer_id: customer.value,
            date: date,
            total: salesTotal,
            items: items
        }).then((response) => {
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
            products.reduce(
                (total, product) => { return total + product.price * product.quantity }, 0)
        )
    }

    const onDelete = (product) => {
        var newListProducts = addedProducts.filter(function(e) { return e.value !== product.value })
        setAddedProducts([...newListProducts])
        setSalesTotal(salesTotal - product.price * product.quantity)
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
                                            value={moment(date).format("DD/MM/YYYY - HH:mm")}
                                            aria-describedby="saleDateDisabledHelpBlock"
                                        />
                                    </div>
                                    <SelectDropdown
                                        id="selectSeller"
                                        label='Escolha um vendedor'
                                        value={seller}
                                        items={sellerList}
                                        onChanged={seller => setSeller(seller)}
                                    />
                                    <SelectDropdown
                                        id="selectCustomer"
                                        label='Escolha um cliente'
                                        value={customer}
                                        items={customerList}
                                        onChanged={customer => setCustomer(customer)}
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
