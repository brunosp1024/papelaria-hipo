import Table from "react-bootstrap/esm/Table"
import { FaTrash } from "react-icons/fa";
import { formatToCurrencyBr } from "../../../Utils/formatCurrency";


const SaleItemsList = ({addedProducts, onDelete}) => {
    return (
        <div className="mt-5">
            <Table className="table-products table-responsive">
                <thead>
                    <tr>
                        <th>Produto/serviço</th>
                        <th>Quantidade</th>
                        <th>Preço unitário</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {addedProducts.map(product => {
                        return (<tr key={product.product.label}>
                            <td>{product.product.label}</td>
                            <td>{product.quantity}</td>
                            <td>{formatToCurrencyBr(product.product.price)}</td>
                            <td>
                                {formatToCurrencyBr(parseFloat(product.product.price) * product.quantity)}
                            </td>
                            <td>
                                <a className="text-danger" onClick={() => onDelete(product)} href="#!"><FaTrash /></a>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default SaleItemsList;