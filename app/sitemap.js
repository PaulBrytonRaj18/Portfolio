export default function sitemap() {
  const baseUrl = 'https://paulbrytonraj.com'; // Update to actual domain when available
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
