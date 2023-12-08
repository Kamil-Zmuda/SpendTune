import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useNavigate } from 'react-router-dom';
import { exchangePublicToken } from '../../plaidService';
import { useCombinedStore } from '../../store/Store';
import { TTokenStore } from '../../types/types';
import './syncPage.css';

type SyncPageProps = {
  tokenStore: TTokenStore | null;
};

function SyncPage(props: SyncPageProps) {
  const authToken = useCombinedStore((state) => state.token);
  const { tokenStore } = props;
  const setLoggedUser = useCombinedStore((state) => state.setLoggedUser);
  const navigate = useNavigate();
  const linkToken = tokenStore && tokenStore.link_token;

  const { open} = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      console.log('Plaid API - Start');
      const updatedUser =
        authToken && (await exchangePublicToken(public_token, authToken));
      setLoggedUser(updatedUser);
      console.log('Plaid API - Link successful');
      console.log('Plaid API - updatedUser :>> ', updatedUser);
      navigate('/home');
    },
    onExit:()=>{
      console.log('error in usePlaidLink')
    }
  });

  useEffect(() => {
    open();
  }, [open]);

  function goBack() {
    navigate('/home');
  }

  return (
    <div className="modal__overlay">
      <div className="modal">
        <h3>Please wait for Plaid's widget to load</h3>
        <p className="modal__prompt">
          You can also use the button to load widget manually.
        </p>
        <div className="modal__btn-section">
          <button className="btn" onClick={() => open()}>
            Load widget
          </button>
          <button className="btn" onClick={goBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SyncPage;
