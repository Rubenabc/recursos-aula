/* Ruta Verde · script compartido. Cada módulo se activa solo si su sección está en la página. */
(function(){
'use strict';
function $(i){return document.getElementById(i)}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function each(l,f){Array.prototype.forEach.call(l,f)}
var ART={"ceibo": "<svg class=\"art\" viewBox=\"0 0 300 180\" aria-hidden=\"true\"><rect width=\"300\" height=\"180\" fill=\"#F3E6BD\"/><path d=\"M0 130 C70 100 140 125 300 105 V180 H0Z\" fill=\"#9DBF70\"/><rect x=\"190\" y=\"70\" width=\"48\" height=\"66\" rx=\"10\" fill=\"#D9962B\"/><rect x=\"196\" y=\"58\" width=\"36\" height=\"14\" rx=\"4\" fill=\"#7A4A12\"/><rect x=\"198\" y=\"92\" width=\"32\" height=\"22\" rx=\"4\" fill=\"#F6E7B8\"/><g fill=\"#4F8A32\"><ellipse cx=\"80\" cy=\"120\" rx=\"16\" ry=\"30\" transform=\"rotate(-25 80 120)\"/><ellipse cx=\"108\" cy=\"116\" rx=\"16\" ry=\"30\" transform=\"rotate(10 108 116)\"/><ellipse cx=\"136\" cy=\"124\" rx=\"14\" ry=\"26\" transform=\"rotate(35 136 124)\"/></g></svg>", "aromos": "<svg class=\"art\" viewBox=\"0 0 300 180\" aria-hidden=\"true\"><rect width=\"300\" height=\"180\" fill=\"#E9EFD6\"/><path d=\"M0 140 C90 110 170 135 300 118 V180 H0Z\" fill=\"#8FB468\"/><ellipse cx=\"130\" cy=\"118\" rx=\"82\" ry=\"30\" fill=\"#E3BC58\"/><ellipse cx=\"130\" cy=\"100\" rx=\"82\" ry=\"30\" fill=\"#F2D888\"/><path d=\"M130 100 L205 100 L205 118 A82 30 0 0 1 130 148Z\" fill=\"#E9C96C\" opacity=\".55\"/><rect x=\"226\" y=\"86\" width=\"34\" height=\"46\" rx=\"8\" fill=\"#D9962B\"/><rect x=\"230\" y=\"76\" width=\"26\" height=\"12\" rx=\"3\" fill=\"#7A4A12\"/></svg>", "quesos": "<svg class=\"art\" viewBox=\"0 0 300 180\" aria-hidden=\"true\"><rect width=\"300\" height=\"180\" fill=\"#F1E8D2\"/><path d=\"M0 142 C100 118 190 140 300 124 V180 H0Z\" fill=\"#A8C281\"/><path d=\"M60 128 L170 78 L240 128Z\" fill=\"#F2D888\"/><path d=\"M60 128 L240 128 L240 146 L60 146Z\" fill=\"#E3BC58\"/><circle cx=\"130\" cy=\"112\" r=\"6\" fill=\"#E3BC58\"/><circle cx=\"178\" cy=\"120\" r=\"5\" fill=\"#E3BC58\"/></svg>", "posada": "<svg class=\"art\" viewBox=\"0 0 300 180\" aria-hidden=\"true\"><rect width=\"300\" height=\"180\" fill=\"#D4E4EE\"/><circle cx=\"238\" cy=\"48\" r=\"20\" fill=\"#FFE9A8\"/><path d=\"M0 130 C80 100 150 128 300 108 V180 H0Z\" fill=\"#8FB468\"/><rect x=\"92\" y=\"84\" width=\"116\" height=\"60\" fill=\"#FBF7EA\"/><path d=\"M82 88 L150 42 L218 88Z\" fill=\"#8A4B2A\"/><rect x=\"138\" y=\"106\" width=\"24\" height=\"38\" fill=\"#7A4A12\"/><rect x=\"104\" y=\"100\" width=\"20\" height=\"20\" fill=\"#9CC4D8\"/><rect x=\"176\" y=\"100\" width=\"20\" height=\"20\" fill=\"#9CC4D8\"/></svg>", "lana": "<svg class=\"art\" viewBox=\"0 0 300 180\" aria-hidden=\"true\"><rect width=\"300\" height=\"180\" fill=\"#EEDFCB\"/><circle cx=\"110\" cy=\"96\" r=\"48\" fill=\"#C8643C\"/><g fill=\"none\" stroke=\"#F3C9AE\" stroke-width=\"3\"><path d=\"M72 80 C100 104 130 104 148 82\"/><path d=\"M64 98 C100 124 136 122 156 98\"/><path d=\"M76 120 C104 136 130 134 146 118\"/></g><circle cx=\"200\" cy=\"112\" r=\"32\" fill=\"#5E8A3B\"/><g fill=\"none\" stroke=\"#B9D69A\" stroke-width=\"3\"><path d=\"M176 102 C196 118 214 118 226 104\"/><path d=\"M174 118 C196 132 214 130 228 118\"/></g></svg>"};
var PR={"ceibo": {"n": "Finca Agroecológica El Ceibo", "d": "Colonia", "tag": "Miel y verduras", "desc": "Miel pura, verduras de estación y visita a la huerta.", "pr": "Miel orgánica de pradera (1 kg): $350", "badge": "Cosecha fresca", "rt": "4,9"}, "aromos": {"n": "Granja Tradicional «Los Aromos»", "d": "San José", "tag": "Quesos y experiencias", "desc": "Una familia dedicada a la producción apícola y quesera, con visitas guiadas en finca.", "pr": "Queso Colonia artesanal (kilo): $520 · Visita con degustación: $400 por persona", "badge": "Visitas hoy", "rt": "4,8"}, "quesos": {"n": "Finca Quesos", "d": "Canelones", "tag": "Quesos", "desc": "Quesos artesanales de productores de la zona.", "pr": "", "badge": "Ejemplo", "rt": "4,7"}, "posada": {"n": "Posada", "d": "Colonia", "tag": "Alojamiento", "desc": "Alojamiento rural con paseos por el campo.", "pr": "", "badge": "Reserva previa", "rt": "4,9"}, "lana": {"n": "Taller Lana", "d": "San José", "tag": "Artesanías", "desc": "Piezas artesanales en lana, hechas a mano.", "pr": "", "badge": "Hecho a mano", "rt": "4,8"}};
var ORDER=["ceibo", "aromos", "quesos", "posada", "lana"];
var saved=[];
try{saved=JSON.parse(localStorage.getItem('rv-guardados')||'[]')||[]}catch(e){saved=[]}
function persist(){try{localStorage.setItem('rv-guardados',JSON.stringify(saved))}catch(e){}}
function toggle(id){var i=saved.indexOf(id);if(i>-1)saved.splice(i,1);else saved.push(id);persist();refrescar()}
var refrescos=[];
function refrescar(){refrescos.forEach(function(f){try{f()}catch(e){}})}
function conteo(){var c=$('gcount');if(c)c.textContent=saved.length?'('+saved.length+')':''}
refrescos.push(conteo);

/* ---- menú ---- */
function menu(){
  var h=document.querySelector('.sitehd'),b=document.querySelector('.burger');
  if(!h||!b)return;
  function cerrar(){h.classList.remove('open');b.setAttribute('aria-expanded','false')}
  b.addEventListener('click',function(){var o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  each(h.querySelectorAll('.mn a'),function(a){a.addEventListener('click',cerrar)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&h.classList.contains('open')){cerrar();b.focus()}});
}

/* ---- inicio: tarjetas, corazones, filtros, voz ---- */
function tarjetas(){
  var list=$('list');if(!list)return;
  var cards=Array.prototype.slice.call(list.querySelectorAll('.pc'));
  function pinta(){cards.forEach(function(c){c.querySelector('.heart').setAttribute('aria-pressed',saved.indexOf(c.getAttribute('data-id'))>-1)})}
  refrescos.push(pinta);
  cards.forEach(function(c){c.querySelector('.heart').addEventListener('click',function(){toggle(c.getAttribute('data-id'))})});
  pinta();
  var chips=document.querySelectorAll('#chips .chip'),q=$('q'),cat='todo';
  function apply(){
    var t=(q&&q.value||'').toLowerCase().trim();
    cards.forEach(function(c){
      var okc=cat==='todo'||(' '+c.getAttribute('data-c')+' ').indexOf(' '+cat+' ')>-1;
      var okt=!t||c.textContent.toLowerCase().indexOf(t)>-1;
      c.style.display=(okc&&okt)?'':'none';
    });
  }
  each(chips,function(b){b.addEventListener('click',function(){
    cat=b.getAttribute('data-c');each(chips,function(x){x.setAttribute('aria-pressed',x===b)});apply();
  })});
  if(q)q.addEventListener('input',apply);
  var synth=window.speechSynthesis,cur=null;
  function texto(card){
    var p=[];['h3','.m','p','.pr'].forEach(function(sel){var n=card.querySelector(sel);if(n)p.push(n.textContent.trim())});
    return p.join('. ').replace(/\$(\d[\d.]*)/g,'$1 pesos').replace(/\s+/g,' ');
  }
  each(list.querySelectorAll('.speak'),function(b){b.addEventListener('click',function(){
    if(!synth||!window.SpeechSynthesisUtterance){b.textContent='No disponible en este navegador';return}
    if(cur===b){synth.cancel();return}
    synth.cancel();
    var u=new SpeechSynthesisUtterance(texto(b.closest('.card')));u.lang='es-AR';u.rate=.95;
    function fin(){b.setAttribute('aria-pressed','false');b.textContent='Escuchar';if(cur===b)cur=null}
    u.onend=fin;u.onerror=fin;cur=b;b.setAttribute('aria-pressed','true');b.textContent='Detener';synth.speak(u);
  })});
}

/* ---- mapa de productores y guardados ---- */
var POS={Artigas:[1,0],Salto:[0,1],Rivera:[3,1],'Paysandú':[0,2],'Tacuarembó':[2,2],'Cerro Largo':[4,2],'Río Negro':[0,3],Durazno:[2,3],'Treinta y Tres':[4,3],Soriano:[0,4],Flores:[1,4],Florida:[2,4],Lavalleja:[3,4],Rocha:[4,4],Colonia:[0,5],'San José':[1,5],Canelones:[2,5],Maldonado:[3,5],Montevideo:[2,6]};
function flash(e){if(!e)return;e.classList.remove('flash');void e.offsetWidth;e.classList.add('flash')}
function mapa(){
  var tb=$('ptiles'),ml=$('mlist'),pop=$('pop');
  if(tb&&ml&&pop){
    var cur='ceibo';
    function porDepto(d){return ORDER.filter(function(k){return PR[k].d===d})}
    function art(id){var d=document.createElement('div');d.innerHTML=ART[id];var a=d.firstChild;a.removeAttribute('class');return a}
    function pinta(){
      tb.textContent='';
      Object.keys(POS).forEach(function(d){
        var ids=porDepto(d),t=el('button','pt'+(ids.length?' has':'')+(ids.indexOf(cur)>-1?' sel':''));
        t.type='button';t.style.gridColumn=POS[d][0]+1;t.style.gridRow=POS[d][1]+1;t.textContent=d;
        if(ids.length){t.appendChild(el('span','pin',ids.length>1?String(ids.length):'●'));
          t.addEventListener('click',function(){cur=(ids.indexOf(cur)>-1&&ids.length>1)?ids[(ids.indexOf(cur)+1)%ids.length]:ids[0];pinta();flash(pop)})}
        else{t.disabled=true}
        tb.appendChild(t);
      });
      ml.textContent='';
      ORDER.forEach(function(id){
        var b=el('button','mi');b.type='button';b.setAttribute('aria-pressed',id===cur);b.appendChild(art(id));
        var d=el('div');d.appendChild(el('b','',PR[id].n));d.appendChild(el('small','',PR[id].tag+' · '+PR[id].d));b.appendChild(d);
        b.addEventListener('click',function(){cur=id;pinta();flash(pop)});ml.appendChild(b);
      });
      pop.textContent='';pop.appendChild(art(cur));
      var dd=el('div');dd.style.flex='1';dd.appendChild(el('b','',PR[cur].n));dd.appendChild(el('small','',PR[cur].d+' · ★ '+PR[cur].rt));pop.appendChild(dd);
      var g=el('button','btn sm',saved.indexOf(cur)>-1?'♥ Guardado':'♡ Guardar');g.type='button';
      g.setAttribute('aria-pressed',saved.indexOf(cur)>-1);g.addEventListener('click',function(){toggle(cur)});pop.appendChild(g);
    }
    refrescos.push(pinta);pinta();
  }
  var gl=$('glist'),ge=$('gempty');
  if(gl&&ge){
    function lista(){
      gl.textContent='';
      saved.forEach(function(id){
        if(!PR[id])return;var p=PR[id];
        var a=el('article','card prod pc');a.setAttribute('data-id',id);
        a.innerHTML='<div class="aw">'+ART[id]+'<span class="badge">'+p.badge+'</span><button class="heart" type="button" aria-pressed="true" aria-label="Quitar de guardados">♥</button></div><div class="bd"><span class="rt"><i>★</i> '+p.rt+'</span><span class="tag">'+p.tag+'</span><h3>'+p.n+'</h3><div class="m">'+p.d+'</div><p>'+p.desc+'</p>'+(p.pr?'<div class="pr">'+p.pr+'</div>':'')+'</div>';
        a.querySelector('.heart').addEventListener('click',function(){toggle(id)});
        gl.appendChild(a);
      });
      ge.style.display=saved.length?'none':'block';
    }
    refrescos.push(lista);lista();
  }
}

/* ---- productores: demo sin señal ---- */
function offline(){
  var sw=$('off-sw');if(!sw)return;
  var st=$('off-status'),lst=$('off-list'),msg=$('off-msg'),items=[],timer=null;
  function render(){
    lst.textContent='';
    items.forEach(function(it){
      var li=el('li');li.appendChild(el('span','',it.n+' · $'+it.p+' por kilo · '+it.s+' kg'));
      var lab=it.st==='pend'?['p','Pendiente de sincronizar']:it.st==='sync'?['s','Sincronizando…']:['g','Publicado en el mapa'];
      li.appendChild(el('span','pill '+lab[0],lab[1]));lst.appendChild(li);
    });
  }
  function cuenta(x){return items.filter(function(i){return i.st===x}).length}
  sw.addEventListener('change',function(){
    if(timer){clearTimeout(timer);timer=null}
    if(sw.checked){st.textContent='● Sin conexión';st.className='status off';msg.textContent='Sin señal, sin problema: lo que cargues queda guardado cifrado en tu celular.'}
    else{
      st.textContent='● Con conexión';st.className='status';
      var n=cuenta('pend');items.forEach(function(i){if(i.st==='pend')i.st='sync'});render();
      if(n){
        msg.textContent='Volvió la señal: se envían '+n+(n===1?' producto':' productos')+' a la nube.';
        timer=setTimeout(function(){
          items.forEach(function(i){if(i.st==='sync')i.st='pub'});render();
          msg.textContent='Listo: '+(n===1?'el producto ya está publicado':'los '+n+' productos ya están publicados')+' en el mapa, sin que el productor haga nada.';
        },1400);
      }else{msg.textContent='Con conexión, lo que cargues se publica enseguida.'}
    }
  });
  $('off-add').addEventListener('click',function(){
    var n=$('off-n').value.trim();
    if(!n){msg.textContent='Escribí el nombre del producto.';return}
    var p=parseFloat($('off-p').value),q=parseFloat($('off-s').value);
    items.push({n:n,p:isNaN(p)?0:p,s:isNaN(q)?0:q,st:sw.checked?'pend':'pub'});
    $('off-n').value='';$('off-p').value='';$('off-s').value='';render();
    msg.textContent=sw.checked?'Guardado en el celular. Se publicará cuando haya conexión ('+cuenta('pend')+' pendiente'+(cuenta('pend')===1?'':'s')+').':'Publicado en el mapa.';
  });
}

/* ---- confianza: verificador de sello ---- */
function verificador(){
  var vin=$('v-code');if(!vin)return;
  var SEL={
    'RV-0001':{t:'v',n:'Finca Agroecológica El Ceibo (ejemplo)',p:86,d:[['Manejo ambiental',27,30],['Bienestar animal e inocuidad',22,25],['Identidad territorial',22,25],['Origen y escala',15,20]],x:'Re-auditoría anual obligatoria dentro de 10 meses.'},
    'RV-0002':{t:'p',n:'Taller Lana (ejemplo)',x:'Vigencia de 60 días corridos desde la validación de la Declaración Jurada Digital. Quedan 24 días. Con el Plan Premium puede solicitar la auditoría presencial para el sello Verificado.'},
    'RV-0003':{t:'s',n:'Productor de ejemplo',x:'Sello suspendido temporalmente tras una denuncia fundamentada. Tiene 30 días para corregir las observaciones antes de una eventual revocación.'}
  };
  var res=$('v-res');
  function verificar(c){
    var k=(c||'').toUpperCase().replace(/\s+/g,'');if(/^RV\d{4}$/.test(k))k='RV-'+k.slice(2);
    res.textContent='';var d=SEL[k],box;
    if(!d){box=el('div','res no');box.appendChild(el('b','big','Código no encontrado'));box.appendChild(el('span','','Revisá el código del sello. Si no coincide con ninguno registrado, no lo tomes como válido.'));res.appendChild(box);return}
    if(d.t==='v'){
      box=el('div','res ok');box.appendChild(el('b','big','Sello Verde Verificado'));
      box.appendChild(el('span','',d.n+' · puntaje '+d.p+' sobre 100 (mínimo 80)'));
      d.d.forEach(function(r){
        var w=el('div','bar');w.style.marginTop='10px';var t=el('div','t');t.appendChild(el('span','',r[0]));t.appendChild(el('b','',r[1]+' / '+r[2]));w.appendChild(t);
        var tr=el('div','track'),f=el('div','fill');f.style.width=(r[1]/r[2]*100)+'%';tr.appendChild(f);w.appendChild(tr);box.appendChild(w);
      });
      box.appendChild(el('p','demo',d.x));
    }else{
      box=el('div','res '+(d.t==='p'?'pr':'no'));box.appendChild(el('b','big',d.t==='p'?'Sello Verde Provisional':'Sello suspendido'));
      box.appendChild(el('span','',d.n));box.appendChild(el('p','demo',d.x));
    }
    res.appendChild(box);
  }
  $('v-go').addEventListener('click',function(){verificar(vin.value)});
  vin.addEventListener('keydown',function(e){if(e.key==='Enter')verificar(vin.value)});
  each(document.querySelectorAll('#v-ex button'),function(b){b.addEventListener('click',function(){vin.value=b.getAttribute('data-v');verificar(vin.value)})});
}

/* ---- proyecto: despliegue por fases ---- */
function fases(){
  var tiles=document.querySelectorAll('.tile');if(!tiles.length)return;
  var F={
    '1':['Meses 1 a 4','Lanzamiento piloto en el eje metropolitano, hortifrutícola, quesero y turístico. Captación presencial en cooperativas, sociedades de fomento y ferias. Auditoría inicial de 30 a 40 fincas para el Sello Verde.'],
    '2':['Meses 5 a 8','Expansión a la cuenca lechera, los corredores turísticos, las sierras y el litoral agroindustrial y citrícola. Pauta digital geolocalizada y convenios con intendencias y centros turísticos.'],
    '3':['Meses 9 a 12','Integración nacional completa. Incorporación digital masiva de productores mediante acuerdos con el MGAP, el MINTUR (Uruguay Natural) y las intendencias, y presencia en eventos como la Expo Prado y la Semana de la Cerveza.']
  };
  each(tiles,function(t){t.addEventListener('click',function(){
    each(tiles,function(x){x.setAttribute('aria-pressed',x===t)});
    var f=t.getAttribute('data-f');
    $('d-t').textContent=t.getAttribute('data-d')+': Fase '+f;$('d-s').textContent=F[f][0];
    $('d-p').textContent=F[f][1]+' La app y la web ya funcionan en este departamento desde el primer día.';
    flash($('d-t').closest('.panel'));
  })});
}

/* ---- productores: recomendador y registro ---- */
function recomendador(){
  var go=$('r-go');if(!go)return;
  go.addEventListener('click',function(){
    var prod=+$('r-prod').value,rut=+$('r-rut').value,sel=+$('r-sel').value,wa=+$('r-wa').value,plan,precio,anual,r=[];
    if(rut||sel||prod===3){
      plan='Premium';precio='$800 por mes';anual='o $7.800 por año (18,75 % menos)';
      if(prod===3)r.push('Tenés más de 20 productos: el catálogo ilimitado es del Plan Premium.');
      if(rut)r.push('Las rutas turísticas sugeridas son del Plan Premium.');
      if(sel)r.push('El Sello Verde Verificado, con auditoría en finca, es exclusivo del Plan Premium.');
    }else if(prod===2||wa){
      plan='Estándar';precio='$400 por mes';anual='o $4.000 por año (16,7 % menos)';
      if(prod===2)r.push('Entre 6 y 20 productos entran en el catálogo del Plan Estándar (hasta 20).');
      if(wa)r.push('Incluye enlace a WhatsApp y botón de llamada directa.');
    }else{
      plan='Gratuito';precio='$0 por mes';anual='sin costo';
      r.push('Hasta 5 productos y una ficha con tus datos de contacto alcanzan para empezar.');
      r.push('Recibís el Sello Verde Provisional al firmar la Declaración Jurada Digital.');
    }
    var o=$('r-out');o.textContent='';
    var box=el('div','res ok');box.appendChild(el('b','big','Plan '+plan));box.appendChild(el('span','',precio+' · '+anual));
    var ul=el('ul');ul.style.margin='8px 0 0';ul.style.paddingLeft='20px';r.forEach(function(x){ul.appendChild(el('li','',x))});box.appendChild(ul);
    box.appendChild(el('p','demo','Al registrarte, probás el Plan Premium 30 días sin costo.'));o.appendChild(box);
  });
}
function registro(){
  var go=$('g-go');if(!go)return;var msg=$('g-msg');
  go.addEventListener('click',function(){
    var n=$('g-n').value.trim(),ok=$('g-ok').checked;
    if(!n){msg.textContent='Escribí el nombre de tu emprendimiento.';msg.style.color='#B3261E';$('g-n').focus();return}
    if(!ok){msg.textContent='Para continuar, aceptá la Declaración Jurada Digital y los términos.';msg.style.color='#B3261E';return}
    msg.style.color='';
    msg.textContent='¡Gracias, '+n+'! En la versión real, tu solicitud llega al equipo de Ruta Verde, que te contacta para activar tu perfil con el plan '+$('g-p').value+'. Esta es una demostración: no se envió ningún dato.';
  });
}

/* ---- preguntas frecuentes ---- */
function faq(){
  var b=$('faqtog');if(!b)return;
  function todas(){return document.querySelectorAll('#preguntas details')}
  function estado(){var a=0;each(todas(),function(d){if(d.open)a++});b.textContent=a?'Cerrar todas':'Abrir todas'}
  b.addEventListener('click',function(){var abrir=b.textContent==='Abrir todas';each(todas(),function(d){d.open=abrir});estado()});
  each(todas(),function(d){d.addEventListener('toggle',estado)});estado();
}

/* ---- aparición suave al bajar ---- */
function reveal(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||reduce)return;
  var els=document.querySelectorAll('.card:not(.pc), .pc, .panel, details, .stat, .tarifa, .hecho .st');
  each(els,function(e,i){e.classList.add('rv');e.style.transitionDelay=((i%4)*70)+'ms'});
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
  each(els,function(e){io.observe(e)});
}

[menu,tarjetas,mapa,offline,verificador,fases,recomendador,registro,faq,reveal,conteo].forEach(function(f){try{f()}catch(e){if(window.console)console.error(f.name,e)}});
})();
