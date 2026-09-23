// Minimal server-side auth: file-backed user store + hashed passwords
// + HMAC-signed session cookies. No external dependencies.
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SECRET = process.env.AUTH_SECRET || "shoestopper-dev-secret-change-me";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days (seconds)

export const SESSION_COOKIE = "ss_session";
export const SESSION_MAX_AGE = SESSION_TTL;

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
}

function readUsers() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8") || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users) {
  ensureStore();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = (stored || "").split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(test, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function findUserByEmail(email) {
  return readUsers().find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
}

export function findUserById(id) {
  return readUsers().find((u) => u.id === id);
}

export function createUser({ name, email, password }) {
  const users = readUsers();
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function updateUser(id, patch) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  writeUsers(users);
  return users[idx];
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionToken(userId) {
  const issued = Math.floor(Date.now() / 1000);
  const payload = `${userId}.${issued}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, issued, sig] = parts;
  if (sign(`${userId}.${issued}`) !== sig) return null;
  if (Math.floor(Date.now() / 1000) - Number(issued) > SESSION_TTL) return null;
  return userId;
}

// Returns the signed-in user's id from the request cookies, or null.
export function currentUserId() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
