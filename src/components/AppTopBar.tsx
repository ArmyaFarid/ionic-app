import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonBadge, IonAvatar, IonIcon } from '@ionic/react';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';

interface AppTopBarProps {
    appName: string;
    notificationCount: number;
    userProfilePhotoUrl: string;
}

const AppTopBar: React.FC<AppTopBarProps> = ({ appName, notificationCount, userProfilePhotoUrl }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{appName}</IonTitle>
                <IonButtons slot="end">
                    <IonIcon icon={notificationsOutline} />
                    {notificationCount > 0 && <IonBadge color="danger">{notificationCount}</IonBadge>}
                    <IonAvatar>
                        <img src={userProfilePhotoUrl} alt="User Profile" />
                    </IonAvatar>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default AppTopBar;
