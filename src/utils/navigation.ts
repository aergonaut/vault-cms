import { siteConfig } from '@/config';

/**
 * Check if a specific optional content type is enabled
 */
export function isOptionalContentTypeEnabled(type: 'projects' | 'docs' | 'talks'): boolean {
  return siteConfig.optionalContentTypes[type];
}
