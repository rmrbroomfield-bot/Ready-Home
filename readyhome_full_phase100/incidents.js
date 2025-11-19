
let lastTs = null;
const listEl = document.getElementById('list');
const agoEl = document.getElementById('ago');

function render(items){
  listEl.innerHTML = '';
  if(!items || !items.length){
    listEl.innerHTML = '<p class="muted">No incidents found.</p>';
    return;
  }
  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<b>${it.name||'Incident'}</b><br>
      <small>${it.type||''} • ${it.agency||''}</small><br>
      Size: ${it.acres ?? '—'} ac • Containment: ${it.containment ?? '—'}%<br>
      Updated: ${it.updated || ''}`;
    listEl.appendChild(div);
  });
  lastTs = Date.now();
  updateAgo();
}

function updateAgo(){
  if(!lastTs) return;
  const mins = Math.round((Date.now()-lastTs)/60000);
  agoEl.textContent = `Last refreshed ${mins} min ago`;
}
setInterval(updateAgo, 30000);

async function loadDemo(){
  try{
    const res = await fetch('samples/incidents-sample.json');
    const data = await res.json();
    render(data);
  }catch(e){
    render([]);
  }
}

document.getElementById('loadDemo').onclick = loadDemo;
