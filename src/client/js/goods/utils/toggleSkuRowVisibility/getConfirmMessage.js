var getConfirmMessage = (skuName, msg) =>
  msg === "to-disable"
    ? `Скрыть товар <${skuName}> из таблицы?\n`
    : `Включить товар <${skuName}> в таблицу?\n`;

export default getConfirmMessage;
