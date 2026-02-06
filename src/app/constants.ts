/* eslint-disable @typescript-eslint/naming-convention */
//#region ROUTES
export const loginRoute = 'login';
export const logoutRoute = '/logout'
export const signInRoute = `${loginRoute}`;
export const searchSignInRoute = `/${signInRoute}`;
export const registerRoute = 'register';
export const searchRegisterRoute = `/${registerRoute}`;

export const homeRoute = 'home';
export const searchHomeRoute = `/${homeRoute}`;
export const toyRoute = 'toy';
export const searchToyRoute = `/${toyRoute}`;
export const favoriteRoute = 'favorite';
export const searchFavoriteRoute = `/${favoriteRoute}`
export const settingRoute = 'setting';
export const searchSettingRoute = `/${settingRoute}`;
export const myPurchaseRoute = 'my-purchase';
export const searchMyPurchaseRoute = `/${myPurchaseRoute}`;

export const defaultRoute = searchHomeRoute;
//#endregion

export const DEBOUNCE_TIME_MS = 400;

export const maskSeparator = {
  int: '9999999999',
  separator: 'separator.0',
  separator6: 'separator.6',
  separator3: 'separator.3',
  separator2: 'separator.2',
  thousandSeparator: '',
};

export const maskMaxIntDigitsHelper = {
  max12: '100000000000',
  max11: '10000000000',
  max10: '1000000000',
  max9: '100000000',
  max8: '10000000',
  max7: '1000000',
  max6: '100000',
  max5: '10000',
  max4: '1000',
  max3: '100',
  max2: '10',
};
