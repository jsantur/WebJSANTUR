(function() {
  if (!window.beehiivEmbedLoaded) {
    window.beehiiv__currentWindowWidth = window.outerWidth;
    window.beehiiv__currentWindowHeight = window.outerHeight;

    function loadBeehiivEmbed() {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'beehiiv:styles') {
          const height = event.data.payload.height;
          const width = event.data.payload.width;
          const src = event.data.payload.src;
          const borderRadius = event.data.payload.borderRadius || '0px';
          const boxShadow = event.data.payload.boxShadow || 'none';
          const iframe = document.querySelector(`iframe.beehiiv-embed[src="${src}"]`);
          requestAnimationFrame(() => {
            if (iframe.style.width !== width) iframe.style.width = width
            if (iframe.style.height !== height) iframe.style.height = height
            if (iframe.style.borderRadius !== borderRadius) iframe.style.borderRadius = borderRadius
            if (iframe.style.boxShadow !== boxShadow) iframe.style.boxShadow = boxShadow
          })
        } else if (event.data.type === 'beehiiv:success-toast') {
          const template = event.data.payload.templateString;
          const doc = (new DOMParser()).parseFromString(template, "text/html");
          const fragment = document.createDocumentFragment();
          [...doc.body.childNodes].forEach(node => fragment.appendChild(node));

          document.body.appendChild(fragment);
          setTimeout(() => document.querySelector("#beehiiv-toast").remove(), 5000);
        } else if (event.data.type === 'beehiiv:child-loaded') {
          const iframe = document.querySelector(`iframe.beehiiv-embed[src='${event.data.payload.src}']`);
          iframe.style.height = "2000px"
          iframe.style.width = "5000px"

          requestAnimationFrame(() => {
            iframe.contentWindow.postMessage({ type: 'beehiiv:parent-loaded' }, '*');
          });
        }
      });

      if (!window.beehiiv_resizeObserver) {
        window.beehiiv_resizeObserver = new ResizeObserver(() => {
          const resize = window.outerWidth > window.beehiiv__currentWindowWidth || window.outerHeight > window.beehiiv__currentWindowHeight;

          document.querySelectorAll('iframe.beehiiv-embed').forEach((iframe) => {
            if (resize) {
              requestAnimationFrame(() => {
                iframe.style.height = "2000px"
                iframe.style.width = "5000px"
                iframe.contentWindow.postMessage({ type: 'beehiiv:resize' }, '*');
              })
            }
          })

          window.beehiiv__currentWindowWidth = window.outerWidth;
          window.beehiiv__currentWindowHeight = window.outerHeight;
        });
        window.beehiiv_resizeObserver.observe(document.querySelector("body"));
      }
    }

    if (window.document.readyState === 'complete') {
      loadBeehiivEmbed();
    } else {
      window.addEventListener('load', loadBeehiivEmbed);
    }
    window.beehiivEmbedLoaded = true;
  }
})();
