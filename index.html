// api/index.js — Upstash Redis storage

export const config = { runtime: 'edge' };

const UPSTASH_URL = 'https://neutral-foxhound-86030.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAVAOAAIncDJhMTE4Yzg1NTE1MmE0OTE5OGFkZWFkZmUyYWE4NWE1NHAyODYwMzA';

async function kvGet(key) {
  const r = await fetch(`${UPSTASH_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
  });
  const data = await r.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function kvSet(key, value) {
  const r = await fetch(`${UPSTASH_URL}/set/${key}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(value))
  });
  return r.ok;
}

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-user-id',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: cors });

  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');
  const userId = req.headers.get('x-user-id') || 'default';
  const key = `saan:${userId}`;

  try {
    if (path === '/data' && req.method === 'GET') {
      const data = await kvGet(key) || { workouts: {}, comps: [] };
      return new Response(JSON.stringify(data), { status: 200, headers: cors });
    }

    if (path === '/data' && req.method === 'POST') {
      const body = await req.json();
      const existing = await kvGet(key) || {};
      const merged = {
        workouts: { ...(existing.workouts || {}), ...(body.workouts || {}) },
        comps: body.comps || existing.comps || []
      };
      await kvSet(key, merged);
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
