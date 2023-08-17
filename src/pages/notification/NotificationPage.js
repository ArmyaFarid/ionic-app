import React, {useEffect, useState} from "react";
import "./NotificationPage.css";
import Api from "../../helper/Api"; // Import the CSS file for styling

function NotificationPage() {
    const [notifications, setNotifications] = useState([
        {
            _id: 1,
            title: "Waittt....",
            message: "Wait.....",
            read:true
        }
        // Add more notifications as needed...
    ]);
    const [reloadCounter , setReloadCounter] = useState(1);

    const reloadNotification = ()=>{
        setReloadCounter(reloadCounter+1);
    }

    const api = new Api(); // Base URI is set in the constructor

    useEffect(() => {

        api.fetchData('/notification')
            .then((data) => {
                console.log(data)
                setNotifications(data);
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });

    }, [reloadCounter]);


    const readNotification=(id)=>{
        api.putData('/notification/'+id)
            .then((data) => {
                console.log(data);
                reloadNotification();
            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });
    }


    const clearNotification = (id) => {

        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <div className="notification-container">
            <h1 className="notification-heading">Notifications</h1>
            {notifications.length === 0 ? (
                <p className="no-notification">No new notifications.</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="notification">
                            <h3 className="notification-title">{notification.title}</h3>
                            <p className="notification-message" style={{marginLeft:"30px"}}>{notification.message}</p>
                            {
                                !notification.read &&
                                <button
                                    className="notification-clear-btn"
                                    onClick={() => readNotification(notification._id)}
                                    style={{marginLeft:"30px"}}
                                >
                                    New
                                </button>
                            }

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NotificationPage;
