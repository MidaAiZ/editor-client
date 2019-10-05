import req from '../services/index.js';

export default function localSave(settingKey, settingValue) {
    let oldSetting = localStorage.getItem(settingKey) || "{}";
    const setting = Object.assign({}, JSON.parse(oldSetting), settingValue);
    localStorage.setItem(settingKey, JSON.stringify(setting));
    // req
}