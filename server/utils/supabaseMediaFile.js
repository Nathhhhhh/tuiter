import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const uploadToSupabase = async (image, filename) => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${filename}`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      reject(error);
    }
    resolve(data);
  });
};

export const getPublicUrl = (url) => {
  return new Promise(async (resolve) => {
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(url);

    resolve(data);
  });
};
