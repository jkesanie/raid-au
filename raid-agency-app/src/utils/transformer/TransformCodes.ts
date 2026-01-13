import { transformCodesClient } from "./transformCodesClient";

export const TransformCodes = async () => {
  let transformed: any = null;
    // Load JSON files from public folder (or any API)
    const [forJson, seoJson] = await Promise.all([
      fetch("/ANZSRC FOR.json").then(res => res.json()),
      fetch("/ANZSRC SEO.json").then(res => res.json()),
      //fetch("/SDGs.json").then(res => res.json()),
    ]);

    // Transform in browser (client-side)
    transformed = transformCodesClient(forJson, seoJson);

  return transformed; 
}
