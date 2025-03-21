import Layout from "./components/Layout/Layout.tsx";
import CipherForm from "./components/CipherForm/CipherForm.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectDecodedMessage, selectEncodeMessage, selectLoading} from "./store/Cipher/CipherSlice.ts";

const App = () => {
    const encryptedMessage = useAppSelector(selectEncodeMessage);
    const decryptedMessage = useAppSelector(selectDecodedMessage);
    const loading = useAppSelector(selectLoading);

  return (
    <Layout>
        <CipherForm encryptedMessage={encryptedMessage} decryptedMessage={decryptedMessage} loading={loading} />
    </Layout>
  )
};

export default App