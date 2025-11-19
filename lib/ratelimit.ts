import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Lazy initialization to avoid build-time errors
let ratelimitInstance: Ratelimit | null = null;
let initialized = false;

// Initialize rate limiter on first use
function getRateLimiter(): Ratelimit | null {
  if (initialized) {
    return ratelimitInstance;
  }

  initialized = true;

  // Check if Upstash credentials are configured
  const isConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!isConfigured) {
    console.warn('Rate limiting disabled: Upstash Redis credentials not configured');
    return null;
  }

  try {
    // Create a new ratelimiter that allows 10 requests per 60 seconds (1 minute)
    // This helps prevent abuse and DoS attacks
    ratelimitInstance = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '60 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    });
    return ratelimitInstance;
  } catch (error) {
    console.error('Failed to initialize rate limiter:', error);
    return null;
  }
}

// Export getter function instead of direct instance
export const ratelimit = {
  limit: async (identifier: string) => {
    const limiter = getRateLimiter();
    if (!limiter) {
      // If rate limiting is not configured, allow all requests
      return {
        success: true,
        limit: 0,
        remaining: 0,
        reset: 0,
      };
    }
    return limiter.limit(identifier);
  },
};

// Helper to check if rate limiting is enabled
export const isRateLimitEnabled = () => {
  const limiter = getRateLimiter();
  return limiter !== null;
};
