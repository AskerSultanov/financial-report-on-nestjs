var sendAuthData = async (login, passwd) => {
  var res = await fetch("/auth", {
    method: "POST",
    body: JSON.stringify({ login, passwd }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 404) {
    alert(`Нет пользователя c ником  "${login}"`);
    return;
  }

  if (res.status == 403) {
    alert("Введены неправильные данные");
    return;
  }

  var { redirectUrl } = await res.json();

  return redirectUrl;
};

var authFormHandler = async () =>
  (document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();

    var login = document.getElementById("login").value;
    var passwd = document.getElementById("passwd").value;

    var redirectUrl = await sendAuthData(login, passwd);

    if (!redirectUrl) {
      return;
    }

    window.location.href = redirectUrl;
  });

authFormHandler();
