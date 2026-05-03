(function () {
  var progress = document.querySelector(".progress");
  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function updateProgress() {
    if (!progress) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = Math.max(0, Math.min(100, percent)) + "%";
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  Array.prototype.slice.call(document.querySelectorAll("[data-mail-form]")).forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var subject = form.getAttribute("data-subject") || "Demande depuis le site";
      var to = form.getAttribute("data-to");
      var parts = Array.prototype.slice.call(form.querySelectorAll("input, textarea, select"))
        .filter(function (field) { return field.value; })
        .map(function (field) {
          return field.getAttribute("data-label") + " : " + field.value;
        });

      if (to) {
        window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(parts.join("\n"));
      }
    });
  });

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
})();
