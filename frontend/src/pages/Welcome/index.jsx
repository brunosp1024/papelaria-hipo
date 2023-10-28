import "./Welcome.css"
import { ImNewspaper } from "react-icons/im"

const Welcome = () => {
    return (
        <>
        <div className="welcome mx-3">
            <div className="mt-4">
                <h1>Bem vindo a Papelaria HIPO</h1>
                <p className="p-0 m-0 text-center">Abra o menu no canto superior esquerdo para acessar os dados.</p>
            </div>
            <div className="container-icon">
                <ImNewspaper />
            </div><br/>
        </div>
        </>
    )
}

export default Welcome;