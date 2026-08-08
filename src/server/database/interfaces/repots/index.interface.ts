import { Document } from 'mongoose';
import {IReport} from './reportItem.interface.js'
import {IReportsWithAccountedFinances} from './reportsWithAccountedFinances.interface.js'


export interface IReports extends Document {
  userId: string;
  reports: IReport[];
  schemaVersion?: number;
  reportsWithAccountedFinances: IReportsWithAccountedFinances[];
}


export * from './skuItem.interface.js'
export * from './reportItem.interface.js'
export * from './recordedTo.interface.js'
export * from './reportsWithAccountedFinances.interface.js'