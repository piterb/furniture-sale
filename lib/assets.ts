const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(assetPath: string): string {
  if (!assetPath.startsWith("/")) {
    return assetPath;
  }

  if (!BASE_PATH) {
    return assetPath;
  }

  return `${BASE_PATH}${assetPath}`;
}
