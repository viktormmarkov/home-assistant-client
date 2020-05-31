import {NotificationManager} from 'react-notifications';

Promise.prototype.messages = function (options) {
  this.then(() => {
    if (options.ok) {
      NotificationManager.success(options.ok);
    } else if (options.info) {
      NotificationManager.info(options.info);
    } else if (options.delete) {
      NotificationManager.warning(options.delete);
    }
  }, () => {
    NotificationManager.error(options.error);
  })
  return this;
};
