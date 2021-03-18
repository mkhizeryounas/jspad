const fn = Function;

const formatDate = (d) => {
  return d.toString();
};

self.addEventListener(
  'message',
  function (payload) {
    let output = { hasError: false, date: formatDate(new Date()) };
    try {
      const response = [];
      console.oldLog = console.log;
      console.log = function () {
        response.push(
          [...arguments]
            .map((e) =>
              typeof e === 'object' ? JSON.stringify(e, null, 2) : e
            )
            .join(' ')
        );
      };
      new fn(payload.data)();
      output['stdout'] = response;
    } catch (err) {
      output['stdout'] = [err.message || err];
      output['hasError'] = true;
    }
    console.log = console.oldLog;
    console.log(output);
    self.postMessage(output);
  },
  false
);
