import React from 'react';
import { IonToolbar, IonTitle, IonSearchbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import './subheader.css';

interface SubHeaderProps {
    pageTitle: string;
    onSearchChange: (value: string) => void;
    hasButton: boolean; // New prop to control button section visibility
    showForm: () => void; // Function to handle button click
}

const SubHeader: React.FC<SubHeaderProps> = ({ pageTitle, onSearchChange, hasButton, showForm }) => {
    return (
        <IonToolbar className="sub-header">
            <div className="sub-header-inner">
                <IonToolbar className="sub-header-title">
                    <IonTitle>{pageTitle}</IonTitle>
                </IonToolbar>
                <IonToolbar className="sub-header-search">
                    <IonSearchbar
                        placeholder="Search"
                        onIonInput={(e) => onSearchChange(e.detail.value || '')}
                    ></IonSearchbar>
                </IonToolbar>
            </div>
            {hasButton && (
                <IonToolbar className="sub-header-button">
                    <IonButtons slot="secondary">
                        <IonButton fill="solid" onClick={showForm}>
                            {/*<IonIcon slot="start" icon={personCircle}></IonIcon>*/}
                            Add
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            )}
        </IonToolbar>
    );
};

export default SubHeader;
