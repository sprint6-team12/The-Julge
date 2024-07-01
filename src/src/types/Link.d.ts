interface Link {
  description: string;
  href: string;
  method: string;
  rel: string;
  body?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  query?: Record<string, unknown>;
}
