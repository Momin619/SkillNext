import data from "./data.json";

// ✅ All sectors array
export const sectors = data.sectors || [];

// ✅ Lookup maps
export const fieldMap = {};
export const subfieldMap = {};

for (const sector of sectors) {
  if (!sector.fields) continue;

  for (const field of sector.fields) {
    fieldMap[field.id] = { ...field, sectorId: sector.id };

    if (!field.subFields) continue;

    for (const sub of field.subFields) {
      subfieldMap[sub.id] = { ...sub, fieldId: field.id, sectorId: sector.id };
    }
  }
}

export { data };
