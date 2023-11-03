import "./List.css"
import { BiSearchAlt2 } from 'react-icons/bi';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import DataTable from "./components/DataTable/DataTable";
import axios from "../../../axios";
import moment from "moment";

const CommissionsList = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [commissionsList, setCommissionsList] = useState([]);
    const [showDataTable, setShowDataTable] = useState(false);

    const getCommissions = () => {
        axios.get('/commissions', {
            params: {
              start_date: moment(startDate).format('YYYY-MM-DD'),
              end_date: moment(endDate).format('YYYY-MM-DD')
            }
        }).then(
            response => {
                const commissions = response.data.map((commission) => (
                    {
                        id: commission.seller_id,
                        sellerCode: commission.seller_code,
                        sellerName: commission.seller_name,
                        salesTotal: commission.sales_count,
                        total: commission.commission_total
                    }
                ))
                setCommissionsList(commissions)
            }
        )
        setShowDataTable(true)
    }

    return (
        <div className='container card p-5 mt-5 shadow-sm'>
            <div className=''>
                <h2 className='text-start'>Comissões</h2>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h3 className="color-primary">Relatório de comissões</h3>
                <div className="d-flex">
                    <input className="form-control me-3 cursor-pointer" type="date" onChange={date => setStartDate(date.target.value)}/>
                    <input className="form-control me-3 cursor-pointer" type="date" onChange={date => setEndDate(date.target.value)}/>
                    <Button className={`btn-get-commissions ${startDate && endDate ? '' : 'disabled'}`} onClick={() => getCommissions()}><BiSearchAlt2 /></Button>
                </div>
            </div>
            <div className={`commission-list ${showDataTable ? '' : ' d-flex align-items-center'}`}>
                <p className={showDataTable ? 'd-none' : ''} >Para visualizar o relatório, selecione um período nos campos acima.</p>
                <DataTable showDataTable={showDataTable} commissionsList={commissionsList}/>
            </div>
        </div>
    )

}

export default CommissionsList;