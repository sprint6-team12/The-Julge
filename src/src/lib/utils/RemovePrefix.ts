export default function removePrefix(url: string): string {
  const prefix = '/api/6-12/the-julge';
  if (url.startsWith(prefix)) {
    return url.slice(prefix.length);
  }
  return url;
}
