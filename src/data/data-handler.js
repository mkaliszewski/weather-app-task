import DATA from './data';

const properties = Object.getOwnPropertyNames(DATA).map((el) => parseInt(el));

export const iconSelect = (id) => {
  if (properties.find((num) => num === id)) {
    return DATA[id];
  }
  if (id > 200 && id < 210) {
    return DATA[200];
  }
  if (id > 210 && id < 233) {
    return DATA[210];
  }
  if (id > 300 && id < 322) {
    return DATA[300];
  }
  if (id > 502 && id < 532) {
    return DATA[502];
  }
  if (id > 602 && id < 623) {
    return DATA[601];
  }
  if (id > 700 && id < 782) {
    return DATA[700];
  }
  if (id === 802) {
    return DATA[801];
  }
  if (id === 804) {
    return DATA[803];
  }
};
