// The one script of every page: the form checks act only where a form exists, so a single bundle serves all pages.
import { initForms } from './form';
import { initMotion } from './motion';

initForms();
initMotion();
