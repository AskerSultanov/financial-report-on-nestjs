import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import {
  TaxParams,
  TaxParamsDocument,
} from '../../schemas/taxParams.schema.js';

import { ITaxYear, IYears } from '../../interfaces/taxParams.interface.js';

import { deleteTaxYears } from './utils/deleteTaxYears.js';
import { addNewTaxYearToDb } from './utils/addNewTaxYearToDb.js';
import { getTaxParamsFromDb } from './utils/getTaxParamsFromDb.js';
import { changeTaxParamsToDb } from './utils/changeTaxParamsToDb.js';

@Injectable()
export class TaxParamsModelServices {
  constructor(
    @InjectModel(TaxParams.name)
    private taxParamsModel: Model<TaxParamsDocument>,
  ) {}

  getTaxParamsFromDb: (
    userId: string,
    year: number,
    session: ClientSession | null | undefined,
  ) => Promise<ITaxYear | IYears> = getTaxParamsFromDb;

  addNewTaxYearToDb: (
    userId: string,
    year: number,
    session: ClientSession,
  ) => Promise<ITaxYear | NotFoundException> = addNewTaxYearToDb;

  changeTaxParamsToDb: (
    userId: string,
    session: ClientSession,
    ...updatedTaxParams: ITaxYear[]
  ) => Promise<boolean> = changeTaxParamsToDb;

  deleteTaxYears: (userId: string) => Promise<void> = deleteTaxYears;
}
