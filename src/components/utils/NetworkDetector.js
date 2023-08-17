import React, { Component } from 'react';

class NetworkDetector extends Component {
    state = {
        isDisconnected: false
    }

    componentDidMount() {
        this.handleConnectionChange();
    }

    handleConnectionChange = () => {

            setInterval(
                () => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            this.setState({ isDisconnected: false });
                        }).catch(() => this.setState({ isDisconnected: true }) )
                }, 5000);
    }

    render() {
        const { isDisconnected } = this.state;
        return (
            <div>
                { isDisconnected && (<div className="internet-error">
                    <p>Internet connection lost</p>
                </div>)
                }
            </div>
        );
    }
}

export default NetworkDetector;
