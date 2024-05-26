import { View } from 'react-native';
import { Routes, Route } from 'react-router-native';
import Main from './pages/Main';
import Login from './pages/Login';
import useBackHandler from './hooks/useBackHook';

const Content = () => {
  useBackHandler();

  return (
    <View style={{ flex: 1 }}>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </View>
  );
};

export default Content;