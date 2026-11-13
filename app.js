"use strict";

const verifiedClaims = window.BASELINE_CLAIMS.filter(
  (claim) => claim.verified === true
);

if (verifiedClaims.length > 0) {
  const claimsList = document.getElementById("claims-list");
  document.getElementById("claims-status").textContent =
    "Only manually verified claims are shown.";

  for (const claim of verifiedClaims) {
    const item = document.createElement("li");
    item.textContent = `${claim.text} (Source: ${claim.source_id})`;
    claimsList.appendChild(item);
  }

  claimsList.hidden = false;
}
