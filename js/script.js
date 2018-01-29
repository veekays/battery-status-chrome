
(function() {

  
  const loadData = () => {
    navigator.getBattery().then(battery => {
      battery.addEventListener('chargingchange', batteryUpdate);
      battery.addEventListener('levelchange', batteryUpdate);
      render(battery);
    });
    
  }
  
  const batteryUpdate = (e) => {
    e.preventDefault();
    render(e.target);
  }
  
  const render = (data) => {
    
    let level = parseInt(data.level * 100);

    let status;
    
    switch (true) {
      case data.charging:
      status = 'good charging';
      break;
      case level > 80:
      status = 'good';
      break;
      case level < 15:
      status = 'critical';
      break;
      default:
      status = 'normal';
    }
    
    let tmpl = `<div class="battery ${status}">
    <div class="indicator"><div class="other"></div></div>
    <div class="level" style="width:${level}%"></div>
    <div class="label"><h2>${level}%<h2></div></div>`
    
    document.getElementById('batteryContainer').innerHTML = tmpl;
  }  
  
  loadData()
  
})()