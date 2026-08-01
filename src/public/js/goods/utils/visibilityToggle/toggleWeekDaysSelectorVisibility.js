/**
 * @param {'enable' | 'disable'} action
 */

var toggleWeekDaysSelectorVisibility = (action) =>
  (document.getElementById("week-days").hidden = action !== "enable");

export default toggleWeekDaysSelectorVisibility;
