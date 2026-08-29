import { ITaxYear } from '../../../interfaces/taxParams.interface.js';

export interface IUpdatedTaxYear {
  year: number;
  data: Partial<ITaxYear>;
}
