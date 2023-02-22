import axios from "axios";
import { useEffect, useState } from "react";
import InlineDots from "../../components/loaders/inlinedots/inlinedots";

let server = process.env.REACT_APP_SERVER_URL

const DashMessages = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios
            .get(server + '/api/messages')
            .then(res => {
                let all = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setMessages(prev => all)
            })
    }, [])
    return (
        <>
            <div className="flex-between">
                    <h1>Messages</h1>
                </div>
                <div className="list blog">
                    <hr />
                    <ul>{
                    messages.length === 0 ? (
                        <>
                            <InlineDots />
                        </>
                    ) : (
                        messages.map(message => (
                            <li key={message._id}>{message.content}</li>
                        ))
                    )
                    }</ul>
                </div>
        </>
    );
}

export default DashMessages;