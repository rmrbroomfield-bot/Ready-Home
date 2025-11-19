
const KEY='readyhome-plan-v1';
const $ = id => document.getElementById(id);

function getData(){
  const hazSel = Array.from($('haz').selectedOptions).map(o=>o.value);
  return {
    addr: $('addr').value,
    members: $('members').value,
    hazards: hazSel,
    sip: {
      windows: $('sip_windows').checked,
      hvac: $('sip_hvac').checked,
      seal: $('sip_seal').checked,
      water: $('sip_water').checked,
      food: $('sip_food').checked,
      light: $('sip_light').checked,
      power: $('sip_power').checked,
      meds: $('sip_meds').checked,
      pets: $('sip_pets').checked,
      masks: $('sip_masks').checked,
      notes: $('sip_notes').value
    },
    contacts: {
      outside: $('c_outside').value,
      local: $('c_local').value,
      utility: $('c_utility').value,
      doctor: $('c_doctor').value,
      vet: $('c_vet').value,
      neighbor: $('c_neighbor').value
    },
    inventory: {notes: $('inv_notes').value},
    maps: {notes: $('map_notes').value},
    _ts: Date.now()
  };
}

function setData(d){
  if(!d) return;
  $('addr').value = d.addr || '';
  $('members').value = d.members || '';
  Array.from($('haz').options).forEach(o => {
    o.selected = (d.hazards||[]).includes(o.value);
  });
  const sip = d.sip || {};
  $('sip_windows').checked = !!sip.windows;
  $('sip_hvac').checked = !!sip.hvac;
  $('sip_seal').checked = !!sip.seal;
  $('sip_water').checked = !!sip.water;
  $('sip_food').checked = !!sip.food;
  $('sip_light').checked = !!sip.light;
  $('sip_power').checked = !!sip.power;
  $('sip_meds').checked = !!sip.meds;
  $('sip_pets').checked = !!sip.pets;
  $('sip_masks').checked = !!sip.masks;
  $('sip_notes').value = sip.notes || '';

  const c = d.contacts || {};
  $('c_outside').value = c.outside || '';
  $('c_local').value = c.local || '';
  $('c_utility').value = c.utility || '';
  $('c_doctor').value = c.doctor || '';
  $('c_vet').value = c.vet || '';
  $('c_neighbor').value = c.neighbor || '';

  const inv = d.inventory || {};
  $('inv_notes').value = inv.notes || '';

  const maps = d.maps || {};
  $('map_notes').value = maps.notes || '';
}

function save(){
  localStorage.setItem(KEY, JSON.stringify(getData()));
  const s = $('status'); s.textContent='Saved ✓';
  setTimeout(()=>s.textContent='',2000);
}

function load(){
  const raw = localStorage.getItem(KEY);
  const s = $('status');
  if(!raw){ s.textContent='Nothing saved yet'; setTimeout(()=>s.textContent='',2000); return; }
  setData(JSON.parse(raw));
  s.textContent='Loaded ✓'; setTimeout(()=>s.textContent='',2000);
}

function pdf(){
  const d = getData();
  const hazards = (d.hazards||[]).join(', ');
  const sipList = [
    ['Close/lock windows & doors', d.sip.windows],
    ['Turn off HVAC / coolers', d.sip.hvac],
    ['Seal gaps', d.sip.seal],
    ['72+ hrs water', d.sip.water],
    ['72+ hrs food', d.sip.food],
    ['Lights & batteries', d.sip.light],
    ['Backup power / banks', d.sip.power],
    ['Meds 3–7 days', d.sip.meds],
    ['Pet supplies', d.sip.pets],
    ['Masks / N95', d.sip.masks]
  ];
  const sipHtml = sipList.map(([label, ok])=>`<li>[${ok?'X':'&nbsp;'}] ${label}</li>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>ReadyHome Plan</title><link rel="stylesheet" href="app.css"></head>
  <body><div class="wrap"><h1>ReadyHome Plan</h1>
  <div class="card"><div class="kv">
    <div><b>Address</b></div><div>${d.addr||''}</div>
    <div><b>Household Members</b></div><div><pre style="white-space:pre-wrap;margin:0">${d.members||''}</pre></div>
    <div><b>Hazards</b></div><div>${hazards}</div>
  </div></div>
  <div class="card">
    <div class="section-title">Shelter-in-Place Checklist</div>
    <ul class="checklist">${sipHtml}</ul>
    <div class="section-title">Shelter-in-Place Notes</div>
    <pre style="white-space:pre-wrap;margin:0">${d.sip.notes||''}</pre>
  </div>
  <div class="card">
    <div class="section-title">Emergency Contacts</div>
    <div class="kv">
      <div><b>Out-of-Area</b></div><div>${d.contacts.outside||''}</div>
      <div><b>Local</b></div><div>${d.contacts.local||''}</div>
      <div><b>Utility</b></div><div>${d.contacts.utility||''}</div>
      <div><b>Doctor</b></div><div>${d.contacts.doctor||''}</div>
      <div><b>Veterinarian</b></div><div>${d.contacts.vet||''}</div>
      <div><b>Neighbor</b></div><div>${d.contacts.neighbor||''}</div>
    </div>
  </div>
  <div class="card">
    <div class="section-title">Household Inventory (Quick)</div>
    <pre style="white-space:pre-wrap;margin:0">${d.inventory.notes||''}</pre>
  </div>
  <div class="card">
    <div class="section-title">My Maps & Routes</div>
    <pre style="white-space:pre-wrap;margin:0">${d.maps.notes||''}</pre>
  </div>
  <p class="muted">Generated ${new Date().toLocaleString()}</p>
  </div></body></html>`;
  const w = window.open('', '_blank');
  w.document.open();
  w.document.write(html);
  w.document.close();
  setTimeout(()=>w.print(),300);
}

document.getElementById('save').onclick = save;
document.getElementById('load').onclick = load;
document.getElementById('pdf').onclick = pdf;
