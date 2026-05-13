const MSGS = {
  name: "Data Ingest Board",
};

const SEL = {
  table: ".js-gtm--btn-cta-switch",
};

const URLS = {
  domain: Cypress.env("domain") || "https://data.dev.sennetconsortium.org/",
};

const PATHS = {
  home: URLS.domain,
  search: URLS.domain + "search",
  create: URLS.domain + "senotype/create",
};

const WAIT = {
  time: Cypress.env("wait_time") || 1000,
  timeout: { timeout: 7 * 1000 },
};

const DATA = {
  markers: "SNT594.GFCC.674",
};

export { URLS, WAIT, PATHS, MSGS, SEL, DATA };
