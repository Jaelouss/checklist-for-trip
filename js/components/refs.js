const choose = (selector) => document.querySelector(selector);

export const buttons = {
  city: choose('[data-tab="1"]'),
  campsite: choose('[data-tab="2"]'),
  beach: choose('[data-tab="3"]'),
  active: choose('[data-tab="4"]'),
  hotelsAndSpa: choose('[data-tab="5"]'),
  car: choose('[data-tab="6"]'),
};

export const lists = {
  main: choose('[data-list]'),
  sub: choose('[data-sub-list]'),
};

export const langBtn = {
  eng: choose('[data-lang="eng"]'),
  ua: choose('[data-lang="ua"]'),
};

export const elements = {
  mainTitle: choose('.mainTitle'),
  mainParagraph: choose('.mainParagraph'),
  searchInput: choose('#search'),
};
