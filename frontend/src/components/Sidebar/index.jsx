import Nav from 'react-bootstrap/Nav';
import { FaCashRegister, FaCalculator, FaAngleRight } from 'react-icons/fa'
import "./Sidebar.css"
import { Link } from 'react-router-dom';

const Sidebar = ({sidebar, showSidebar}) => {
    const styleNav = sidebar ? "0" : "-100%"

    return (
        <Nav defaultActiveKey="/" className="bg-body-tertiary flex-column shadow py-3" style={{left: styleNav}}>
            <Link className='nav-link' to="/vendas" onClick={showSidebar}>
                <div className='d-flex align-items-center justify-content-between'>
                    <span>
                        <FaCashRegister className='mx-3 mb-1'/>
                        Vendas
                    </span>
                    <FaAngleRight style={{color: "#DADADA", fontSize: '25px'}}/>
                </div>
            </Link>
            <Link className='nav-link' to="/comissoes" onClick={showSidebar}>
                <div className='d-flex align-items-center justify-content-between'>
                    <span>
                        <FaCalculator className='mx-3 mb-1'/>
                        Comissões
                    </span>
                    <FaAngleRight style={{color: "#DADADA", fontSize: '25px'}}/>
                </div>
            </Link>
        </Nav>
    )
}

export default Sidebar;