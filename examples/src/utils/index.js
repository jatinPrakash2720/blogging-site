import { LocalStorage } from "./LocalStorage.util";
import { requestHander } from "./requestHander.util";

const isBrowser = typeof window !== "undefined";
const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

export {LocalStorage,requestHander,isBrowser,classNames}