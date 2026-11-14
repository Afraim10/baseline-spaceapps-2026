/* AI-assisted (GPT-6 Astra via Kilo), reviewed by author. */
(() => {
  "use strict";

  const { claims, sources } = window.BASELINE;
  const verifiedClaims = claims.filter((claim) => claim.verified === true);
  document.getElementById("claims-total").textContent = String(claims.length);
  document.getElementById("claims-verified").textContent = String(verifiedClaims.length);
  document.getElementById("claims-unverified").textContent = String(claims.length - verifiedClaims.length);
  document.getElementById("sources-total").textContent = String(sources.length);

  const logo = document.getElementById("project-logo");
  const showLogoPlaceholder = () => {
    logo.hidden = true;
    document.getElementById("logo-placeholder").hidden = false;
  };
  logo.addEventListener("error", showLogoPlaceholder, { once: true });
  if (logo.complete && logo.naturalWidth === 0) {
    showLogoPlaceholder();
  }

  if (new URLSearchParams(window.location.search).get("dev") !== "1") {
    return;
  }

  const sourceIds = new Set(sources.map((source) => source.source_id));
  const issues = [];
  for (const claim of verifiedClaims) {
    const label = claim.id || "(missing id)";
    if (typeof claim.source_id !== "string" || !claim.source_id.trim() || !sourceIds.has(claim.source_id)) {
      issues.push(`Claim ${label}: source_id does not reference a registered source.`);
    }
    if (typeof claim.locator !== "string" || !claim.locator.trim()) {
      issues.push(`Claim ${label}: locator is missing or empty.`);
    }
  }

  document.getElementById("dev-lint-panel").hidden = false;
  document.getElementById("dev-lint-status").textContent = issues.length > 0
    ? `${issues.length} verified-claim metadata issue(s) found.`
    : "No verified-claim metadata issues found. This is not scientific verification.";

  const issueList = document.getElementById("dev-lint-issues");
  issueList.hidden = issues.length === 0;
  for (const issue of issues) {
    const item = document.createElement("li");
    item.textContent = issue;
    issueList.appendChild(item);
  }
})();
