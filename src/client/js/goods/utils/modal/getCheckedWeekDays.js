var getCheckedWeekDays = async () => {
  var checkedCheckboxes = [...document.querySelectorAll("input[class=checkbox]:checked")].map(({ id }) => id).map(Number);

  var allWeekDaysIds = [0, 1, 2, 3, 4, 5, 6];

  if (!checkedCheckboxes.length) {
    return { checkedWeekDays: allWeekDaysIds };
  }

  if (checkedCheckboxes.length === 1 && checkedCheckboxes.includes(7)) {
    return { checkedWeekDays: allWeekDaysIds };
  }

  if (checkedCheckboxes.length > 1 && checkedCheckboxes.includes(7)) {
    return { checkedWeekDays: allWeekDaysIds };
  }

  return { checkedWeekDays: checkedCheckboxes };
};

export default getCheckedWeekDays;
