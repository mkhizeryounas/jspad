import { useEffect, useState } from 'react';
import { getName } from '../../utils/localstorage';

const Meet = (props) => {
  const [alreadyInit, setAlreadyInit] = useState(false);

  const init = () => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: window.location.hash.replace('#', ''),
      parentNode: document.querySelector('#meet'),
      userInfo: {
        displayName: getName(),
      },
      interfaceConfigOverwrite: {
        SHOW_CHROME_EXTENSION_BANNER: false,
        HIDE_INVITE_MORE_HEADER: true,
      },
      config: {
        disableInviteFunctions: true,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListener('videoConferenceLeft', function (data) {
      api.dispose();
      init();
    });
  };

  useEffect(() => {
    if (!alreadyInit) {
      init();
    }
    setAlreadyInit(true);
  }, []);
  return <div id='meet'></div>;
};

export default Meet;
