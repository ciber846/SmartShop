// Supabase public browser configuration.
// IMPORTANT: use the project's ANON/PUBLISHABLE key only.
// NEVER put the Supabase service_role/secret key in this file.
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";https://rgllelkhxyapnaodowev.supabase.co
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY";sb_publishable_JMX643QvRYfFXmbi1HKzig_5mj3ciVh

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
