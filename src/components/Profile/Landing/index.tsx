import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bg from 'assets/illustrations/profile/bg.svg';
import NavBar from 'components/NavBar';
import ProfileCard from 'components/ProfileCard';
import { useDispatch } from 'react-redux';
import Shepherd from 'shepherd.js';
import { editProfile } from 'actions/profile';
import styles from './index.module.scss';
import ProfileContent from '../ProfileContent';
import { useFetchPublicProfile } from './hooks';

const Landing: FC = () => {
  const [onboardStatus, setOnboardStatus] = useState(
    localStorage.getItem('onboardStatus')
  );
  const dispatch = useDispatch();
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      classes: 'shadow-md bg-purple-dark',
      scrollTo: true,
    },
  });

  window.addEventListener('storage', () => {
    setOnboardStatus(localStorage.getItem('onboardStatus'));
  });
  useEffect(() => {
    if (onboardStatus === 'started') {
      setTimeout(() => {
        tour.show('step1');
      }, 100);
    }
    if (onboardStatus === 'partial') {
      tour.show('step3');
      localStorage.removeItem('onboardStatus');
    }
    if (onboardStatus === 'minted') {
      tour.show('step3');
      localStorage.removeItem('onboardStatus');
    }
  }, [onboardStatus]);

  tour.addStep({
    id: 'step1',
    arrow: true,
    text: "This is where you edit and set up<br />your profile. At Founders Lab we want you to flaunt 😏 your NFT<br />collections, so all profile pictures are NFTs!<br/><br/>If you don't have a NFT, proceed to<br /> buy a Founders Lab Genesis NFT<br /> here 🧪",
    attachTo: {
      element: '#edit-icon',
      on: 'right',
    },
    classes: 'shepherd-theme-custom',
    buttons: [
      {
        text: '2/5',
        classes: 'information-button',
      },
      {
        action() {
          dispatch(editProfile(true));
          setTimeout(() => {
            return tour.next();
          }, 100);
        },
        text: 'Next',
      },
      {
        text: '⏩',
        classes: 'information-button',
      },
    ],
  });

  tour.addStep({
    id: 'step2',
    arrow: true,
    text: 'Click Next to enter NFT selection',
    attachTo: {
      element: '#profile-edit-icon',
      on: 'right',
    },
    classes: 'shepherd-theme-custom',
    buttons: [
      {
        text: '3/5',
        classes: 'information-button',
      },
      {
        action() {
          document.getElementById('profile-edit-icon')?.click();
          return tour.complete();
        },
        text: 'Next',
      },
      {
        text: '⏩',
        classes: 'information-button',
      },
    ],
  });
  tour.addStep({
    id: 'step3',
    arrow: true,
    text: '✨ Mint your profile on Polygon to<br /> apply for task and earn XP points.<br /><br />You will need $MATIC tokens to mint<br /> your profile.',
    attachTo: {
      element: '#user-profile-mint',
      on: 'right',
    },
    classes: 'shepherd-theme-custom',
    buttons: [
      {
        text: '4/5',
        classes: 'information-button',
      },
      {
        action() {
          return tour.next();
        },
        text: 'Next',
      },
      {
        text: '⏩',
        classes: 'information-button',
      },
    ],
  });
  tour.addStep({
    id: 'step4',
    arrow: true,
    text: 'Click next to trigger Metamask and<br /> accept the transaction.<br/>🚀',
    attachTo: {
      element: '#user-profile-mint',
      on: 'bottom',
    },
    classes: 'shepherd-theme-custom',
    buttons: [
      {
        text: '5/5',
        classes: 'information-button',
      },
      {
        action() {
          document.getElementById('profile-address-container')?.click();
          setTimeout(() => {
            tour.show('step5');
          }, 1500);
        },
        text: 'Next',
      },
      {
        text: '⏩',
        classes: 'information-button',
      },
    ],
  });
  tour.addStep({
    id: 'step5',
    arrow: true,
    text: '⏳ wait for 1-2 min for transaction to complete and <a>refresh the page</a>',
    attachTo: {
      element: '#user-profile-mint',
      on: 'bottom',
    },
    classes: 'shepherd-theme-custom',
    buttons: [
      {
        classes: 'information-button',
      },
      {
        action() {
          tour.complete();
        },
        text: 'Done',
      },
      {
        classes: 'information-button',
      },
    ],
  });

  const { profileId } = useParams();
  useFetchPublicProfile(profileId);

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />
      <div className={styles['profile-card-content-container']}>
        <ProfileCard />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Landing;
