import React, { useState } from "react";
import { transformCodesClient, getStatistics } from "./transformCodesClient";
import TreeView from "@/components/tree-view/TreeView";

export default function TransformCodes() {
  const [result, setResult] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const runTransform = async () => {
    // Load JSON files from public folder (or any API)
    const [forJson, seoJson, sdgJson] = await Promise.all([
      fetch("/ANZSRC FOR.json").then(res => res.json()),
      fetch("/ANZSRC SEO.json").then(res => res.json()),
      fetch("/SDGs.json").then(res => res.json()),
    ]);

    // Transform in browser (client-side)
    const transformed = transformCodesClient(forJson, seoJson, sdgJson);

    setResult(transformed);
    setStats(getStatistics(transformed));
  };

  return (
    <div>
      <button onClick={runTransform}>
        Transform ANZSRC + SDG Codes
      </button>

      {result && (
        <>
         {/*  <h3>Transformed Output</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>

          <h3>Statistics</h3>
          <pre>{JSON.stringify(stats, null, 2)}</pre> */}
          <TreeView treeData={result["ANZSRC FOR"]} />
        </>
      )}
    </div>
  );
}
