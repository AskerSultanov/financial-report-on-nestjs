var createTitle = (content) => {
  var title = document.createElement("h3");
  title.append(content);
  title.className = "modal-title";

  return title;
};

export default createTitle;
