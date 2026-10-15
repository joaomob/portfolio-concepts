/* The scripts every page carries, in the prototype's order: the site behaviour, the date fields, the selects.
   Each init returns its cleanup; initPage() returns one cleanup for all three. */
import { initSite } from './site.js';
import { initDatePicker } from './date-picker.js';
import { initFieldSelect } from './field-select.js';

export function initPage() {
  const cleanups = [initSite(), initDatePicker(), initFieldSelect()];
  return () => cleanups.forEach((fn) => fn());
}
