import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Adivinar({ opciones, setOpciones, question, setQuestion }) {


    useEffect(() => {

    }, [opciones])

    const setOpcion = () => {
        let str = ''
        withReactContent(Swal).fire({
            title: <h4>Ingresa tu opción</h4>,
            input: 'text',
            inputPlaceholder: 'Agrega tu opción',
            str,
            confirmButtonText: "Guardar",
            theme: 'dark',
            preConfirm: () => {
                if (Swal.getInput()?.value != undefined && Swal.getInput()?.value != null && Swal.getInput()?.value != '') {
                    setOpciones((prevArr) => [...prevArr, Swal.getInput()?.value]);
                }
                else {
                    setOpcion();
                }
            },
        })
    }

    const DeleteOpcion = (value) => {
        let arr = opciones;
        let arr_temp = []
        arr.map((op) => {
            if (op !== value) {
                arr_temp.push(op);
            }
        })

        setOpciones(arr_temp);
    }

    return (
        <>
            <h1>Has tu pregunta y que tus espectadores adivinen</h1>
            <div className="container-adivinanza">
                {/* <div>
                    <button>Poner palabra ganadora</button>
                </div> */}
                <div>
                    <input type="text" placeholder="Agrega la pregunta para el espectador" value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }} />
                </div>
                <div>
                    <button onClick={setOpcion}>Agregar Opciones</button>
                </div>
                <div className="opciones-container">
                    {
                        opciones.length > 0 ?
                            <>
                                {
                                    opciones.map((o, index) => {
                                        return (
                                            <div className="opciones-select">
                                                {o}
                                                <button onClick={() => DeleteOpcion(o)}>
                                                    Borrar
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </>
                            :
                            <div className="opciones-select">
                                <i>No hay opciones disponibles</i>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}