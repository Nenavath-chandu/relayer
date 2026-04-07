const KEY = "ai_detection_history";

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const addToHistory = (item) => {
  const history = getHistory();
  const updated = [item, ...history];
  localStorage.setItem(KEY, JSON.stringify(updated));
};