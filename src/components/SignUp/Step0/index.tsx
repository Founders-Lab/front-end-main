/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { setSignUpStep } from 'actions/user';
import { useForm } from 'react-hook-form';
import {
  getSessionStorageItem,
  setSessionStorageItem,
} from 'utils/sessionStorageFunc';
import styles from './index.module.scss';

const Step0 = () => {
  const step = useSelector((state: RootState) => state.user.step);
  const name = getSessionStorageItem('name');

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setSessionStorageItem('name', data.name);
    if (!errors.name) dispatch(setSignUpStep(step + 1));
  };

  return (
    <div className={styles['step0-container']}>
      <iframe
        title="video"
        width="1072"
        height="571"
        src="https://www.loom.com/embed/eb1b9c6f21444b64940a632e2935007d"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>
            Hey,
            <input
              type="text"
              defaultValue={name}
              placeholder="name"
              {...register('name', { required: true })}
              className={errors.name ? styles.error : ''}
            />
            👋🏼
          </h2>
          {errors.name && <p>* Your name is required</p>}
        </div>
        <input
          type="submit"
          value="Get Started 🎉"
          className={styles['submit-button']}
          disabled={!!errors.name}
        />
      </form>
    </div>
  );
};

export default Step0;
