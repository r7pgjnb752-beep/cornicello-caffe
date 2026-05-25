const tabs = Array.from(document.querySelectorAll("[data-target]"));
const pages = Array.from(document.querySelectorAll("[data-homepage]"));

function findPageForId(id) {
  const target = document.getElementById(id);
  if (!target) return pages[0];
  return target.matches("[data-homepage]") ? target : target.closest("[data-homepage]") || pages[0];
}

function activateLayout(id, updateHash = true, shouldScroll = false) {
  const nextPage = findPageForId(id);

  pages.forEach((page) => {
    page.classList.toggle("is-active", page === nextPage);
  });

  tabs.forEach((tab) => {
    const active = tab.dataset.target === nextPage.id;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });

  if (updateHash) {
    history.replaceState(null, "", `#${id}`);
  }

  if (shouldScroll && id === nextPage.id) {
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
    });
  }

  if (shouldScroll && id !== nextPage.id) {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateLayout(tab.dataset.target, true, true));
});

window.addEventListener("hashchange", () => {
  const id = window.location.hash.slice(1);
  if (id) activateLayout(id, false, true);
});

const initialId = window.location.hash.slice(1);
if (initialId) {
  activateLayout(initialId, false, true);
}
