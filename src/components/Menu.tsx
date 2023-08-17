import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from '@ionic/react';


import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp, barChartSharp,
  bookmarkOutline, bookmarkSharp, bookmarksOutline, bookmarksSharp, cashOutline, cashSharp,
  heartOutline,
  heartSharp,
  homeSharp, logOutOutline, logOutSharp,
  mailOutline,
  mailSharp, notificationsOutline, notificationsSharp,
  paperPlaneOutline,
  paperPlaneSharp, settingsOutline, settingsSharp, statsChartOutline, statsChartSharp, timeOutline, timeSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

interface AppPage2 {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Inbox',
    url: '/page/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Logout',
    url: '/logout',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];



const appPages2:AppPage[] = [
  {
    title: 'Dashboard',
    url: '/',
    iosIcon: barChartSharp,
    mdIcon: barChartSharp,
  },
  {
    title: 'Historique',
    url: '/history',
    iosIcon: timeOutline,
    mdIcon: timeSharp,
  },
  {
    title: 'Nos commandes',
    url: '/orders',
    iosIcon: bookmarksOutline,
    mdIcon: bookmarksSharp,
  },
  {
    title: 'Payement',
    url: '/invoice',
    iosIcon: cashOutline,
    mdIcon: cashSharp,
  },
  {
    title: 'Notification',
    url: '/notification',
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp,
  },
  {
    title: 'Parametres',
    url: '/settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },

  {
    title: 'Logout',
    url: '/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutSharp,
  },
];

const labels = ['Family'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages2.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
