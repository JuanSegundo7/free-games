export const platformImage = (platform: string) => {
  const platformKey = platform.toLowerCase();

  if (platformKey.toLowerCase().includes("windows")) {
    return `/svgs/windows.svg`;
  }
  return `/svgs/pc.svg`;
};
