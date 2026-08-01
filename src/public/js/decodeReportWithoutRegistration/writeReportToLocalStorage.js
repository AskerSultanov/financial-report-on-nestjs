var writeReportToLocalStorage = (report) => localStorage.setItem(report.userId, JSON.stringify(report));

export default writeReportToLocalStorage;
