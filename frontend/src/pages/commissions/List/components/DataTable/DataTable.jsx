import "./DataTable.css"
import Table from "react-bootstrap/esm/Table"
import { formatToCurrencyBr } from "../../../../../Utils/formatCurrency"


const DataTable = ({commissionsList, showDataTable}) => {
    return (
        <div className={`table-commissions table-responsive ${showDataTable ? '' : 'd-none'}`}>
            <Table className='table-responsive mb-2'>
                <thead>
                    <tr>
                        <th>Cód</th>
                        <th colSpan={2}>Vendedor</th>
                        <th>Total de vendas</th>
                        <th>Total de comissões</th>
                    </tr>
                </thead>
                <tbody>
                    {commissionsList.map(commission => {
                        return (
                            <tr key={commission.id}>
                                <td>{commission.sellerCode}</td>
                                <td colSpan={2}>{commission.seller}</td>
                                <td>{commission.salesTotal}</td>
                                <td>{formatToCurrencyBr(commission.total)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className="Info-commissions d-flex justify-content-between">
                <th colspan='4'>Total de commissões do período</th>
                <th >{formatToCurrencyBr(commissionsList.reduce((total, c) => {return total + c.total}, 0))}</th>
            </div>
        </div>
    )
}

export default DataTable;