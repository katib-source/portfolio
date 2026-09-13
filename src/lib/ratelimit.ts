import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

const PER_IP = { attempts: 5, windowMs: 15 * 60 * 1000 };

let limiters: { perIp: Ratelimit; global: Ratelimit } | undefined;
const memory = new Map<string, number[]>();

/** Returns false when this login attempt should be refused. Fails closed if Redis errors. */
export async function allowLoginAttempt(ip: string): Promise<boolean> {
  const redis = getRedis();

  if (!redis) {
    // Local development without Redis: a per-instance sliding window.
    const now = Date.now();
    const recent = (memory.get(ip) ?? []).filter((t) => now - t < PER_IP.windowMs);
    recent.push(now);
    memory.set(ip, recent);
    return recent.length <= PER_IP.attempts;
  }

  limiters ??= {
    perIp: new Ratelimit({
      redis,
      prefix: "katib:rl:login:ip",
      limiter: Ratelimit.slidingWindow(PER_IP.attempts, "15 m"),
    }),
    // Caps distributed guessing from rotating IPs.
    global: new Ratelimit({ redis, prefix: "katib:rl:login:all", limiter: Ratelimit.slidingWindow(60, "1 h") }),
  };

  try {
    const [ipResult, globalResult] = await Promise.all([limiters.perIp.limit(ip), limiters.global.limit("all")]);
    return ipResult.success && globalResult.success;
  } catch (err) {
    console.error("rate limiter unavailable", err);
    return false;
  }
}
