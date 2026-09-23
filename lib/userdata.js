// Per-user data store: orders, addresses, and wishlist.
// File-backed JSON, keyed by user id. No external dependencies.
import crypto from "crypto";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "userdata.json");

export const TRACK_STEPS = [
  "Order placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "{}");
}

function readAll() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}");
  } catch {
    return {};
  }
}

function writeAll(data) {
  ensureStore();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function getBucket(all, userId) {
  if (!all[userId]) all[userId] = { orders: [], addresses: [], wishlist: [] };
  return all[userId];
}

/* ---------------- Tracking ---------------- */
// Derive the current tracking stage from how long ago the order was placed,
// so the tracking page visibly progresses over time (demo-friendly cadence).
export function trackStage(placedAtISO) {
  const mins = (Date.now() - new Date(placedAtISO).getTime()) / 60000;
  if (mins < 1) return 0;
  if (mins < 10) return 1;
  if (mins < 30) return 2;
  if (mins < 120) return 3;
  return 4;
}

function withStatus(order) {
  const stage = trackStage(order.placedAt);
  return {
    ...order,
    stage,
    status: TRACK_STEPS[stage],
    delivered: stage >= TRACK_STEPS.length - 1,
  };
}

/* ---------------- Orders ---------------- */
export function listOrders(userId) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  return bucket.orders.map(withStatus).sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1));
}

export function getOrder(userId, orderId) {
  const all = readAll();
  const order = getBucket(all, userId).orders.find((o) => o.id === orderId);
  return order ? withStatus(order) : null;
}

export function createOrder(userId, { items, subtotal, tax, shipping, total, address }) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  const order = {
    id: "SS" + crypto.randomBytes(4).toString("hex").toUpperCase(),
    items,
    subtotal,
    tax,
    shipping,
    total,
    address: address || null,
    placedAt: new Date().toISOString(),
  };
  bucket.orders.push(order);
  writeAll(all);
  return withStatus(order);
}

/* ---------------- Addresses ---------------- */
export function listAddresses(userId) {
  return getBucket(readAll(), userId).addresses;
}

export function addAddress(userId, address) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  const entry = {
    id: crypto.randomUUID(),
    ...address,
    isDefault: bucket.addresses.length === 0,
  };
  bucket.addresses.push(entry);
  writeAll(all);
  return entry;
}

export function deleteAddress(userId, addressId) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  const wasDefault = bucket.addresses.find((a) => a.id === addressId)?.isDefault;
  bucket.addresses = bucket.addresses.filter((a) => a.id !== addressId);
  if (wasDefault && bucket.addresses[0]) bucket.addresses[0].isDefault = true;
  writeAll(all);
  return bucket.addresses;
}

export function setDefaultAddress(userId, addressId) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  bucket.addresses = bucket.addresses.map((a) => ({
    ...a,
    isDefault: a.id === addressId,
  }));
  writeAll(all);
  return bucket.addresses;
}

/* ---------------- Wishlist ---------------- */
export function getWishlist(userId) {
  return getBucket(readAll(), userId).wishlist;
}

export function toggleWishlist(userId, productId) {
  const all = readAll();
  const bucket = getBucket(all, userId);
  if (bucket.wishlist.includes(productId)) {
    bucket.wishlist = bucket.wishlist.filter((id) => id !== productId);
  } else {
    bucket.wishlist.push(productId);
  }
  writeAll(all);
  return bucket.wishlist;
}
