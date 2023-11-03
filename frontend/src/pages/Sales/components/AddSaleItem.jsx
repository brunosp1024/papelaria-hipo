import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from '../../../axios.js';

const AddSaleItem = ({toAddProduct}) => {
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState('')
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        axios.get("/products")
            .then((response) => {
                setProductList(
                    response.data.map((p) => (
                        { value: p.product_id, label: `${p.code} - ${p.description}`, price: p.unit_price }
                    ))
                )
        })
    }

    const atSave = (e) => {
        e.preventDefault()
        toAddProduct({
            'value': product.value,
            'label': product.label,
            'quantity': quantity,
            'price': product.price
        })
        setProductList(
            productList.filter(function(p) { return p.value !== product.value })
        )
        setProduct('')
        setQuantity('')
    }

    return (
        <Form onSubmit={atSave}>
            <Row>
                <Col lg={7}>
                    <Form.Label htmlFor="searchProductField">
                        Buscar pelo código de barras ou descrição
                    </Form.Label>
                    <Select 
                        placeholder="Digite o código ou nome de um produto" 
                        options={productList} 
                        id="searchProductField"
                        value={product}
                        onChange={product => setProduct(product)}
                    />
                </Col>
                <Col lg={3}>
                    <Form.Label htmlFor="quantity">
                        Quantidade de itens
                    </Form.Label>
                    <Form.Control
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={quantity => setQuantity(quantity.target.value)}
                        aria-describedby="quantityHelpBlock"
                    />
                </Col>
                <Col lg={2} className="d-flex align-items-end justify-content-end">
                    <Button 
                        style={{backgroundColor: "#00585E"}}
                        type="submit"
                        disabled={product && quantity ? false : true}>
                        Adicionar
                    </Button>                                    
                </Col>
            </Row>
        </Form>

    )
}

export default AddSaleItem;