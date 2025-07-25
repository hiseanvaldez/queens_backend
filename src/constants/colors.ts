export const colors = {
  pink: "#F8AEBB",
  blue: "#77D5F7",
  green: "#A4EB89",
  yellow: "#FFF176",
  lavender: "#C89AFF",
  peach: "#FFA07A",
  sky: "#88E6FF",
  butter: "#FFE066",
  lilac: "#D7BDE2",
  pistachio: "#AAF0D1",
  candyBlue: "#87D9FC",
  blush: "#F98BA5",
  coral: "#FF8C7A",
  ice: "#AEE8FF",
  apricot: "#FFD19C",
} as const;
export type Color = keyof typeof colors;
