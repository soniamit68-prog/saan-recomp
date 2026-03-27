// api/index.js
// Vercel serverless function with KV storage

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-user-id',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: cors });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');
  const userId = req.headers.get('x-user-id') || 'default';

  try {
    const { kv } = await import('@vercel/kv');

    if (path === '/data' && req.method === 'GET') {
      const data = await kv.get(`u:${userId}`) || { workouts: {}, comps: [] };
      return new Response(JSON.stringify(data), { status: 200, headers: cors });
    }

    if (path === '/data' && req.method === 'POST') {
      const body = await req.json();
      const existing = await kv.get(`u:${userId}`) || {};
      const merged = {
        workouts: { ...(existing.workouts || {}), ...(body.workouts || {}) },
        comps: body.comps || existing.comps || []
      };
      await kv.set(`u:${userId}`, merged, { ex: 60 * 60 * 24 * 365 });
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: cors });

  } catch (e) {
    if (path === '/data' && req.method === 'GET') {
      return new Response(JSON.stringify({ workouts: {}, comps: [] }), { status: 200, headers: cors });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
  }
}
