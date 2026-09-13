export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.katib.me").replace(/\/+$/, "");

export const CONTACT = {
  email: "kachikatib@gmail.com",
  github: "https://github.com/katib-source",
  linkedin: "https://linkedin.com/in/katib-kachi",
  cv: "/resume.pdf",
} as const;
