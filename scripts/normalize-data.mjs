import { readFile, writeFile } from "node:fs/promises";

const dataUrl = new URL("../dollmatch.orig.json", import.meta.url);
const outUrl = new URL("../src/dollmatch/data.json", import.meta.url);

const dolls = JSON.parse(await readFile(dataUrl, "utf8"));

const isSet = (v) => v !== null && v !== undefined;

/** @type {import("../src/dollmatch/data").Doll[]} */
const normalized = dolls.map((d, i) => {
  /** @type {import("../src/dollmatch/data").Doll} */
  const item = { id: i };

  item.mattel_id = d.model_number;
  item.name = d.name;
  item.year = isSet(d.year_released) ? d.year_released : null;
  item.image_url = isSet(d.image_url) ? d.image_url : null;

  const mtmBody =
    d.is_mtm === true &&
    isSet(d.mtm_edition) &&
    ["MTM", "Made to Move"].includes(d.body_type);
  const bodyType = mtmBody ? d.mtm_edition : d.body_type;
  if (isSet(bodyType)) item.body_type = String(bodyType).toLowerCase();

  item.is_mtm = d.is_mtm === true;
  if (isSet(d.mtm_edition)) item.mtm_variant = "classic";

  item.skintone = {
    name: isSet(d.skin_tone) ? d.skin_tone : null,
    color: isSet(d.skin_tone_hex) ? d.skin_tone_hex : null,
    description: isSet(d.skin_tone_description) ? d.skin_tone_description : null,
  };

  item.facesculpt = isSet(d.face_sculpt_name) ? d.face_sculpt_name : null;
  item.line = isSet(d.doll_line) ? d.doll_line : null;

  return item;
});

await writeFile(outUrl, JSON.stringify(normalized, null, 2) + "\n");
console.log(`Normalized ${normalized.length} items -> src/dollmatch/data.json`);
