import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://smaqtavwinzxfvjfrtpo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtYXF0YXZ3aW56eGZ2amZydHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1MjkyMjMsImV4cCI6MTk4NzEwNTIyM30.IE3WW07CCAaZ-Lv7b8ZjArC9B6-gWTjMn9AaLW_nXro";
export const supabase = createClient(supabaseUrl, supabaseKey);
