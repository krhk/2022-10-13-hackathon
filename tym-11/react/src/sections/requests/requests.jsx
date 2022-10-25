import "./requests.scss";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { globalData } from "../../global";
import { useState } from "react";


function Requests(){
    const [useky, setUseky] = useState([]);

    const l = [
        "aho", "sdf", "sldkfj",
    ]

    console.log("global data");
    console.log(globalData);

    setTimeout(() => {
        setUseky(globalData)
    }, 1000)

    return (
        <section id="zadost" className="requests container">
        <h1>Požádat o opravu</h1>


        <form action="">
            
        <Form.Label>Úsek (byla by možnost vybrat na mapě)</Form.Label>
            <Form.Select >
            {
                useky.map((usek, index) => (
                    <option key={index} value={usek}>{usek.name}</option>
                ))
            }
            <option>Zvolte úsek</option>
            </Form.Select>

            <Form.Label className="duvodLabel">Důvod podání žádosti</Form.Label>
            <Form.Control as="textarea" rows={3} />
            <button>Odeslat žádost</button>
        </form>

    </section>
    )
}

export default Requests;