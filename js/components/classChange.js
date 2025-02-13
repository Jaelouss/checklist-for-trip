export function classAdd(obj) {
  for (const key in obj) {
    obj[key].classList.add('visually-hidden');
  }
}

export function cLassRemove(obj, dataValue) {
  for (const key in obj) {
    const elem = obj[key];
    const elemData = elem.getAttribute('data-list');
    if (elemData === dataValue) {
      elem.classList.remove('visually-hidden');
    }
  }
}
