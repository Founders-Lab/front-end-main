import { useState } from 'react';
import { RootState } from 'reducers';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { SignupSteps } from 'interfaces/auth';
import styles from './index.module.scss';
import Welcome from '../Welcome';
import UserType from '../UserType';
import Step2 from '../Step2';
import Step3 from '../Step3';
import Step4 from '../Step4';
import PromptFooter from '../PromptFooter';
import SignUpOptions from '../SignUpOptions';

import Step6 from '../Step6';
import Step7 from '../Step7';

const ChatPrompts = () => {
  const step = useSelector((state: RootState) => state.auth.step);
  const [showOptions, setShowOptions] = useState(false);
  const [active, setActive] = useState('');

  return (
    <div
      className={clsx(
        styles['chat-prompts-container'],
        step === SignupSteps.Welcome && styles.auto
      )}
    >
      {step === SignupSteps.Welcome && <Welcome />}
      {step === SignupSteps.UserType && (
        <UserType setActive={setActive} active={active} />
      )}
      {step === SignupSteps.WorkType && (
        <>
          <Step2
            setShowOptions={setShowOptions}
            setActive={setActive}
            active={active}
            showOptions={showOptions}
          />
          {/* <PromptFooter active={active === ''} /> */}
        </>
      )}
      {step === SignupSteps.Objective && (
        <>
          <Step3
            setShowOptions={setShowOptions}
            setActive={setActive}
            active={active}
            showOptions={showOptions}
          />
          {/* <PromptFooter active={active === ''} /> */}
        </>
      )}
      {step === SignupSteps.Email && (
        <>
          <Step4 setActive={setActive} />
          {/* <PromptFooter active={active === ''} /> */}
        </>
      )}
      {step === SignupSteps.SignupOptions && <SignUpOptions />}
      {step === 6 && (
        <>
          <Step3
            setShowOptions={setShowOptions}
            setActive={setActive}
            active={active}
            showOptions={showOptions}
          />
          {/* <PromptFooter active={active === ''} /> */}
        </>
      )}
      {step === SignupSteps.OrganisationOnboard && (
        <>
          <Step6 setActive={setActive} />
          {/* <PromptFooter active={active === ''} /> */}
        </>
      )}
      {/* {step === 12 && (
        <>
          <Step7
            setShowOptions={setShowOptions}
            setActive={setActive}
            showOptions={showOptions}
          />
          <PromptFooter active={active === ''} />
        </>
      )} */}
    </div>
  );
};

export default ChatPrompts;
