import {NotificationManager} from 'react-notifications';

Promise.prototype.messages = function (options) {
  this.then(() => {
    NotificationManager.success(options.ok)
  }, () => {
    NotificationManager.error(options.error)
  })
  return this;
};
