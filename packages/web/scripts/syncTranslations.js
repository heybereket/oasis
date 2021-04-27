const english = require("../public/locales/en/translation.json");
const prettier = require("prettier");
const { traverseTranslations } = require("./traverseTranslations");
const { get, set } = require("lodash");
const { join } = require("path");
const fs = require("fs");

const paths = traverseTranslations();

fs.readdirSync(join(__dirname, "../public/locales")).forEach((locale) => {
  if (locale === "en") {
    return;
  }
  const filename = join(
    __dirname,
    "../public/locales",
    locale,
    "translation.json"
  );
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (err) {
    throw new Error(`${locale}: ${err.message}`);
  }
  paths.forEach((p) => {
    if (get(data, p, null) === null) {
      set(data, p, get(english, p));
    }
  });

  fs.writeFileSync(
    filename,
    prettier.format(JSON.stringify(data), {
      parser: "json",
      useTabs: true,
      // config,
    })
  );
});
