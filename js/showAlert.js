const ALERT_SHOW_TIME = 5000;
const ALERT_STYLE_SETTING = 'z-index:1100;position:absolute;left:0;top:80px;right:0;padding:10px 3px;font-size:24px;background-color:rgba(0, 0, 0, 0.8);color:white;text-align:center;';
const ESCAPE_KEY = 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.cssText = ALERT_STYLE_SETTING;
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === ESCAPE_KEY;

export {
  showAlert,
  isEscEvent
};
