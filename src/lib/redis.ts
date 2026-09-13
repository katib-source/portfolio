import "server-only";
import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/**
 * Upstash via the Vercel Marketplace sets KV_REST_API_URL / KV_REST_API_TOKEN;
 * a manually created Upstash database uses UPSTASH_REDIS_REST_URL / _TOKEN.
 */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}
