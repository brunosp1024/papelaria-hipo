import "./List.css"
import { BiSearchAlt2 } from 'react-icons/bi';
import React, { useState } from "react";
// import DatePicker from "react-datepicker"; removerrrrrr
import Button from 'react-bootstrap/Button';

import "react-datepicker/dist/react-datepicker.css";
import DataTable from "./components/DataTable/DataTable";

const CommissionsList = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [commissionsList, setCommissionsList] = useState([]);
    const [showDataTable, setShowDataTable] = useState(false);

    const data = [
        {
            'sellerCode': 1,
            'seller': 'Bruno Salvador',
            'salesTotal': 15,
            'total': 350.0
        },
        {
            'sellerCode': 2,
            'seller': 'Allan Rafael',
            'salesTotal': 20,
            'total': 450.0
        },
        {
            'sellerCode': 3,
            'seller': 'David Danilo',
            'salesTotal': 25,
            'total': 550.0
        },
        {
            'sellerCode': 1,
            'seller': 'Bruno Salvador',
            'salesTotal': 15,
            'total': 350.0
        },
        {
            'sellerCode': 2,
            'seller': 'Allan Rafael',
            'salesTotal': 20,
            'total': 450.0
        },
        {
            'sellerCode': 3,
            'seller': 'David Danilo',
            'salesTotal': 25,
            'total': 550.0
        },
        {
            'sellerCode': 2,
            'seller': 'Allan Rafael',
            'salesTotal': 20,
            'total': 450.0
        },
        {
            'sellerCode': 3,
            'seller': 'David Danilo',
            'salesTotal': 25,
            'total': 550.0
        },
        {
            'sellerCode': 2,
            'seller': 'Allan Rafael',
            'salesTotal': 20,
            'total': 450.0
        },
        {
            'sellerCode': 3,
            'seller': 'David Danilo',
            'salesTotal': 25,
            'total': 550.0
        }
    ]

    const getCommissions = () => {
        // Implementar o axios
        setCommissionsList(data)
        setShowDataTable(true)
    }

    return (
        <div className='container card p-5 mt-5 shadow-sm'>
            <div className=''>
                <h2 className='text-start' styl>Comissões</h2>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h3 className="color-primary">Relatório de comissões</h3>
                <div className="d-flex">
                    <input className="form-control me-3 cursor-pointer" type="date" onChange={date => setStartDate(date)}/>
                    <input className="form-control me-3 cursor-pointer" type="date" onChange={date => setEndDate(date)}/>
                    <Button className={`btn-get-commissions ${startDate && endDate ? '' : 'disabled'}`} onClick={() => getCommissions()}><BiSearchAlt2 /></Button>
                </div>
            </div>
            <div className={`commission-list ${showDataTable ? '' : ' d-flex align-items-center'}`}>
                <h className={showDataTable ? 'd-none' : ''} >Para visualizar o relatório, selecione um período nos campos acima.</h>
                <DataTable showDataTable={showDataTable} commissionsList={commissionsList}/>
            </div>
        </div>
    )

}

export default CommissionsList;