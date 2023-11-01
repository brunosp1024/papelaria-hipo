import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const SelectDropdown = (props) => {
    const [list, setList] = useState('');

    useEffect(() => {
        const items = props.items.map((p) => (
            { value: p.id, label: `${p.id} - ${p.name}` }
        ))
        setList(items)
    }, [props.url, props.items]);

    return (
        <div className="mb-3">
            <Form.Label htmlFor={props.id}>
                {props.label}
            </Form.Label>
            <Select 
                placeholder="Selecione..."
                options={list}
                id={props.id}
                value={props.value}
                onChange={e => props.onChanged(e)}
            />
        </div>
    )
}

export default SelectDropdown;