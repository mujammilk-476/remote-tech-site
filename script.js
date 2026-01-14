const firmwareList = [
  {
    brand: "OnePlus",
    model: "OnePlus 11",
    version: "Android 14",
    link: "https://drive.google.com/"
  },
  {
    brand: "Xiaomi",
    model: "Redmi Note 12 Pro",
    version: "MIUI 14",
    link: "https://mega.nz/"
  },
  {
    brand: "Redmagic",
    model: "Redmagic 8 Pro",
    version: "Android 13",
    link: "https://www.mediafire.com/"
  }
];

function searchFirmware() {
  const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL";
const SUPABASE_KEY = "PASTE_YOUR_ANON_KEY";

async function searchFirmware() {
  const model = document.getElementById("searchInput").value.toLowerCase();
  const brand = document.getElementById("brandSelect").value;
  const results = document.getElementById("results");

  if (!brand && !model) {
    results.innerHTML = "<p>Please select brand or enter model</p>";
    return;
  }

  results.innerHTML = "Searching...";

  let query = `${SUPABASE_URL}/rest/v1/firmwares?select=*`;

  if (brand) query += `&brand=eq.${brand}`;
  if (model) query += `&model=ilike.*${model}*`;

  const response = await fetch(query, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const data = await response.json();
  results.innerHTML = "";

  if (data.length === 0) {
    results.innerHTML = "<p>No firmware found</p>";
    return;
  }

  data.forEach(f => {
    results.innerHTML += `
      <div style="margin-bottom:10px">
        <strong>${f.brand} ${f.model}</strong><br>
        ${f.android || ""} ${f.version || ""}<br>
        <a href="${f.download}" target="_blank">Download</a>
      </div>
    `;
  });
}
