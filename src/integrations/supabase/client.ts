// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cxdfdbsyudbascflgcql.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZGZkYnN5dWRiYXNjZmxnY3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMDkwNjIsImV4cCI6MjA1NDc4NTA2Mn0.M4rSBcdugDXJny9bBSahiYH7LXXS00XllqknvtDs1Ho";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);