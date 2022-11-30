import NavBar from 'components/NavBar';
import { FC } from 'react';
import bg from 'assets/illustrations/gradients/bg.png';
import Banner from '../Banner';
import styles from './index.module.scss';
import useFetchOrganisation from './hooks';
import BasicDetails from '../BasicDetails';
import OrganisationProjects from '../OrganisationProjects';
import OrganisationJobs from '../OrganisationJobs';

const Landing: FC = () => {
  const { organisation, isLoading } = useFetchOrganisation();
  if (isLoading) return null;
  return (
    <div
      className={styles['organisation-container']}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'space',
        backgroundAttachment: 'fixed',
      }}
    >
      <NavBar />
      <Banner organisation={organisation} />
      <BasicDetails organisation={organisation} />
      <div className={styles['organisation-project-jobs-wrap']}>
        <OrganisationProjects organisation={organisation} />
        <OrganisationJobs />
      </div>
    </div>
  );
};

export default Landing;
