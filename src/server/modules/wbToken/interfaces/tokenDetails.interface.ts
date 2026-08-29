export interface ITokenDetails {
  id: string;
  daysLeft: string;
  validUntil: string;
  isExpired: boolean;
  expiredToday: boolean;
  tokenIsExist: boolean;
}
