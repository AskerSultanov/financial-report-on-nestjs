export async function getReport(userId: string, reportId: number) {
  var { report } = await this.reportsModelServices.getReportById(
    userId,
    reportId,
  );

  var { skusLastCostPrice } =
    await this.goodsModelServices.getSkusLastCostPrice();
}
