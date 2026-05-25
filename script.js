const tabs = Array.from(document.querySelectorAll("[data-target]"));
const pages = Array.from(document.querySelectorAll("[data-homepage]"));

function findPageForId(id) {
  const target = document.getElementById(id);
  if (!pages.length) return null;
  if (!target) return pages[0];
  return target.matches("[data-homepage]") ? target : target.closest("[data-homepage]") || pages[0];
}

function activateLayout(id, updateHash = true, shouldScroll = false) {
  const nextPage = findPageForId(id);

  if (!nextPage) {
    if (shouldScroll) {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
    return;
  }

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

const contactTriggers = Array.from(document.querySelectorAll("[data-contact-trigger]"));
const emailToCopy = "cornicellocaffe@gmail.com";

contactTriggers.forEach((trigger) => {
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  if (!panel) return;

  trigger.addEventListener("click", () => {
    const shouldOpen = panel.hidden;
    panel.hidden = !shouldOpen;
    trigger.setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
      panel.focus({ preventScroll: true });
    }
  });
});

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const panel = button.closest(".contact-panel");
    const status = panel?.querySelector(".copy-status");

    try {
      await navigator.clipboard.writeText(emailToCopy);
      if (status) status.textContent = "Email copied.";
    } catch {
      if (status) status.textContent = `Email: ${emailToCopy}`;
    }
  });
});

if (new URLSearchParams(window.location.search).has("contact")) {
  const firstContactTrigger = contactTriggers[0];
  if (firstContactTrigger) {
    requestAnimationFrame(() => {
      if (firstContactTrigger.getAttribute("aria-expanded") !== "true") {
        firstContactTrigger.click();
      }
    });
  }
}
