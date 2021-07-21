import {mapInit} from './map.js';
import {formValidation} from './formValidation.js';
import {setButtonSubmit, onSubmit, showErrorMessage} from './form.js';

mapInit();
formValidation();
setButtonSubmit(onSubmit, showErrorMessage);
