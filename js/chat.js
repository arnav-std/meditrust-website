let chatOpen = false;

  // Prevent the widget from showing anything on load
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.onLoad = function () {
    Tawk_API.hideWidget();

    // Optional: auto-hide iframe container if needed
    const tawkIframe = document.querySelector('iframe[src*="tawk.to"]');
    if (tawkIframe) {
      tawkIframe.style.display = 'none';
    }

    const customButton = document.getElementById("customChatButton");
    if (customButton) {
      customButton.addEventListener("click", function () {
        const tawkIframe = document.querySelector('iframe[src*="tawk.to"]');

        if (chatOpen) {
          Tawk_API.minimize();
          chatOpen = false;
          if (tawkIframe) tawkIframe.style.display = 'none';
        } else {
          Tawk_API.maximize();
          chatOpen = true;
          if (tawkIframe) tawkIframe.style.display = 'block';
        }
      });
    }
  };

  // Load the Tawk.to script dynamically after page load
  window.addEventListener("load", function () {
    const s = document.createElement("script");
    s.src = 'https://embed.tawk.to/67f0eda5a7dfec190f0d8bab/1io2i0k35';; // replace with your actual URL
    s.async = true;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.body.appendChild(s);
  });