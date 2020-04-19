const appRoot = document.getElementById("app-root");
if (appRoot) {
  appRoot.innerText = "Loaded!";
}

if (module.hot) {
  module.hot.accept();
}
