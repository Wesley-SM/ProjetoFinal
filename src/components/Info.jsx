import { useParams } from "react-router-dom";

function Info() {
    const { id } = useParams();
    return (
        <div>
            Informações sobre o produto {id}
        </div>
    )
}

export default Info