import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Check if Upstash credentials are configured
const isConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Create a new ratelimiter that allows 10 requests per 60 seconds (1 minute)
// This helps prevent abuse and DoS attacks
// If Upstash is not configured, rate limiting will be disabled (development mode)
export const ratelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  : null;

// Helper to check if rate limiting is enabled
export const isRateLimitEnabled = () => ratelimit !== null;
