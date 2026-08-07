export var getMondayIndex = (
  date: string,
  mondays: string[],
): { mondayIndex: number } => {
  var mondayIndex = mondays.findIndex(
    (monday) => monday === new Date(date).toISOString(),
  );

  return mondayIndex === -1 ? { mondayIndex: 0 } : { mondayIndex };
};
