import { ingredients } from "./ingredients.js";

// --- utilidades ---
const toBase = (amt, unit) => {
  unit = unit.toLowerCase();
  if (unit === 'kg') return amt * 1000;
  if (unit === 'g') return amt;
  if (unit === 'l') return amt * 1000;
  if (unit === 'ml') return amt;
  return amt;
}
const fromBase = (amt, kind) => {
  if (kind === 'solid') {
    if (Math.abs(amt) >= 1000) return {value: (amt/1000).toFixed(3).replace(/\.0+$/,'') , unit:'kg'};
    return {value: (amt).toFixed(0), unit:'g'};
  } else {
    if (Math.abs(amt) >= 1000) return {value: (amt/1000).toFixed(3).replace(/\.0+$/,'') , unit:'l'};
    return {value: (amt).toFixed(0), unit:'ml'};
  }
}

const isLiquidName = name => {
  const liquids = ['leche','agua','aceite','huevo','yema','clara','crema'];
  name = name.toLowerCase();
  return liquids.some(w => name.includes(w));
}

const defaultRecipes = [
    {
        id: 'batido-pan',
        name: 'Batido de pan',
        ingredients: [
            { ...ingredients.harina, amount: 3 },
            { ...ingredients.azucar, amount: 2.7 },
            { ...ingredients.polvoHornear, amount: 70 },
            { ...ingredients.leche, amount: 1 },
        ]
    },
    {
        id: 'pan-chocolate',
        name: 'Pan de chocolate',
        ingredients: [
            { ...ingredients.harina, amount: 3.1 },
            { ...ingredients.azucar, amount: 2.7 },
            { ...ingredients.bicarbonato, amount: 70 },
            { ...ingredients.chocolateCrt, amount: 1.65 },
            { ...ingredients.cafe, amount: 70 },
            { ...ingredients.leche, amount: 3 },
            { ...ingredients.margarina, amount: 4 },
        ]
    },
    {
        id: 'pan-mantequilla',
        name: 'Pan de mantequilla',
        ingredients: [
            { ...ingredients.harina, amount: 3.6 },
            { ...ingredients.polvoHornear, amount: 110 },
            { ...ingredients.nuez, amount: 250 },
            { ...ingredients.azucarRef, amount: 2.45 },
            { ...ingredients.mantequilla, amount: 2 },
            { ...ingredients.leche, amount: 3.6 },
        ]
    },
    {
        id: 'Red-velvet',
        name: 'Red velvet',
        ingredients: [
        { ...ingredients.harinaVelvet, amount: 1 },
        { ...ingredients.agua, amount: 0.34 },
        { ...ingredients.aceite, amount: 60 },
        ]
    },
    {
        id: 'Chocoqueso',
        name: 'ChocoQueso',
        ingredients: [
            { ...ingredients.lecherabls, amount: 3 },
            { ...ingredients.clavel, amount: 9 },
            { ...ingredients.quesoTPPHI, amount: 5 },
        ]
    },
    {
        id: 'Flan-aromaCafe',
        name: 'flan de aroma de cafe',
        ingredients: [
        { ...ingredients.leche, amount: 1 },
        { ...ingredients.clavel, amount: 1 },
        { ...ingredients.lecherabls, amount: 1 },
        { ...ingredients.vanilla, amount: 120 },
        ]
    },
    {
    id: 'Cottage',
    name: 'Quesillo de Cottage',
    ingredients: [
    { ...ingredients.quesoCTG, amount: 1 },
    { ...ingredients.lecherabls, amount: 0.75 },
    { ...ingredients.lecherabt, amount: 0.75 }, 
    { ...ingredients.crema, amount: 1 },
    { ...ingredients.vanilla, amount: 65 },
    ]
    },
    {
        id: 'Quesillo',
        name: 'Quesillo',
        ingredients: [
            { ...ingredients.quesoTPPHI, amount: 1 },
            { ...ingredients.azucar, amount: 0.22 },
            { ...ingredients.maizena, amount: 53 },
            { ...ingredients.crema, amount: 0.5 },
        ]
    },
        {
        id: 'Cheasecake',
        name: 'Cheasecake',
        ingredients: [
            { ...ingredients.quesoTPPHI, amount: 1 },
            { ...ingredients.azucar, amount: 0.22 },
            { ...ingredients.maizena, amount: 53 },
            { ...ingredients.crema, amount: 30 },
            { ...ingredients.limones, amount: 30 },
        ]
    },
    {
        id: 'Flan-Napolitano',
        name: 'Flan Napolitano',
        ingredients: [
        { ...ingredients.lecherabls, amount: 0.3 },
        { ...ingredients.lecherabt, amount: 0.1 },
        { ...ingredients.clavel, amount: 0.4 },
        { ...ingredients.crema, amount: 0.25 },
        { ...ingredients.quesoTPPHI, amount: 0.15 },
        { ...ingredients.vanilla, amount: 15 },
        ]
    },
    {
    id: 'Flan-Mouse-Fresa',
    name: 'Flan de mouse de fresa',
    ingredients: [
    { ...ingredients.lecherabt, amount: 1 },
    { ...ingredients.clavel, amount: 1 },
    { ...ingredients.crema, amount: 1 },
    { ...ingredients.quesoTPPHI, amount: 0.37 },
    ]
    },
    {
    id: 'desengrasante',
    name: 'Desengrasante',
    ingredients: [
    { ...ingredients.harina, amount: 0.5 },
    { ...ingredients.aceite, amount: 950 },
    { ...ingredients.mantecaVegetal, amount: 880 },
    ]
    },
    {
    id: 'ChocoFlan',
    name: 'ChocoFlan',
    ingredients: [
    { ...ingredients.harina, amount: 0.5 },
    { ...ingredients.polvoHornear, amount: 30 },
    { ...ingredients.quesoDC, amount: 2 },
    { ...ingredients.clavel, amount: 2 },
    { ...ingredients.lecherabls, amount: 2 },
    { ...ingredients.leche, amount: 3 },
    ]
    },

];

