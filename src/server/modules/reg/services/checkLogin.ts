export function checkLogin(login: string): {
  errText: string;
  loginIsValid: boolean;
} {
  var errText = '';
  var loginIsValid = false;

  if (!login) {
    errText = 'Логин не может быть пустым';
    return { errText, loginIsValid };
  }

  login = login.trim();

  if (login.length < 2) {
    errText = 'Минимальная длина логина равна 2';
    return { errText, loginIsValid };
  }

  if (login.length > 20) {
    errText = 'Максимальная длина логина равна 20';
    return { errText, loginIsValid };
  }

  var regExp = /[a-zA-Z0-9]/gi;

  var result = login.match(regExp);

  if (result?.length !== login.length) {
    errText = 'Логин должен содержать только латинские буквы или цифры';
    return { errText, loginIsValid };
  }

  return { errText, loginIsValid: true };
}
