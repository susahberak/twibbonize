let shareData = {
title: 'Twibbon APP',
text: 'Twibbon APP',
url: 'https://erossavanka.cyclic.app/',
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
