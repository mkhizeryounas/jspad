const firebase = window.firebase;

export const getSessionRef = () => {
  let ref = firebase.database().ref();
  let hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    // console.log('Firebase data: ', ref.toString());
  }

  return ref;
};
