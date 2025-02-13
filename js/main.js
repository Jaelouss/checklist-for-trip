import { lists } from './components/refs.js';
import {
  translate,
  addSubCheckBox,
  addMainCheckBox,
} from './components/markup.js';
import { travel } from './components/translate.js';

let lang = 'eng';
let category = '-1';
let radioCheckID = '-1';

document.querySelector('header').addEventListener('click', (event) => {
  const clickedButton = event.target.closest('[data-tab]');
  const chooseLang = event.target.closest('[data-lang]');

  if (chooseLang) {
    lang = chooseLang.getAttribute('data-lang');
    translate(lang, travel, category, radioCheckID);
  }
  if (clickedButton) {
    category = clickedButton.dataset.tab - 1;
    addMainCheckBox(lang, travel, category);
    lists.sub.innerHTML = '';
  }
});

lists.main.addEventListener('change', (event) => {
  radioCheckID = event.target.id;

  addSubCheckBox(lang, travel, category, radioCheckID);
});
