/* eslint-disable camelcase */
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from 'components/NavBar';
import BlurBlobs from 'components/BlurBlobs';
import TaskManagement from 'components/TaskManagement';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getAccessToken } from 'utils/authFn';
import { RootState } from 'reducers';

import Header from '../Header';
import Description from '../Description';
import { useProject, useFetchProjects } from './hooks';
import PublishProjectModal from '../Modal/PublishProjectModal';
import styles from './index.module.scss';

const Landing: FC = () => {
  const accessToken = getAccessToken();

  const { create } = useParams();
  const { getUSDCBalance, getOnChainProject, fetchFounder } = useProject();
  const { projectData = {} } = useFetchProjects(create);

  const [open, setOpen] = useState(false);

  const { user, wallet_usdc_balance } = useSelector(
    (state: RootState) => state.user
  );
  const { selectedProjectAddress } = useSelector(
    (state: RootState) => state.flProject
  );

  useEffect(() => {
    if (user?.userId && accessToken) {
      getUSDCBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (selectedProjectAddress) {
      fetchFounder(selectedProjectAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectAddress]);

  const {
    name = '',
    description,
    budget,
    timeOfCompletion,
    preferredTimeZones,
    flResources,
    organisation,
  } = projectData;
  useEffect(() => {
    if (organisation?.organisationUser[0]?.walletId) {
      getOnChainProject(create, organisation?.organisationUser[0]?.walletId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organisation]);

  return projectData ? (
    <div className={styles.container}>
      <NavBar />
      <BlurBlobs />
      <Header
        projectName={name}
        setOpen={val => setOpen(val)}
        founderAddress={organisation?.organisationUser[0]?.walletId}
        organisationName={organisation?.name}
        organisationOwnerWalletId={organisation?.organisationUser[0]?.walletId}
      />
      <Description
        description={description}
        budget={budget}
        timeOfCompletion={timeOfCompletion}
        preferredTimeZones={preferredTimeZones}
        flResources={flResources}
      />
      <TaskManagement
        project_budget={budget}
        project_name={name}
        project_founder={organisation?.organisationUser[0]?.walletId}
      />
      {open && (
        <PublishProjectModal
          setOpen={(val: any) => setOpen(val)}
          usdcBalance={wallet_usdc_balance}
          projectId={String(create)}
          budget={budget}
        />
      )}
      <Toaster />
    </div>
  ) : (
    <div className={styles.container} />
  );
};

export default Landing;
