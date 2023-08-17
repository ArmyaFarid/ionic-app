import socketIOClient from 'socket.io-client';
import {useEffect, useState} from "react";
import Api from "../../helper/Api";
function NotificationCounter() {
    //const socket = socketIOClient.connect("http://127.0.0.1:8080");
    const [notificationCount, setNotificationCount] = useState(0);
    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {
        api.fetchData('/notification?count=true&read=false')
            .then((data) => {
                console.log("***********")
                console.log(data.count);
                setNotificationCount(data.count);
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });

    }, []);
    useEffect(() => {
        const socket = socketIOClient('http://localhost:8080');

        socket.on('notificationCountUpdate', (count) => {
            setNotificationCount(count);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="notification-badge" style={styles.notificationBadge}>{notificationCount ? notificationCount : 0}</div>
    );
}

const styles = {
    notificationBadge :
        {
            position: 'relative',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#0075FE',
            color: 'white',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }
};

export default NotificationCounter;