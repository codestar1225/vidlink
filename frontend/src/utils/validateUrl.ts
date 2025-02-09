export const validateUrl = (url: string) => {
  const validVideoHosts = [
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "tiktok.com",
    "dailymotion.com",
    "facebook.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "twitch.tv",
    "reddit.com",
  ];

  try {
    const parsedUrl = new URL(url);
    // return validVideoHosts.some((host) => parsedUrl.hostname.includes(host));
    return validVideoHosts.some((host) => parsedUrl.hostname.endsWith(host));
  } catch (e) {
    return false; // Invalid URL
  }
};
