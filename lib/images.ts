/**
 * Unsplash photo IDs, all verified to resolve. Build URLs with `photo()` so
 * every image requests an appropriately sized, auto-formatted asset.
 */
export function photo(id: string, width = 1200, height?: number): string {
  const crop = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}${crop}&q=80`;
}

export const EXTERIORS = [
  "photo-1568605114967-8130f3a36994",
  "photo-1570129477492-45c003edd2be",
  "photo-1523217582562-09d0def993a6",
  "photo-1512917774080-9991f1c4c750",
  "photo-1564013799919-ab600027ffc6",
  "photo-1580587771525-78b9dba3b914",
  "photo-1613977257363-707ba9348227",
  "photo-1449844908441-8829872d2607",
  "photo-1505873242700-f289a29e1e0f",
  "photo-1416331108676-a22ccb276e35",
  "photo-1507089947368-19c1da9775ae",
  "photo-1600585152220-90363fe7e115",
  "photo-1600596542815-ffad4c1539a9",
  "photo-1600047509807-ba8f99d2cdde",
  "photo-1600047509358-9dc75507daeb",
  "photo-1521783988139-89397d761dce",
  "photo-1600563438938-a9a27216b4f5",
  "photo-1583608205776-bfd35f0d9f83",
  "photo-1565182999561-18d7dc61c393",
  "photo-1554995207-c18c203602cb",
  "photo-1583847268964-b28dc8f51f92",
  "photo-1540518614846-7eded433c457",
  "photo-1502005097973-6a7082348e28",
  "photo-1580216643062-cf460548a66a",
  "photo-1571939228382-b2f2b585ce15",
  "photo-1574362848149-11496d93a7c7",
  "photo-1533090161767-e6ffed986c88",
  "photo-1519999482648-25049ddd37b1",
  "photo-1560184897-ae75f418493e",
] as const;

export const TOWERS = [
  "photo-1502005229762-cf1b2da7c5d6",
  "photo-1545324418-cc1a3fa10c00",
  "photo-1512915922686-57c11dde9b6b",
  "photo-1522771739844-6a9f6d5f14af",
] as const;

export const INTERIORS = [
  "photo-1600585154340-be6161a56a0c",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1600607687920-4e2a09cf159d",
  "photo-1502672260266-1c1ef2d93688",
  "photo-1493809842364-78817add7ffb",
  "photo-1522708323590-d24dbb6b0267",
  "photo-1560448204-e02f11c3d0e2",
  "photo-1598928506311-c55ded91a20c",
  "photo-1524758631624-e2822e304c36",
  "photo-1494526585095-c41746248156",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1600573472550-8090b5e0745e",
  "photo-1600121848594-d8644e57abab",
  "photo-1600566753151-384129cf4e3e",
  "photo-1600585153490-76fb20a32601",
  "photo-1600585154526-990dced4db0d",
  "photo-1600585154084-4e5fe7c39198",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1616594039964-ae9021a400a0",
  "photo-1618221195710-dd6b41faaea6",
  "photo-1631049307264-da0ec9d70304",
  "photo-1615874959474-d609969a20ed",
  "photo-1600573472592-401b489a3cdc",
  "photo-1600607688969-a5bfcd646154",
  "photo-1600607688960-e095ff83135c",
  "photo-1600585154363-67eb9e2e2099",
] as const;

export const ROOMS = [
  "photo-1600566753086-00f18fb6b3ea",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1600210491892-03d54c0aaf87",
  "photo-1595526114035-0d45ed16cfbf",
  "photo-1484154218962-a197022b5858",
  "photo-1556912173-3bb406ef7e77",
] as const;

export const WORKSPACES = [
  "photo-1497366754035-f200968a6e72",
  "photo-1497366811353-6870744d04b2",
  "photo-1486406146926-c627a92ad1ab",
] as const;

/** Deterministic gallery so a listing always shows the same photos. */
export function gallery(seed: number, kind: "home" | "tower" | "office" = "home") {
  const hero =
    kind === "office"
      ? WORKSPACES[seed % WORKSPACES.length]
      : kind === "tower"
        ? TOWERS[seed % TOWERS.length]
        : EXTERIORS[seed % EXTERIORS.length];

  return [
    hero,
    INTERIORS[seed % INTERIORS.length],
    INTERIORS[(seed * 3 + 5) % INTERIORS.length],
    ROOMS[seed % ROOMS.length],
    INTERIORS[(seed * 7 + 11) % INTERIORS.length],
    ROOMS[(seed * 5 + 3) % ROOMS.length],
  ];
}
