import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function getFileChecksum(filePath: string, algorithm = "md5"): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    stream.on("error", (err) => reject(err));

    stream.on("data", (chunk) => hash.update(chunk));

    stream.on("end", () => resolve(hash.digest("hex")));
  });
}
type RaidFile = {
  name: string;
  size: number;
  checksum: string;
};

export async function GET() {
  // Path to your existing JSON file in the src directory
  const jsonPath = path.resolve("./src/raw-data/");
  // list all files in the directory
  const files: Partial<RaidFile>[] = fs.readdirSync(jsonPath).map((file) => ({
    name: file,
  }));
  // filter out files that are of name raids_*.json
  const raidFiles =
    files.filter(
      (file) =>
        file?.name?.startsWith("raids_") && file?.name?.endsWith(".json")
    ) || [];
  // add checksum and file size to the response
  for (const file of raidFiles) {
    const checksum = await getFileChecksum(
      path.join(jsonPath, file.name || "")
    );
    const stats = fs.statSync(path.join(jsonPath, file.name || ""));
    file.size = stats.size;
    file.checksum = checksum;
  }

  return new Response(JSON.stringify(raidFiles), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
