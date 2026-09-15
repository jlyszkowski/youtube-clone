export const API_KEY = "AIzaSyAkrajnqUc8RPwx7K-SB86CTCiMBPbd-z0";

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
  
};

export const decodeHtml = (text) => {
  if (!text) return text;
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};
