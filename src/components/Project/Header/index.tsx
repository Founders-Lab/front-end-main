/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'reducers';
import toast from 'react-hot-toast';
import config from 'config';
import { GET_DEPLOY_STATE } from 'actions/flProject/types';
import { toggleWalletDrawer } from 'actions/app';
import { ReactComponent as VerifiedIcon } from 'assets/illustrations/icons/verified.svg';
import { ReactComponent as Pencil } from 'assets/illustrations/icons/pencil.svg';
import getProfileContractAddress from 'utils/contractFns/getProfileContractAddress';
import styles from './index.module.scss';
import CreatePrjModalWithData from '../../StartPrjModal/CreatePrjModalWithData';

interface IHeaderProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  projectName: string;
  founderAddress: string;
  organisationName: string;
  organisationOwnerWalletId: string;
  organisationId: string;
}

const Header: FC<IHeaderProps> = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const walletId = useSelector((state: RootState) => state.user.user?.walletId);
  const { selectedProjectAddress } = useSelector(
    (state: RootState) => state.flProject
  );
  const toggle = useSelector((state: RootState) => state.app.toggle);
  const profile = useSelector((state: RootState) => state.profile.profile);

  const [showProjectFormModalWithData, setShowProjectFormModalWithData] =
    useState(false);

  const handlePublishProject = async () => {
    try {
      const profileAddress = await getProfileContractAddress(walletId);

      if (profileAddress !== '0x0000000000000000000000000000000000000000') {
        dispatch({
          type: GET_DEPLOY_STATE,
          payload: 'go_live',
        });
        props.setOpen(true);
      } else {
        toast.error('Please mint your profile on chain');
        // TODO - Move to profile page
        navigate(`/profile/${profile?.profileId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    dispatch(toggleWalletDrawer(!toggle));
  };

  const handleEditButtonClick = () => {
    setShowProjectFormModalWithData(true);
  };

  const isFounder = () => {
    if (walletId === props.organisationOwnerWalletId) return true;
    return false;
  };

  return (
    <div className={styles.container}>
      <div className={styles['project-info']}>
        <div className={styles['name-publish-btn-row']}>
          <p className={styles['project-name']}>{props.projectName}</p>
          {props.founderAddress?.toLowerCase() === walletId?.toLowerCase() &&
          selectedProjectAddress === '' ? (
            <button
              onClick={handlePublishProject}
              className={styles.transparentBtn}
            >
              Publish a Project
            </button>
          ) : (
            <div>
              {props.founderAddress?.toLowerCase() ===
              walletId?.toLowerCase() ? (
                <button
                  onClick={handleToggle}
                  className={styles.transparentBtn}
                >
                  Deposit funds
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
        <div className={styles['org-edit-project-row']}>
          <span className={styles['by-org-name']}>
            <div
              onClick={() =>
                window.open(
                  `${config.AppDomain}/organisation/${props.organisationId}`
                )
              }
            >
              <p className={styles['founder-name']}>
                by&nbsp;&nbsp;{props.organisationName}
              </p>
            </div>
            {selectedProjectAddress && (
              <VerifiedIcon
                className={styles['project-verified']}
                width={20}
                height={20}
              />
            )}
          </span>
          {isFounder() && (
            <button
              onClick={handleEditButtonClick}
              className={styles['edit-project-btn']}
            >
              Edit project &nbsp; <Pencil width={15} height={15} />
            </button>
          )}
        </div>
      </div>

      {showProjectFormModalWithData && (
        <CreatePrjModalWithData
          onClose={() =>
            setShowProjectFormModalWithData(!showProjectFormModalWithData)
          }
        />
      )}
    </div>
  );
};

export default Header;
