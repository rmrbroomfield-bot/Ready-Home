
async function getConfig(){
  try{
    const res = await fetch('config.json',{cache:'no-store'});
    return await res.json();
  }catch(e){
    return {access_code:'RH-2468'};
  }
}
const msg = document.getElementById('msg');
const codeEl = document.getElementById('code');
document.getElementById('go').onclick = async () => {
  const cfg = await getConfig();
  const ok = (codeEl.value||'').trim() === (cfg.access_code||'');
  if(ok){
    sessionStorage.setItem('readyhome_ok','1');
    location.href = 'index.html';
  }else{
    msg.textContent = 'Incorrect code';
  }
};
document.getElementById('hint').onclick = async () => {
  const cfg = await getConfig();
  alert('Hint: starts with ' + (cfg.access_code||'??').slice(0,2));
};
