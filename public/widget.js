(function () {
  var scriptEl = document.currentScript;
  if (!scriptEl) return;

  var companyId = scriptEl.getAttribute("data-company-id");
  if (!companyId) {
    console.error("[norsk-support-bot] Mangler data-company-id på script-taggen.");
    return;
  }

  var origin = new URL(scriptEl.src).origin;
  var open = false;

  var style = document.createElement("style");
  style.textContent =
    ".nsb-widget-knapp{transition:transform .15s ease,box-shadow .15s ease}" +
    ".nsb-widget-knapp:hover{transform:scale(1.06);box-shadow:0 6px 20px rgba(13,148,136,0.4)}";
  document.head.appendChild(style);

  var button = document.createElement("button");
  button.className = "nsb-widget-knapp";
  button.setAttribute("aria-label", "Åpne chat");
  button.innerHTML = "&#128172;";
  button.style.cssText = [
    "position:fixed",
    "bottom:20px",
    "right:20px",
    "width:56px",
    "height:56px",
    "border-radius:9999px",
    "background:#0d9488",
    "color:#fff",
    "font-size:24px",
    "border:none",
    "cursor:pointer",
    "box-shadow:0 4px 14px rgba(13,148,136,0.35)",
    "z-index:2147483000",
  ].join(";");

  var iframe = document.createElement("iframe");
  iframe.src = origin + "/widget?companyId=" + encodeURIComponent(companyId);
  iframe.title = "Kundeservice-chat";
  iframe.style.cssText = [
    "position:fixed",
    "bottom:88px",
    "right:20px",
    "width:360px",
    "height:520px",
    "max-width:calc(100vw - 40px)",
    "max-height:calc(100vh - 120px)",
    "border:none",
    "border-radius:16px",
    "box-shadow:0 8px 30px rgba(0,0,0,0.25)",
    "z-index:2147483000",
    "display:none",
  ].join(";");

  function toggle() {
    open = !open;
    iframe.style.display = open ? "block" : "none";
    button.innerHTML = open ? "&#10005;" : "&#128172;";
  }

  button.addEventListener("click", toggle);

  document.body.appendChild(iframe);
  document.body.appendChild(button);
})();
