document.addEventListener('DOMContentLoaded', run);

function run() {
  var countArea = document.querySelector('#data');

  chrome.storage.local.get('sites', (data) => {
    countArea.textContent = JSON.stringify(data.sites);
  });

  chrome.storage.onChanged.addListener((changes) => {
    if(changes.sites) {
      countArea.textContent = JSON.stringify(changes.sites.newValue);
    }
  });
}