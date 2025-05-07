const colors = new Map();
colors.set("claret", "9D0134");
colors.set("red", "D31A1A");
colors.set("persimmon", "F45601");
colors.set("dartmouth", "036839");
colors.set("tekhelet", "462A87");
colors.set("fuchsia", "BE33C1");
colors.set("orange", "FF8908");
colors.set("lime", "AACC02");
colors.set("seagreen", "008041");
colors.set("cobalt", "2647A5");

export function getRandomColor(): string {
  const values = Array.from(colors.values());
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
