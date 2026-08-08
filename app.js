const exercises={
A:[
["Brustpresse","Brust","Rücken anlehnen. Schulterblätter leicht nach hinten. Kontrolliert nach vorne drücken und langsam zurückführen.","brustpresse.svg"],
["Rudermaschine","Rücken","Brust aufrecht halten. Griffe zum Körper ziehen, Ellbogen nach hinten. Langsam lösen.","rudern.svg"],
["Latzug","Rücken","Stange zur oberen Brust ziehen. Oberkörper ruhig halten. Nicht hinter den Kopf ziehen.","latzug.svg"],
["Reverse Butterfly","Hintere Schulter","Arme kontrolliert nach außen führen. Leichtes Gewicht verwenden.","reverse.svg"],
["Trizeps am Kabel","Trizeps","Ellbogen am Körper halten und Unterarme nach unten drücken.","trizeps.svg"],
["Bauchmaschine","Bauch","Bauch einrollen, ohne Schwung. Langsam in die Ausgangsposition zurück.","bauch.svg"]
],
B:[
["Beinpresse","Beine","Füße stabil aufstellen. Knie kontrolliert beugen und strecken. Nicht vollständig durchdrücken.","beinpresse.svg"],
["Beinbeuger","Oberschenkel hinten","Bein kontrolliert beugen und langsam zurückführen.","beinbeuger.svg"],
["Brustpresse","Brust","Wie bei Tag A, aber zunächst etwas leichter.","brustpresse.svg"],
["Rudermaschine","Rücken","Aufrecht sitzen und die Griffe kontrolliert zum Körper ziehen.","rudern.svg"],
["Außenrotation Schulter","Schulter","Ellbogen am Körper fixieren. Unterarm langsam nach außen bewegen. Nur schmerzfrei.","aussenrotation.svg"],
["Bauchmaschine","Bauch","Kontrollierte Bewegung ohne Schwung.","bauch.svg"]
]};

const key=e=>`mfc_${e}`;
function load(e){return JSON.parse(localStorage.getItem(key(e))||"{}")}
function save(e,d){localStorage.setItem(key(e),JSON.stringify(d))}
function home(){
document.querySelector("#app").innerHTML=`
<div class="card"><h2>🏋️ Training</h2><p class="muted">Wähle deinen Trainingstag.</p>
<button class="btn" onclick="showDay('A')">Tag A</button>
<button class="btn" onclick="showDay('B')">Tag B</button></div>
<div class="card"><h2>📈 Fortschritt</h2><button class="btn secondary" onclick="historyView()">Trainingsverlauf</button></div>
<div class="card"><h2>⚖️ Körpergewicht</h2><div class="stat">${localStorage.getItem("bodyweight")||"—"} kg</div>
<label>Aktuelles Gewicht<input id="bw" type="number" step="0.1" placeholder="z. B. 103"></label>
<button class="btn secondary" onclick="setWeight()">Speichern</button></div>`;
}
function setWeight(){let v=document.querySelector("#bw").value;if(v){localStorage.setItem("bodyweight",v);home()}}
function showDay(day){
let list=exercises[day];
document.querySelector("#app").innerHTML=`<button class="btn back" onclick="home()">← Startseite</button>
<div class="card"><h2>Tag ${day}</h2><p class="muted">3 Sätze × 10–12 Wiederholungen · 60–90 Sek. Pause</p></div>
${list.map((e,i)=>card(e,day,i)).join("")}`;
}
function card(e,day,i){
let d=load(e[0]+day);
return `<div class="card exercise"><h2>${i+1}. ${e[0]}</h2><div class="muted">🎯 ${e[1]}</div>
<div style="padding:24px 0;text-align:center;font-size:64px">🏋️</div>
<p>${e[2]}</p>
<div class="row"><label>Gewicht (kg)<input id="w${day}${i}" type="number" step="0.5" value="${d.weight||""}" placeholder="z. B. 35"></label>
<label>Wiederholungen<input id="r${day}${i}" type="number" value="${d.reps||""}" placeholder="10–12"></label></div>
<label>Notiz<textarea id="n${day}${i}">${d.note||""}</textarea></label>
<div class="done"><input type="checkbox" id="c${day}${i}" ${d.done?"checked":""} onchange="store('${e[0]}','${day}',${i})"><span>Übung erledigt</span></div>
<button class="btn secondary" onclick="store('${e[0]}','${day}',${i})">Speichern</button></div>`;
}
function store(name,day,i){
let d={weight:document.querySelector(`#w${day}${i}`).value,reps:document.querySelector(`#r${day}${i}`).value,note:document.querySelector(`#n${day}${i}`).value,done:document.querySelector(`#c${day}${i}`).checked,date:new Date().toLocaleDateString("de-AT")};
save(name+day,d);
}
function historyView(){
let rows=[];
["A","B"].forEach(day=>exercises[day].forEach(e=>{let d=load(e[0]+day);if(d.weight)rows.push(`<p><b>${e[0]}</b> · ${d.weight} kg · ${d.reps||"—"} Wdh. · ${d.date||""}</p>`)}));
document.querySelector("#app").innerHTML=`<button class="btn back" onclick="home()">← Startseite</button><div class="card"><h2>📈 Trainingsverlauf</h2>${rows.length?rows.join(""):"<p class='muted'>Noch keine Einträge.</p>"}</div>`;
}
home();