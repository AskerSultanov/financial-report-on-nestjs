interface Models {
  goodsModel: any;
  tokenModel: any;
  reportsModel: any;
  taxParamsModel: any;
  reportsTreeModel: any;
  reportLoadingStateModel: any;
  weeklyPricesAndDiscountsModel: any;
  connection: any;
}

var defaultReportLoadingState = {
  queueLength: 0,
  queueCapacity: 0,
  loadingInProgress: false,
  lastReportRequestTimestamp: 0,
  isReportLoadingDelayed: false,
  isReportLoadingIsStopped: false,
  loadingStopReason: '',
  emptyReportPeriodsIndexes: [],
  reportsQueue: [],
  abandonedReports: [],
};

export async function resetUser(this: Models, userId: string): Promise<void> {
  var session = await this.connection.startSession();

  try {
    session.startTransaction();

    await this.goodsModel.updateOne(
      { userId },
      { $set: { listGoods: [] } },
      { session },
    );
    await this.reportsModel.updateOne(
      { userId },
      { $set: { reports: [], reportsWithAccountedFinances: [] } },
      { session },
    );
    await this.taxParamsModel.updateOne(
      { userId },
      { $set: { years: [] } },
      { session },
    );
    await this.reportsTreeModel.updateOne(
      { userId },
      { $set: { years: [] } },
      { session },
    );
    await this.reportLoadingStateModel.updateOne(
      { userId },
      { $set: { ...defaultReportLoadingState } },
      { session },
    );
    await this.weeklyPricesAndDiscountsModel.updateOne(
      { userId },
      { $set: { weeklyPricesAndDiscounts: [] } },
      { session },
    );

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
  } finally {
    if (session.inTransaction()) {
      await session.endSession();
    }
  }
}
