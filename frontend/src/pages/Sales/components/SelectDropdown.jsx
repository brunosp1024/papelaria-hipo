import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const SelectDropdown = (props) => {

    return (
        <div className="mb-3">
            <Form.Label htmlFor={props.id}>
                {props.label}
            </Form.Label>
            <Select 
                placeholder="Selecione..."
                options={props.items}
                id={props.id}
                value={props.value}
                onChange={e => props.onChanged(e)}
            />
        </div>
    )
}

export default SelectDropdown;