let recipes = defaultRecipes;

// DOM
const recipeSelect = document.getElementById('recipeSelect');
const qtyInput = document.getElementById('qty');
const resultsDiv = document.getElementById('results');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const calcBtn = document.getElementById('calcBtn');
const exportBtn = document.getElementById('exportBtn');
const saveDayBtn = document.getElementById('saveDayBtn');
const weeklyBtn = document.getElementById('weeklyBtn');
const exportWeeklyBtn = document.getElementById('exportWeeklyBtn');

let selectedList = [];

function refreshRecipeSelect(){
  recipeSelect.innerHTML = '';
  recipes.forEach(r => {
    const opt = document.createElement('option'); opt.value = r.id; opt.textContent = r.name; recipeSelect.appendChild(opt);
  });
}

addRecipeBtn.addEventListener('click', ()=>{
  const r = recipes.find(x=>x.id===recipeSelect.value); if(!r) return;
  const qty = Number(qtyInput.value)||1;
  selectedList.push({recipe:r, qty});
  alert(`Añadido: ${r.name} x ${qty}`);
});

function calculateAll(){
  resultsDiv.innerHTML = '';
  if(selectedList.length===0){ resultsDiv.textContent='No se añadieron recetas.'; return; }

  let grandTotals = {};

  selectedList.forEach((sel,idx)=>{
    const {recipe, qty} = sel;
    let totals = {};
    recipe.ingredients.forEach(i=>{
      const key = i.name.toLowerCase();
      const kind = isLiquidName(i.name)?'liquid':'solid';
      const base = toBase(i.amount, i.unit) * qty;
      if(!totals[key]) totals[key] = {name:i.name, amount:0, kind};
      totals[key].amount += base;
      if(!grandTotals[key]) grandTotals[key] = {name:i.name, amount:0, kind};
      grandTotals[key].amount += base;
    });

    const div = document.createElement('div');
    div.innerHTML = `<h3>${recipe.name} x ${qty}</h3>`;
    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>Ingrediente</th><th>Total</th></tr></thead>';
    const tbody = document.createElement('tbody');
    Object.values(totals).forEach(t=>{
      const disp = fromBase(t.amount, t.kind);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.name}</td><td>${disp.value} ${disp.unit}</td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody); div.appendChild(table);
    resultsDiv.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = '<h2>Total general</h2>';
  const table = document.createElement('table');
  table.innerHTML = '<thead><tr><th>Ingrediente</th><th>Total</th></tr></thead>';
  const tbody = document.createElement('tbody');
  Object.values(grandTotals).forEach(t=>{
    const disp = fromBase(t.amount, t.kind);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.name}</td><td>${disp.value} ${disp.unit}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody); totalDiv.appendChild(table);
  resultsDiv.appendChild(totalDiv);
}

calcBtn.addEventListener('click', calculateAll);

// --- localStorage ---
saveDayBtn.addEventListener('click', ()=>{
  if(selectedList.length===0){ alert("No hay resultados para guardar."); return; }

  let grandTotals = {};
  selectedList.forEach(sel=>{
    sel.recipe.ingredients.forEach(i=>{
      const key = i.name.toLowerCase();
      const kind = isLiquidName(i.name)?'liquid':'solid';
      const base = toBase(i.amount, i.unit) * sel.qty;
      if(!grandTotals[key]) grandTotals[key] = {name:i.name, amount:0, kind};
      grandTotals[key].amount += base;
    });
  });

  let consumos = JSON.parse(localStorage.getItem("consumosSemana")) || [];
  consumos.push({
    fecha: new Date().toLocaleDateString(),
    totales: grandTotals
  });

  localStorage.setItem("consumosSemana", JSON.stringify(consumos));
  alert("Consumo diario guardado ✅");
});

// --- Ver resumen semanal ---
weeklyBtn.addEventListener('click', ()=>{
  let consumos = JSON.parse(localStorage.getItem("consumosSemana")) || [];
  if(consumos.length===0){ alert("No hay consumos guardados."); return; }

  let resumen = {};
  consumos.forEach(dia=>{
    for(let key in dia.totales){
      if(!resumen[key]) resumen[key] = {name: dia.totales[key].name, amount:0, kind: dia.totales[key].kind};
      resumen[key].amount += dia.totales[key].amount;
    }
  });

  resultsDiv.innerHTML = "<h2>Consumo semanal</h2>";
  const table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Ingrediente</th><th>Total semanal</th></tr></thead>";
  const tbody = document.createElement("tbody");

  Object.values(resumen).forEach(t=>{
    const disp = fromBase(t.amount, t.kind);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${t.name}</td><td>${disp.value} ${disp.unit}</td>`;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  resultsDiv.appendChild(table);
});

// --- Exportar resumen semanal a Excel ---
exportWeeklyBtn.addEventListener('click', ()=>{
  let consumos = JSON.parse(localStorage.getItem("consumosSemana")) || [];
  if(consumos.length===0){ alert("No hay consumos guardados."); return; }

  let resumen = {};
  consumos.forEach(dia=>{
    for(let key in dia.totales){
      if(!resumen[key]) resumen[key] = {name: dia.totales[key].name, amount:0, kind: dia.totales[key].kind};
      resumen[key].amount += dia.totales[key].amount;
    }
  });

  let data = [["Ingrediente","Total semanal"]];
  Object.values(resumen).forEach(t=>{
    const disp = fromBase(t.amount, t.kind);
    data.push([t.name, disp.value+" "+disp.unit]);
  });

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Resumen Semanal");

  XLSX.writeFile(wb, "resumen_semanal.xlsx");
});

// Exportar cálculo actual a Excel
exportBtn.addEventListener('click', ()=>{
  if(selectedList.length===0){ alert('No hay resultados para exportar.'); return; }

  let wb = XLSX.utils.book_new();

  selectedList.forEach(sel=>{
    const {recipe, qty} = sel;
    let data = [["Ingrediente","Total"]];
    recipe.ingredients.forEach(i=>{
      const kind = isLiquidName(i.name)?'liquid':'solid';
      const base = toBase(i.amount, i.unit) * qty;
      const disp = fromBase(base, kind);
      data.push([i.name, disp.value+" "+disp.unit]);
    });
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, recipe.name.substring(0,30));
  });

  let grandTotals = {};
  selectedList.forEach(sel=>{
    sel.recipe.ingredients.forEach(i=>{
      const key = i.name.toLowerCase();
      const kind = isLiquidName(i.name)?'liquid':'solid';
      const base = toBase(i.amount, i.unit) * sel.qty;
      if(!grandTotals[key]) grandTotals[key] = {name:i.name, amount:0, kind};
      grandTotals[key].amount += base;
    });
  });

  let totalData = [["Ingrediente","Total"]];
  Object.values(grandTotals).forEach(t=>{
    const disp = fromBase(t.amount, t.kind);
    totalData.push([t.name, disp.value+" "+disp.unit]);
  });
  const wsTotal = XLSX.utils.aoa_to_sheet(totalData);
  XLSX.utils.book_append_sheet(wb, wsTotal, "Total General");

  XLSX.writeFile(wb, "insumos_panaderia.xlsx");
});

(function init(){
  refreshRecipeSelect();
})();

const clearWeeklyBtn = document.getElementById('clearWeeklyBtn');

// --- Limpiar consumo semanal ---
clearWeeklyBtn.addEventListener('click', ()=>{
  localStorage.removeItem("consumosSemana");
  alert("Consumos semanales borrados ✅");
  resultsDiv.innerHTML = '';
});

// --- Ver resumen semanal  ---
weeklyBtn.addEventListener('click', ()=>{
  let consumos = JSON.parse(localStorage.getItem("consumosSemana")) || [];
  if(consumos.length===0){ alert("No hay consumos guardados."); return; }

  // Calcular rango de semana (del primer día al último guardado)
  let fechas = consumos.map(c=> new Date(c.fecha));
  fechas.sort((a,b)=>a-b);
  let inicio = fechas[0];
  let fin = fechas[fechas.length-1];

  const opciones = { day:'numeric', month:'long', year:'numeric' };
  let rango = `Semana del ${inicio.toLocaleDateString('es-ES', opciones)} al ${fin.toLocaleDateString('es-ES', opciones)}`;

  // Calcular resumen semanal
  let resumen = {};
  consumos.forEach(dia=>{
    for(let key in dia.totales){
      if(!resumen[key]) resumen[key] = {name: dia.totales[key].name, amount:0, kind: dia.totales[key].kind};
      resumen[key].amount += dia.totales[key].amount;
    }
  });

  // Mostrar resultados
  resultsDiv.innerHTML = `<h2>Consumo semanal</h2><p><strong>${rango}</strong></p>`;

  // Tabla de consumos por día
  const tablaDias = document.createElement("table");
  tablaDias.innerHTML = "<thead><tr><th>Fecha</th><th>Ingredientes</th></tr></thead>";
  const tbodyDias = document.createElement("tbody");

  consumos.forEach(dia=>{
    let detalles = Object.values(dia.totales).map(t=>{
      const disp = fromBase(t.amount, t.kind);
      return `${t.name}: ${disp.value} ${disp.unit}`;
    }).join(", ");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${dia.fecha}</td><td>${detalles}</td>`;
    tbodyDias.appendChild(tr);
  });

  tablaDias.appendChild(tbodyDias);
  resultsDiv.appendChild(tablaDias);

  // Tabla de totales semanales
  const tablaResumen = document.createElement("table");
  tablaResumen.innerHTML = "<thead><tr><th>Ingrediente</th><th>Total semanal</th></tr></thead>";
  const tbody = document.createElement("tbody");

  Object.values(resumen).forEach(t=>{
    const disp = fromBase(t.amount, t.kind);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${t.name}</td><td>${disp.value} ${disp.unit}</td>`;
    tbody.appendChild(tr);
  });

  tablaResumen.appendChild(tbody);
  resultsDiv.appendChild(tablaResumen);
});

