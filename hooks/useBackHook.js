import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigate } from 'react-router-native';

const useBackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const backAction = () => {
      navigate(-1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackHandler;