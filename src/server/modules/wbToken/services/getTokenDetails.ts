import { ITokenDetails } from '../interfaces/tokenDetails.interface.js';
import { IWBTokenPayload } from '../interfaces/wbTokenPayload.interface.js';

var msInOneSec: number = 1000;
var msInDay: number = 86_400_000;
var mskTimeOffsetInMs: number = 10_800_000;
var monthList: string[] = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export var getTokenDetails = (token: IWBTokenPayload): ITokenDetails => {
  var { exp, id } = token;

  var expInMs: number = exp * msInOneSec;
  var currentTimestamp: number = Date.now() + mskTimeOffsetInMs;
  var isExpired: boolean = currentTimestamp > expInMs;

  var daysLeft: string;

  if (isExpired) {
    daysLeft = '-';
  } else {
    var difference: number = expInMs - currentTimestamp;
    var daysLeft = (difference / msInDay).toString().split('.')[0];
  }

  var currentDate: string = new Date(currentTimestamp).toISOString();
  var currentDateWithoutHour: string = currentDate.split('T')[0];

  var dateFromExp: string = new Date(expInMs).toISOString();
  var dateFromExpWithoutHour: string = dateFromExp.split('T')[0];

  var [year, month, day] = dateFromExpWithoutHour.split('-');
  var monthNum: number = +month;
  var monthIndex: number = monthNum - 1;

  var validUntil: string = `${day} ${monthList[monthIndex]} ${year}`;

  var expiredToday: boolean = false;

  if (dateFromExpWithoutHour === currentDateWithoutHour) {
    expiredToday = true;
  }

  return {
    id,
    daysLeft,
    validUntil,
    isExpired,
    expiredToday,
    tokenIsExist: true,
  };
};
