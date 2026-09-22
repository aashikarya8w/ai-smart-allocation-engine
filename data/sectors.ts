export const sectors = [
  "Information Technology",
  "Software Development",
  "Data Science & Analytics",
  "Artificial Intelligence & ML",
  "Cybersecurity",
  "Cloud Computing",
  "Finance & Fintech",
  "E-Commerce & Retail",
  "Healthcare & MedTech",
  "EdTech",
  "Manufacturing",
  "Consulting",
  "Marketing & Growth",
  "Logistics & Supply Chain",
  "Government & Public Sector",
  "Media & Entertainment",
  "Agriculture & AgriTech",
  "Energy & CleanTech",
  "Real Estate & PropTech",
  "Legal & Compliance",
] as const;

export type Sector = (typeof sectors)[number];
