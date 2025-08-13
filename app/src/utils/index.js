import { LocalStorage } from "./LocalStorage.util";
import { requestHandler } from "./requestHander.util";

const isBrowser = typeof window !== "undefined";
const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

export {LocalStorage,requestHandler,isBrowser,classNames}