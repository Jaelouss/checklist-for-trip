import { travel } from './translate.js';
import { buttons, lists, elements } from './refs.js';

export function translate(lang, translateObj, category, radioCheckID) {
  const translate = translateObj[lang];
  const buttonLabels = translateObj[lang].buttons;
  document.title = translate.title;
  elements.searchInput.placeholder = translate.placeholder;
  Object.keys(buttons).forEach((key, index) => {
    buttons[key].textContent = buttonLabels[index];
  });
  if (category !== '-1') {
    addMainCheckBox(lang, travel, category, radioCheckID);
    if (radioCheckID !== '-1') {
      addSubCheckBox(lang, travel, category, radioCheckID);
    }
  }
  if (category === '-1') {
    lists.sub.innerHTML = '';
    lists.main.innerHTML = '';
    elements.mainTitle.textContent = translate.mainTitle;
    elements.mainParagraph.textContent = translate.mainParagraph;
  }
}

export function addMainCheckBox(lang, translateObj, category, radioCheckID) {
  for (const key in elements) {
    elements[key].innerHTML = '';
  }
  const tripArr = Object.keys(translateObj[lang].trip);
  const checkMain = translateObj[lang].trip[tripArr[category]];
  const mainCheckBox = Object.keys(checkMain)
    .map((elem, index) => {
      return `
        <li class='item item-main'>
          <label class='label label-main' for='${index}'>
            <input
              type='radio'
              id='${index}'
              class='checkbox checkbox-main'
              name='${category}'
            />
            ${elem}
          </label>
        </li>
      `;
    })
    .join('');
  lists.main.innerHTML = mainCheckBox;
}

export function addSubCheckBox(lang, translateObj, category, radioCheckID) {
  const tripArr = Object.keys(translateObj[lang].trip);
  const checkMain = Object.values(translateObj[lang].trip[tripArr[category]]);
  const radioCheckIndex = parseInt(radioCheckID, 10);
  const subCategory = checkMain[radioCheckIndex];
  const subCheckBox = subCategory
    .map((elem, index) => {
      return `
        <li class='item item-sub'>
          <label for='${index}' class='label label-sub'>
            <input
              type='checkbox'
              id='${index}'
              class='checkbox checkbox-sub'
              name='${elem}'
            />
            ${elem}
          </label>
        </li>
      `;
    })
    .join('');
  lists.sub.innerHTML = subCheckBox;
}
