import {mapInit, renderMap} from './map.js';
import {formValidation} from './formValidation.js';
import {setButtonSubmit, onSubmit, showErrorMessage, setFilter} from './form.js';

mapInit();
formValidation();
setFilter();
setButtonSubmit(onSubmit, showErrorMessage);

