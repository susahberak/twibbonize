let shareData = {
title: 'BERA APP',
text: 'Twibbon App',
url: 'https://bera.pages.dev/',
}

const btn = document.querySelector('em');
const resultPara = document.querySelector('.result');

btn.addEventListener('click', () => {
navigator.share(shareData)
.then(() =>
resultPara.textContent = 'Twibbon shared successfully'
)
.catch((e) =>
resultPara.textContent = 'Error: ' + e
)
});

// copy
bera("", "rgba(255,255,255,.5)");
