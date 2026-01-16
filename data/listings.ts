const { data, error } = await supabase
  .from("rooms")
  .select("*");

console.log(data, error);
