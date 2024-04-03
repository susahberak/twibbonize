let url = 'https://bera.pages.dev/config/quotes.json';
    function updateQuote() {
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random];
      document.querySelector('#quote').innerHTML = quote.quote;
      document.querySelector('#by').innerHTML = quote.by;
    }
    fetch(url).then(res => res.json()).then(data => {
      quotes = data;
      updateQuote();
    });
