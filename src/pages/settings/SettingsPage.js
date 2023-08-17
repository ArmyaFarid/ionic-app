import React, { useState } from 'react';
import './SettingsPage.css';
import Api from "../../helper/Api";
import {useNavigate} from "react-router-dom";
const SettingsPage = () => {
    // State variables for the settings
    const [language, setLanguage] = useState('en');
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);
    const [profilePicture, setProfilePicture] = useState(''); // Replace with the actual image URL or data
    const [name, setName] = useState('Ben Farid');
    const [email, setEmail] = useState('ben@example.com');
    const [password, setPassword] = useState('');
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const Swal = require('sweetalert2');
    const api = new Api();
    // Function to load sample data (fixtures)
    const handleLoadSampleData = () => {
        // Implement your logic to load sample data here
        // For example, you can fetch the data from a server or import a JSON file
        // and populate the state variables with the sample data
        api.fetchData('/provider/fixtures')
            .then((data) => {
                console.log(data);
                // Swal.fire({
                //     icon: 'success',
                //     title: "Nous avont rempli la base de donne pour vous",
                //     text:"Vous serez redirigez dans ",
                //     showConfirmButton: false,
                //     timer: 2000,
                //     willClose: () => {
                //         // Your function to execute after the alert is closed
                //         // For example:
                //         console.log('Alert is closed. Executing the function...');
                //         // Call your function here:
                //         handleGoHome();
                //     }
                // });
                let secondsLeft = 3; // Set the desired countdown time in seconds
                Swal.fire({
                    title: 'Remplissage terminé',
                    html: `Nous avont rempli la base de donne pour vous. Vous serez redirigez dans <b>${secondsLeft}</b> seconds.`,
                    icon: 'success',
                    showConfirmButton: false,
                    didOpen: () => {
                        const timerInterval = setInterval(() => {
                            secondsLeft--;
                            Swal.update({
                                html: `Nous avont rempli la base de donne pour vous. Vous serez redirigez dans <b>${secondsLeft}</b> seconds.`,
                            });
                            if (secondsLeft <= 0) {
                                clearInterval(timerInterval);
                                Swal.close();
                                handleGoHome(); // Call your function after the alert is closed
                            }
                        }, 1000);
                    },
                });

            })
            .catch((error) => {
                console.error('NetworkError:', error);
            });
    };

    // Function to clear data
    const handleClearData = () => {
        // Implement your logic to clear the data here
        // For example, you can reset the state variables to their initial values
    };

    // Function to handle form submission for password change
    const handleSubmitPasswordChange = (event) => {
        event.preventDefault();
        // Implement your logic to update the user's password here
    };

    return (
        <div>
            <h1>Settings</h1>

            {/* General App Settings */}
            <h2>General App Settings</h2>
            {/* Language Selection */}
            <div>
                <label>Language:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    {/* Add more language options here */}
                </select>
            </div>

            {/* Theme Selection */}
            <div>
                <label>Theme:</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            {/* Notification Settings */}
            <div>
                <label>Enable Notifications:</label>
                <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                />
            </div>

            {/* User Account Settings */}
            <h2>User Account Settings</h2>
            {/* Profile Picture */}
            <div>
                <label>Profile Picture:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
            </div>
            {/* Name */}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            {/* Email */}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Security Settings */}
            <h2>Security Settings</h2>
            {/* Change Password */}
            <form onSubmit={handleSubmitPasswordChange}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" />
                </div>
                <div>
                    <button type="submit">Change Password</button>
                </div>
            </form>

            {/* Two-Factor Authentication */}
            <div>
                <label>Enable Two-Factor Authentication:</label>
                <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                />
            </div>

            {/* Fixture Settings */}
            <h2>Fixture Settings</h2>

            <div>
                <button onClick={handleLoadSampleData} >Clear Data and Load Sample Data</button>
                {/*<button onClick={handleClearData} style={{marginLeft:"2em"}}>Clear Data</button>*/}
            </div>
        </div>
    );
};

export default SettingsPage;
