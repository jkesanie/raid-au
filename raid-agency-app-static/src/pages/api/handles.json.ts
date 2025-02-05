import { combinedHandles } from "../../services/combined";

export async function GET() {
  const handles = await combinedHandles();
  return new Response(JSON.stringify([...handles]), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
