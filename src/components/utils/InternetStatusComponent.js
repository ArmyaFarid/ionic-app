import React, {useState, useEffect} from 'react';
import './internetStatus.css';
import {Rings, ThreeDots} from "react-loader-spinner";

const InternetStatusComponent = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    useEffect(() => {

        setInterval(
            () => {
                fetch('//google.com', {
                    mode: 'no-cors',
                })
                    .then(() => {
                        setIsConnected(true);
                    }).catch(() => setIsConnected(false))
            }, 5000);
    }, []);

    useEffect(() => {
        setShowStatus(true);
        if (isConnected) {
            const timerId = setTimeout(() => {
                setShowStatus(false);
            }, 4000);

            return () => {
                clearTimeout(timerId); // Clear the timeout when the component unmounts or when the connection is lost
            };
        }
    }, [isConnected]);

    return (
        <>
            {
                showStatus && <div className={`status-popup ${isConnected ? 'connected' : 'disconnected'}`}>
                    {!isConnected && <>
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="red"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            wrapperClassName="popup-animate-react-loader-spinner"
                            visible={true}
                        />
                        <p className="status-message">No internet connection.Waiting...</p>
                    </>}
                    {showStatus && isConnected && <>
                        <Rings
                            height="80"
                            width="80"
                            color="#4fa94d"
                            radius="6"
                            wrapperStyle={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            wrapperClassName="popup-animate-react-loader-spinner"
                            visible={true}
                            ariaLabel="rings-loading"
                        />
                        <p className="status-message">Connection available now</p></>}
                </div>
            }
        </>

    );
};

export default InternetStatusComponent;
