import { ClientSession } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import defaultTaxParams from '../defaultTaxParams.js';
import { ITaxYear } from '../../../interfaces/taxParams.interface.js';

export async function addNewTaxYearToDb(
  userId: string,
  year: number,
  session: ClientSession,
): Promise<ITaxYear | NotFoundException> {
  var data = await this.taxParamsModel.findOne({ userId }, null, {
    session: session,
  });
  var taxYears = data.toObject().years;

  var existTaxParams = taxYears.find(
    (params: ITaxYear) => params.year === year,
  );
  if (existTaxParams) {
    var nextYear = year + 1;
    var nextYearTaxParams = taxYears.find(
      (params: ITaxYear) => params.year === nextYear,
    );
    if (!nextYearTaxParams) {
      var defaultNextYearTaxParams = defaultTaxParams.find(
        (i) => i.year === nextYear,
      );
      await this.taxParamsModel.updateOne(
        { userId },
        { $push: { years: { ...defaultNextYearTaxParams } } },
        { session: session },
      );
    }

    return existTaxParams;
  }

  var defaultCurrentYearTaxParams = defaultTaxParams.find(
    (taxParams) => taxParams.year === year,
  );

  if (!defaultCurrentYearTaxParams) {
    throw new NotFoundException();
  }

  await this.taxParamsModel.updateOne(
    { userId },
    { $push: { years: { ...defaultCurrentYearTaxParams } } },
    { session: session },
  );

  return defaultCurrentYearTaxParams;
}
