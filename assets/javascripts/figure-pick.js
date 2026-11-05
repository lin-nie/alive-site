// Clickable figures (class "alive-pick"). Buttons and parts of the picture that
// share a data-part value light up together, with the matching note; the rest
// fades. Pointing with a mouse previews a part, a click or tap keeps it, and a
// second click clears it. This file holds no page text: all words are in the page.
(function () {
  function setUp(figure) {
    var chosen = "";
    var pointed = "";
    // After a click, the part under the mouse is not previewed again until the
    // mouse moves to something else, so a second click visibly clears it.
    var resting = "";

    function paint() {
      var lit = pointed || chosen;
      figure.setAttribute("data-lit", lit);
      figure.querySelectorAll("[data-part], [data-note]").forEach(function (el) {
        var key = el.getAttribute("data-part") || el.getAttribute("data-note");
        el.classList.toggle("is-lit", lit !== "" && key === lit);
        el.classList.toggle("is-dim", lit !== "" && key !== lit);
      });
      figure.querySelectorAll("button[data-part]").forEach(function (button) {
        button.setAttribute("aria-pressed", button.getAttribute("data-part") === chosen ? "true" : "false");
      });
    }

    function partAt(target) {
      var el = target.closest ? target.closest("[data-part]") : null;
      return el && figure.contains(el) ? el.getAttribute("data-part") : "";
    }

    figure.addEventListener("click", function (event) {
      var key = partAt(event.target);
      if (!key) return;
      chosen = chosen === key ? "" : key;
      pointed = "";
      resting = key;
      paint();
    });
    // Listen on the whole page, so the preview also ends when the mouse moves
    // from the figure to anything else.
    document.addEventListener("pointerover", function (event) {
      if (event.pointerType !== "mouse") return;
      var key = figure.contains(event.target) ? partAt(event.target) : "";
      if (key && key === resting) return;
      resting = "";
      if (key !== pointed) {
        pointed = key;
        paint();
      }
    });
    paint();
  }

  function start() {
    document.querySelectorAll(".alive-pick").forEach(setUp);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
