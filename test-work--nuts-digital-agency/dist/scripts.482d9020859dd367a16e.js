(()=>{"use strict";window.onload=function(){var t=0,e=4,i=window.matchMedia("(max-width: 1200px)"),r=window.matchMedia("(max-width: 767px)"),a=window.matchMedia("(max-width: 576px)");i.matches&&(e=3),r.matches&&(e=2),a.matches&&(e=1);var d=document.querySelector(".slider"),n=(d.querySelector(".slider__line"),d.querySelector(".slider__content")),s=d.querySelector(".slider__moving-part"),c=d.querySelectorAll(".slide"),o=d.querySelector(".slider__arrow--prev"),l=d.querySelector(".slider__arrow--next"),u=c.length,b=n.offsetWidth/e,h=1*b;c.forEach((function(t){t.style.width=b+"px"})),o.addEventListener("click",(function(){o.setAttribute("data-click",""),p()})),l.addEventListener("click",(function(){l.setAttribute("data-click",""),y()}));var f,w,m=function(t){s.style.transform="translateX(".concat(t,"px)"),v()},v=function(){0===t?o.setAttribute("disabled",""):o.removeAttribute("disabled"),t<=-(u-e)*b?l.setAttribute("disabled",""):l.removeAttribute("disabled")},p=function(){if(!o.hasAttribute("disabled")){var e=Math.abs(t)/b;m(t+=e>=1?h:e*b)}},y=function(){if(!l.hasAttribute("disabled")){var i=u-(Math.abs(t)+e*b)/b;m(t-=i>=1?h:i*b)}};v(),f=0,w=0,s.addEventListener("pointerdown",(function(t){w=t.pageX,s.style.cursor="grabbing"})),s.addEventListener("pointerup",(function(t){f=w,(w=t.pageX)<f&&y(),w>f&&p(),s.setAttribute("data-drag-slider","")}))}()})();
//# sourceMappingURL=scripts.482d9020859dd367a16e.js.map