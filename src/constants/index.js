import { createCampaign, dashboard, profile } from "../assets";
import abi from "./abi.json";
import contractAddresses from "./contractAddress.json";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
];

export const options = [
  {
    label: "Arts and culture",
    value:
      "This category includes projects that support the arts, such as films, music, and theater.",
  },
  {
    label: "Causes",
    value:
      "This category includes projects that support a cause, such as education, healthcare, and the environment.",
  },
  {
    label: "Community",
    value:
      "This category includes projects that benefit a community, such as parks, libraries, and schools.",
  },
  {
    label: "Education",
    value:
      "This category includes projects that support education, such as scholarships, school supplies, and tutoring.",
  },
  {
    label: "Food and drink",
    value:
      "This category includes projects that support food and drink businesses, such as restaurants, food trucks, and breweries.",
  },
  {
    label: "Health",
    value:
      "This category includes projects that support health and wellness, such as medical research, fitness programs, and mental health initiatives.",
  },
  {
    label: "Housing",
    value:
      "This category includes projects that support housing, such as affordable housing, homeless shelters, and disaster relief.",
  },
  {
    label: "Pets",
    value:
      "This category includes projects that support pets, such as animal shelters, rescue organizations, and veterinary care.",
  },
  {
    label: "Product",
    value:
      "This category includes projects that support the creation of new products, such as consumer goods, technology, and fashion.",
  },
  {
    label: "Services",
    value:
      "This category includes projects that support the provision of services, such as childcare, transportation, and legal aid.",
  },
  {
    label: "Technology",
    value:
      "This category includes projects that support the development of new technology, such as software, hardware, and medical devices.",
  },
  {
    label: "Travel",
    value:
      "This category includes projects that support travel, such as adventure trips, cultural experiences, and educational tours.",
  },
  {
    label: "Other",
    value:
      "This category includes projects that do not fit into any of the other categories.",
  },
];
export const specialChars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "[",
  "{",
  "]",
  "}",
  ":",
  ";",
  "<",
  ">",
];

export { contractAddresses, abi };
