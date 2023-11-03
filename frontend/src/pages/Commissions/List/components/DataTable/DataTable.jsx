import "./DataTable.css"
import Table from "react-bootstrap/esm/Table"
import { formatToCurrencyBr } from "../../../../../Utils/formatCurrency"
import { TbMoodEmpty } from "react-icons/tb";


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
                    {commissionsList.length ? commissionsList.map(commission => {
                        return (
                            <tr key={commission.id}>
                                <td>{commission.sellerCode}</td>
                                <td colSpan={2}>{commission.sellerName}</td>
                                <td>{commission.salesTotal}</td>
                                <td>{formatToCurrencyBr(commission.total)}</td>
                            </tr>
                        )
                        }) : <tr><td className="py-4 text-center" colSpan={6}>
                            Lista vazia <TbMoodEmpty className="fs-4"/></td></tr>
                    }
                    {commissionsList.length ?
                        <tr>
                            <th colSpan={4}>Total de commissões do período</th>
                            <th >{formatToCurrencyBr(commissionsList.reduce((total, c) => {return total + parseFloat(c.total)}, 0))}</th>
                        </tr> : null
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default DataTable;