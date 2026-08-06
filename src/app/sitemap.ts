import type { MetadataRoute } from "next";

const BASE_URL = "https://kundeservicenorge.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const sider = ["", "/registrer", "/logg-inn", "/personvern", "/vilkar", "/databehandleravtale"];

  return sider.map((sti) => ({
    url: `${BASE_URL}${sti}`,
    lastModified: new Date(),
  }));
}
