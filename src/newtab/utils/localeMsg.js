export function getMsg(name, substitutions = []) {
 if (window.chrome) {
  return chrome.i18n.getMessage(name, substitutions);
 } else {
  // 其他方式获取本地化语言
  // TODO
  return '';
 }
}
