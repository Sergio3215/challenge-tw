import { useEffect } from "react";
import ShowChatMenssage from "./show-chat-message";

export default function ListWord({ arrMessage, filter }) {

    // useEffect(() => {

    // }, [arrMessage])

    return (
        <div className="card-palabra-container">
            {
                arrMessage.length > 0 ?
                    filter == '' ?
                        arrMessage.map((m, index) => {
                            return (
                                <ShowChatMenssage msg={m} />
                            )
                        })
                        :
                        arrMessage.filter(m => m.message.toLowerCase() == filter.toLowerCase()).map((m, index) => {
                            return (
                                <ShowChatMenssage msg={m} />
                            )
                        })
                    :
                    <div className='card-palabra-body'>
                        <i>No se captó conversación en el chat</i>
                    </div>
            }
        </div>
    );
}