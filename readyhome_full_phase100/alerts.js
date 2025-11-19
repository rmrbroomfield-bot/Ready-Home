
const KEY='readyhome-alerts-v1';
const $ = id => document.getElementById(id);

function save(){
  const data = {
    addr: $('addr').value,
    push: $('push').checked,
    email: $('email').checked,
    emailAddr: $('emailAddr').value,
    _ts: Date.now()
  };
  localStorage.setItem(KEY, JSON.stringify(data));
  alert('Saved on this device.');
}

function load(){
  const raw = localStorage.getItem(KEY);
  if(!raw) return;
  const d = JSON.parse(raw);
  $('addr').value = d.addr || '';
  $('push').checked = !!d.push;
  $('email').checked = !!d.email;
  $('emailAddr').value = d.emailAddr || '';
}

function zoneSimClear(){
  const addr = $('addr').value || '(no address entered)';
  $('zoneOut').innerHTML = `<b>Address:</b> ${addr}<br>
    <b>Zone:</b> DEMO-123<br>
    <b>Status:</b> <span style="color:green;font-weight:bold">Clear</span><br>
    <span class="muted">This is simulated. A live version would show official data.</span>`;
}

function zoneSimOrder(){
  $('zoneOut').innerHTML = `<b>Zone:</b> MNO-EVAC-001<br>
    <b>Status:</b> <span style="color:red;font-weight:bold">Evacuation Order</span><br>
    <span class="muted">Demo-only zone used for practice. Not live data.</span>`;
}

document.getElementById('save').onclick = save;
document.getElementById('zoneCheck').onclick = zoneSimClear;
document.getElementById('zoneDemo').onclick = zoneSimOrder;

load();
