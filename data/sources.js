// BASELINE — data/sources.js
// URLs and labels copied from INDEX.txt (which gives hosts without https://).
// INDEX.txt is a list of citations, not proof a page was opened: open each page,
// then replace "title" with the page's own title and "url" with the address bar URL.
// "accessed" = the day you actually opened it. One entry per source_id.

window.BASELINE = window.BASELINE || {};
window.BASELINE.sources = [
  { source_id: "nasa-hrp-hazards",           title: "Five Hazards of Human Spaceflight",                          publisher: "NASA Human Research Program", url: "https://www.nasa.gov/hrp/hazards/",                          accessed: "2026-11-15" },

  { source_id: "nasa-hazard-gravity-fields", title: "Gravity Fields",                                             publisher: "NASA Human Research Program", url: "https://www.nasa.gov/hrp/hazard-gravity-fields/",           accessed: "2026-11-15" },


  { source_id: "nasa-hrp-isolation",         title: "Isolation and Confinement",                                  publisher: "NASA Human Research Program", url: "https://www.nasa.gov/hrp/hazard-isolation-and-confinement/", accessed: "2026-11-15" },


  { source_id: "nasa-hrp-distance",          title: "Distance from Earth",                                        publisher: "NASA Human Research Program", url: "https://www.nasa.gov/hrp/hazard-distance-from-earth/",       accessed: "2026-11-15" },


  { source_id: "nasa-space-radiation-risks", title: "Space Radiation",                                            publisher: "NASA Human Research Program", url: "https://nasa.gov/hrp/5-hazards-of-human-spaceflight/space-radiation/",           accessed: "2026-11-15" },


  { source_id: "nasa-hfbp-risks",            title: "Sleep Loss, Circadian Desynchronization, and Work Overload Risk", publisher: "NASA Human Research Roadmap", url: "https://www.nasa.gov/directorates/esdmd/hhp/risk-of-performance-decrements-and-adverse-health-outcomes-resulting-from-sleep-loss-circadian-desynchronization-and-work-overload/",              accessed: "2026-11-15" },


 { source_id: "nasa-hfbp-slee-risk",            title: "Risk of Performance Decrements and Adverse Health Outcomes Resulting from Sleep Loss, Circadian Desynchronization, and Work Overload", publisher: "NASA Human Research Roadmap", url: "https://humanresearchroadmap.nasa.gov/Risks/risk.aspx?i=100",              accessed: "2026-11-15" },  



  
  { source_id: "csa-bio-monitor",            title: "Bio-Monitor: Keeping an eye on astronauts' vital signs",     publisher: "Canadian Space Agency",       url: "https://asc-csa.gc.ca/eng/sciences/bio-monitor.asp",           accessed: "2026-11-15" },



  { source_id: "habitability_functions",            title: "Features of the system required for human occupancy.",     publisher: "NASA-STD-3001-Vol-2",       url: "https://www.nasa.gov/reference/7-0-habit-ability-functions-vol-2/",             accessed: "2026-11-15" },


  { source_id: "ntrs-iss-lab-analysis",            title: "Laboratory Analysis Capability for the International Space Station and Future Space Exploration Missions",     publisher: "NASA (NTRS)",       url: "https://ntrs.nasa.gov/api/citations/20150012223/downloads/20150012223.pdf",             accessed: "2026-11-15" },

   { source_id: "nasa-hazard-hostile-closed-environments",            title: "Hazard: Hostile/Closed Environments",     publisher: "NASA Human Research Program",       url: "https://www.nasa.gov/hrp/hazard-hostile-closed-environments/",             accessed: "2026-11-15" },

  // Not registered yet (their claims stay verified: false):
  // nasa-hazard-hostile-closed-environments, csa-bio-analyzer, bcm-1drop-istat
  // (INDEX.txt has no Baylor College of Medicine entry; use the page you opened.)
];