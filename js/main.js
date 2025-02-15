import {
  buttons,
  lists,
  inputs,
  langBtn,
  elements,
  lsData,
  LOCAL_KEY,
} from './components/refs.js';
import {
  setLocal,
  getLocal,
  loadUserSettings,
} from './components/localStorage.js';
import { markup, addUserCheckBox } from './components/markup.js';
import { classAdd, classRemove } from './components/classChange.js';
import { travel } from './components/translate.js';
import { nanoid } from 'https://cdn.skypack.dev/nanoid';

loadUserSettings(LOCAL_KEY, lsData);
markup(lsData);

elements.header.addEventListener('click', (event) => {
  if (event.target.closest('[data-lang]')) {
    lsData.lang = event.target.dataset.lang;
    setLocal(LOCAL_KEY, lsData);
    markup(lsData);
  }
  if (event.target.closest('[data-tab]')) {
    lsData.category = event.target.dataset.tab;
    setLocal(LOCAL_KEY, lsData);
    markup(lsData);
  }
  return;
});

lists.main.addEventListener('change', (event) => {
  let selectedCategory = Object.keys(lsData.userSelectedRadioBox);
  lsData.userSelectedRadioBox[selectedCategory[lsData.category]] = String(
    parseInt(event.target.getAttribute('id'))
  );
  lsData.subCategory = '1';
  setLocal(LOCAL_KEY, lsData);
  markup(lsData);
});

lists.sub.addEventListener('change', (event) => {
  lsData.userCheckBox = '1';
  const checkboxId = event.target.id;
  const checkboxName = event.target.name;
  const tabList = Object.keys(lsData.userSelectedCheckBox);
  let savedChecked =
    lsData.userSelectedCheckBox[tabList[lsData.category]][checkboxName];
  if (event.target.checked) {
    savedChecked.push(checkboxId);
  } else {
    lsData.userSelectedCheckBox[tabList[lsData.category]][checkboxName] =
      savedChecked.filter((id) => id !== checkboxId);
  }

  setLocal(LOCAL_KEY, lsData);
});

inputs.addCheckBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let userCheckBox = { id: `${nanoid()}`, text: event.target.value };

    const mainCategoryList = document.querySelector(
      'input[type="radio"]'
    )?.name;
    const subCategoryList = document.querySelector(
      'input[type="checkbox"]'
    )?.name;
    lsData.userAddedCheckBox[mainCategoryList][subCategoryList].push(
      userCheckBox
    );
    setLocal(LOCAL_KEY, lsData);

    event.target.value = '';
    addUserCheckBox(lsData);
  }
});
lists.sub.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const elem = event.target.closest('[data-user_added]');
    const id = `${elem.id}_sub_user`;
    const mainCategoryList = document.querySelector(
      'input[type="radio"]'
    )?.name;
    const subCategoryList = document.querySelector(
      'input[type="checkbox"]'
    )?.name;
    if (subCategoryList) {
      const userObjAdd = lsData.userAddedCheckBox[mainCategoryList][
        subCategoryList
      ].filter((item) => item.id !== elem.id);
      lsData.userAddedCheckBox[mainCategoryList][subCategoryList] = userObjAdd;

      const userObjCheck = lsData.userSelectedCheckBox[mainCategoryList][
        subCategoryList
      ].filter((item) => item !== id);

      // console.log('item:', item);
      lsData.userSelectedCheckBox[mainCategoryList][subCategoryList] =
        userObjCheck;

      setLocal(LOCAL_KEY, lsData);
      elem.remove();
    }
  }
});

elements.resetData.addEventListener('click', (event) => {
  lsData.lang = 'eng';
  lsData.category = '-1';
  lsData.subCategory = '-1';
  lsData.userCheckBox = '-1';
  lsData.userSelectedRadioBox = {
    city: '',
    campsite: '',
    beach: '',
    active: '',
    'hotels/spa': '',
    car: '',
  };
  lsData.userSelectedCheckBox = {
    city: {
      museum: [],
      park: [],
      restaurant: [],
    },
    campsite: {
      forest: [],
      mountains: [],
    },
    beach: {
      sunbathing: [],
      'water sports': [],
      'night life': [],
    },
    active: {
      hiking: [],
      cycling: [],
      adventure: [],
    },
    'hotels/spa': {
      spa: [],
      'luxury hotel': [],
      'boutique hotel': [],
    },
    car: {
      'road trip': [],
      'car rental': [],
      drive: [],
    },
  };
  lsData.userAddedCheckBox = {
    city: {
      museum: [],
      park: [],
      restaurant: [],
    },
    campsite: {
      forest: [],
      mountains: [],
    },
    beach: {
      sunbathing: [],
      'water sports': [],
      'night life': [],
    },
    active: {
      hiking: [],
      cycling: [],
      adventure: [],
    },
    'hotels/spa': {
      spa: [],
      'luxury hotel': [],
      'boutique hotel': [],
    },
    car: {
      'road trip': [],
      'car rental': [],
      drive: [],
    },
  };

  setLocal(LOCAL_KEY, lsData);
  markup(lsData);
});
