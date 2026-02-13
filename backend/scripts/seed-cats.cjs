const path = require("path");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// @todo: add faker
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

const cats = [
  { name: "Whiskers", age: 2, breed: "Siamese" },
  {
    name: "Max",
    age: 3,
    breed: "Labrador - i would argue, if that's a cat breed",
  },
  { name: "Bella", age: 4, breed: "Persian" },
  { name: "Milo", age: 4, breed: "Ragdoll" },
  { name: "Nala", age: 3, breed: "Bengal" },
];

async function seed() {
  const { error: deleteError } = await supabase
    .from("cats")
    .delete()
    .neq("id", 0);
  if (deleteError) {
    console.error("Delete failed:", deleteError.message);
    process.exit(1);
  }
  const { data, error } = await supabase.from("cats").insert(cats).select();
  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }
  console.log("Seeded", data?.length ?? 0, "cats.");
}

seed();
