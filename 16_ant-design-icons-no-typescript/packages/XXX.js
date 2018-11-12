(function(window) {
  var svgSprite =
    '<svg><symbol id="icon-bianji" viewBox="0 0 1024 1024"><path d="M880.288 232.48L560.192 45.12a95.648 95.648 0 0 0-96.64 0L143.68 232.48A96.64 96.64 0 0 0 96 315.904v397.664c0 34.784 18.624 66.88 48.736 84l320 181.92a95.52 95.52 0 0 0 94.496 0l320-181.92A96.576 96.576 0 0 0 928 713.568V315.904a96.64 96.64 0 0 0-47.712-83.424zM864 713.568c0 11.584-6.208 22.304-16.256 28l-320 181.92a31.776 31.776 0 0 1-31.488 0l-320-181.92A32.192 32.192 0 0 1 160 713.568V315.904c0-11.456 6.048-22.048 15.904-27.808l319.872-187.36a31.84 31.84 0 0 1 32.192 0l320.128 187.392c9.856 5.728 15.904 16.32 15.904 27.776v397.664z"  ></path><path d="M512 320a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m0 320a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"  ></path></symbol><symbol id="icon-guanlianshebei" viewBox="0 0 1024 1024"><path d="M260.096 544H160a32 32 0 0 1-32-32V256h480v256a32 32 0 0 1-32 32h-54.976a32 32 0 0 0 0 64H576a96 96 0 0 0 96-96V160a96 96 0 0 0-96-96H160a96 96 0 0 0-96 96v352a96 96 0 0 0 96 96h100.096a32 32 0 0 0 0-64zM128 160a32 32 0 0 1 32-32h416a32 32 0 0 1 32 32v32H128V160z"  ></path><path d="M864 416h-90.88a32 32 0 0 0 0 64H864a32 32 0 0 1 32 32v256H416v-256a32 32 0 0 1 32-32h63.072a32 32 0 0 0 0-64H448a96 96 0 0 0-96 96v352a96 96 0 0 0 96 96h416a96 96 0 0 0 96-96V512a96 96 0 0 0-96-96z m32 448a32 32 0 0 1-32 32H448a32 32 0 0 1-32-32v-32h480v32z"  ></path></symbol><symbol id="icon-jichuguanli" viewBox="0 0 1024 1024"><path d="M941.44 865.472a447.808 447.808 0 0 0-397.44-320V352h128a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v128a32 32 0 0 0 32 32h128v193.472a447.84 447.84 0 0 0-397.504 320A64 64 0 1 0 160 928c0-16.48-6.4-31.36-16.64-42.688A384 384 0 0 1 480 609.504v263.392c-19.04 11.072-32 31.488-32 55.136a64 64 0 0 0 128 0c0-23.616-12.96-44.032-32-55.136v-263.392a383.936 383.936 0 0 1 336.608 275.872A63.36 63.36 0 0 0 864 928a64 64 0 0 0 128 0 64 64 0 0 0-50.56-62.528z"  ></path><path d="M288 480h77.472a32 32 0 0 0 0-64H288a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32h-90.624a32 32 0 0 0 0 64H736a96 96 0 0 0 96-96V128a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v256a96 96 0 0 0 96 96z"  ></path></symbol></svg>';
  var script = (function() {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();
  var shouldInjectCss = script.getAttribute("data-injectcss");
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false);
          fn();
        };
        document.addEventListener("DOMContentLoaded", loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function() {
          if (!done) {
            done = true;
            fn();
          }
        };
      var polling = function() {
        try {
          d.documentElement.doScroll("left");
        } catch (e) {
          setTimeout(polling, 50);
          return;
        }
        init();
      };
      polling();
      d.onreadystatechange = function() {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;
          init();
        }
      };
    }
  };
  var before = function(el, target) {
    target.parentNode.insertBefore(el, target);
  };
  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement("div");
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName("svg")[0];
    if (svg) {
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = "hidden";
      prepend(svg, document.body);
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  ready(appendSvg);
})(window);
