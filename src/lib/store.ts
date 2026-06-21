import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import type { Invoice } from "./invoice";

const INV_KEY = "invoxa.invoices";
const SETTINGS_KEY = "invoxa.settings";
const LEGACY_INV_KEY = "invoiceflow.invoices";
const LEGACY_SETTINGS_KEY = "invoiceflow.settings";

export interface Settings {
  business: {
    name: string;
    gstin: string;
    address: string;
    phone: string;
    email: string;
    stateCode: string;
    logo?: string;
    signature?: string;
  };
  defaults: {
    gst: number;
    currency: string;
    prefix: string;
    template: "modern" | "minimal" | "corporate" | "gradient" | "classic";
    terms: string;
    upiId: string;
    upiName: string;
  };
}

export const defaultSettings: Settings = {
  business: { name: "", gstin: "", address: "", phone: "", email: "", stateCode: "" },
  defaults: {
    gst: 18,
    currency: "INR",
    prefix: "INV-",
    template: "modern",
    terms: "Payment due within 14 days. Late payments subject to 1.5% monthly interest.",
    upiId: "",
    upiName: "",
  },
};

// SSR-safe localStorage with subscriptions
type Listener = () => void;
const listeners = new Map<string, Set<Listener>>();
function emit(key: string) { listeners.get(key)?.forEach((l) => l()); }
function subscribe(key: string, l: Listener) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(l);
  return () => listeners.get(key)!.delete(l);
}

const parseCache = new Map<string, any>();
function read<T>(key: string, fallback: T, legacyKey?: string): T {
  if (typeof window === "undefined") return fallback;
  try {
    let raw = window.localStorage.getItem(key);
    if (!raw && legacyKey) {
      raw = window.localStorage.getItem(legacyKey);
      if (raw) {
        window.localStorage.setItem(key, raw);
        window.localStorage.removeItem(legacyKey);
      }
    }
    if (!raw) return fallback;
    if (parseCache.has(raw)) return parseCache.get(raw);
    const parsed = JSON.parse(raw) as T;
    parseCache.set(raw, parsed);
    return parsed;
  } catch { return fallback; }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  emit(key);
}

export function useLocalState<T>(key: string, fallback: T): [T, (v: T | ((p: T) => T)) => void] {
  const sub = useCallback((l: Listener) => subscribe(key, l), [key]);
  const get = useCallback(() => read<T>(key, fallback, key === INV_KEY ? LEGACY_INV_KEY : key === SETTINGS_KEY ? LEGACY_SETTINGS_KEY : undefined), [key, fallback]);
  const value = useSyncExternalStore(sub, get, () => fallback);
  const set = useCallback((v: T | ((p: T) => T)) => {
    const next = typeof v === "function" ? (v as (p: T) => T)(read(key, fallback)) : v;
    write(key, next);
  }, [key, fallback]);
  return [value, set];
}

export function useInvoices() {
  return useLocalState<Invoice[]>(INV_KEY, []);
}
export function useSettings() {
  return useLocalState<Settings>(SETTINGS_KEY, defaultSettings);
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
