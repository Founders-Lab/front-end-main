import { Dispatch, FC, SetStateAction, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ReactComponent as NeonSundaeMainLogo } from 'assets/illustrations/icons/neon-sundae-main-logo.svg';
import styles from './index.module.scss';
import SignUpForm from '../SignUpForm';

interface ISignUpOptions {
  setActive: Dispatch<SetStateAction<string>>;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  showOptions: boolean;
  active: string;
}

const SignUpOptions: FC<ISignUpOptions> = ({
  setActive,
  setShowOptions,
  showOptions,
  active,
}) => {
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);
  return (
    <div className={styles['sign-up-options-container']}>
      <div className={styles['chat-prompts-container--chat-message']}>
        <div className={styles['user-image']}>
          <NeonSundaeMainLogo width={70} height={85.75} />
        </div>
        <div className={styles['user-choices']}>
          <TypeAnimation
            style={{
              display: 'block',
            }}
            sequence={[
              'Beep boop... we are logging you into \n the Neonverse...',
              500,
              () => {
                setShowSignUpOptions(true);
              },
            ]}
            cursor={false}
            speed={80}
          />
          {showSignUpOptions && (
            <>
              <span>
                <SignUpForm />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpOptions;
