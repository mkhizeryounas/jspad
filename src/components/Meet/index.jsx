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
        MOBILE_APP_PROMO: false,
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          // 'profile',
          '',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          // 'invite',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'videobackgroundblur',
          'download',
          'help',
          'mute-everyone',
          'e2ee',
        ],
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
    // eslint-disable-next-line
  }, [alreadyInit]);

  return <div id='meet'></div>;
};

export default Meet;
