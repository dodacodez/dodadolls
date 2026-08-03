import { readFile } from "node:fs/promises";

const dolls = JSON.parse(
  await readFile(new URL("../src/dollmatch/data.json", import.meta.url), "utf8")
);

const mtmFlagged = dolls.filter((d) => d.is_mtm === true);
const mtmBodyType = dolls.filter((d) =>
  ["MTM", "Made to Move"].includes(d.body_type)
);

console.log(`is_mtm=true: ${mtmFlagged.length}`);
console.log(`body_type MTM/Made to Move: ${mtmBodyType.length}`);

if (mtmFlagged.length !== mtmBodyType.length) {
  const flagged = new Set(mtmFlagged.map((d) => d.id));
  const bodyType = new Set(mtmBodyType.map((d) => d.id));
  const onlyFlagged = mtmFlagged.filter((d) => !bodyType.has(d.id));
  const onlyBodyType = mtmBodyType.filter((d) => !flagged.has(d.id));

  if (onlyFlagged.length) {
    console.log("\nis_mtm=true but body_type is not MTM/Made to Move:");
    for (const d of onlyFlagged) console.log(`  #${d.id} ${d.name} (${d.body_type})`);
  }
  if (onlyBodyType.length) {
    console.log("\nbody_type MTM/Made to Move but is_mtm is not true:");
    for (const d of onlyBodyType) console.log(`  #${d.id} ${d.name} (is_mtm=${d.is_mtm})`);
  }

  process.exitCode = 1;
} else {
  console.log("\nOK: counts match");
}
