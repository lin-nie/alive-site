// Fold and unfold the headings in the left sidebar tree.
// The page you are on lists its headings under its own name; a small arrow
// next to that name folds the whole list, and an arrow next to a heading with
// smaller headings under it folds just those. Clicking a heading still jumps to it.
(function () {
  function makeButton(item, label) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "alive-fold";
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", label);
    button.title = label;
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var folded = item.classList.toggle("alive-folded");
      button.setAttribute("aria-expanded", folded ? "false" : "true");
    });
    return button;
  }

  function addToggle(item, child, label) {
    if (!child || item.querySelector(":scope > .alive-fold")) return;
    item.classList.add("alive-foldable");
    item.insertBefore(makeButton(item, label), child);
  }

  function init() {
    var sidebar = document.querySelector(".md-sidebar--primary");
    if (!sidebar) return;
    var zh = document.documentElement.lang === "zh";
    // The current page: fold its whole list of headings at once.
    sidebar.querySelectorAll(".md-nav__item--active > .md-nav--secondary").forEach(function (toc) {
      addToggle(toc.parentElement, toc, zh ? "折叠或展开本页标题" : "Fold or unfold the headings on this page");
    });
    // A heading with smaller headings under it.
    sidebar.querySelectorAll(".md-nav--secondary li.md-nav__item").forEach(function (item) {
      addToggle(item, item.querySelector(":scope > nav.md-nav"), zh ? "折叠或展开" : "Fold or unfold");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
