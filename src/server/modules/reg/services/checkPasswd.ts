export function checkPasswd(pwd: string): {
  errText: string;
  pwdIsValid: boolean;
} {
  var errText = '';
  var pwdIsValid = false;

  if (!pwd || !pwd.length) {
    errText = 'Пароль не может быть пустым';
    return { errText, pwdIsValid };
  }

  pwd = pwd.trim();

  var pwdIsEmpty = pwd.length === 0;

  if (pwdIsEmpty) {
    errText = 'Пароль не должен содержать пробелов';
    return { errText, pwdIsValid };
  }

  if (pwd.length < 4) {
    errText = 'Длина пароля должна быть больше 3';
    return { errText, pwdIsValid };
  }

  if (pwd.length > 21) {
    errText = 'Длина пароля должна быть меньше 21';
    return { errText, pwdIsValid };
  }

  return { errText, pwdIsValid: true };
}
