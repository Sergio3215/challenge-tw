export default function ShowChatMenssage({ msg }) {

    return (
        <div className="card-palabra">
            <div className="card-palabra-header">
                <b>{msg.display_name}</b>
            </div>
            <div className="card-palabra-body">
                <i>{msg.message}</i>
            </div>
        </div>
    )
}