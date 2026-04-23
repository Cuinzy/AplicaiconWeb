// ============================================================
// WEBCRAFT — Tutorial interactivo
// ============================================================

const TUTORIAL_SECTIONS = [

  // ──────────────────────────────────────────
  // SECCIÓN 1 · NIVEL 1
  // ──────────────────────────────────────────
  {
    id: 'sec1', title: 'Nivel 1: Primer Contacto', icon: '🔹', color: '#58a6ff',
    topics: [

      {
        id: 'eventos',
        icon: '🖱️',
        name: 'addEventListener',
        tagline: 'Hacer que el código reaccione a acciones del usuario',
        whatis: `<p><code>addEventListener</code> conecta un elemento HTML con una función de JavaScript. Cada vez que ocurre un <em>evento</em> (clic, tecla, movimiento del mouse…), la función se ejecuta automáticamente.</p>
<p>Es la base de toda interfaz interactiva: sin eventos, la página es estática.</p>`,
        syntax: [
          {
            label: 'Básico',
            code: `// 1. Obtener el elemento
const boton = document.getElementById('miBoton');

// 2. Escuchar el evento 'click'
boton.addEventListener('click', function() {
  // Este código se ejecuta al hacer clic
  console.log('¡Clic detectado!');
});`,
          },
          {
            label: 'Arrow function',
            code: `// Forma moderna (ES6+)
const boton = document.getElementById('miBoton');

boton.addEventListener('click', () => {
  boton.textContent = '¡Hecho!';
  boton.style.background = 'green';
});`,
          },
          {
            label: 'Eventos comunes',
            code: `// Tipos de eventos más usados:
elemento.addEventListener('click',     () => {}); // clic
elemento.addEventListener('dblclick',  () => {}); // doble clic
elemento.addEventListener('mouseover', () => {}); // mouse entra
elemento.addEventListener('mouseout',  () => {}); // mouse sale
elemento.addEventListener('keyup',     () => {}); // tecla suelta
elemento.addEventListener('input',     () => {}); // escribir
elemento.addEventListener('submit',    () => {}); // enviar form`,
          },
        ],
        demoCode: `const boton = document.getElementById('miBoton');
let clics = 0;

boton.addEventListener('click', function() {
  clics = clics + 1;
  boton.textContent = '¡Clics: ' + clics + '!';
  // El color cambia con cada clic
  const tono = (clics * 40) % 360;
  boton.style.background =
    'hsl(' + tono + ', 70%, 45%)';
});`,
        init(result) {
          result.innerHTML = `
<style>
  #ev-btn { padding:14px 32px; font-size:1.1rem; border:none; border-radius:10px;
    background:#4a90e2; color:white; cursor:pointer; transition:all 0.3s; font-weight:bold; }
  #ev-info { margin-top:16px; font-size:0.9rem; color:#888; }
</style>
<button id="ev-btn">Haz clic aquí</button>
<div id="ev-info">Clics: 0 · Evento: ninguno aún</div>`;
          let c = 0;
          const btn = result.querySelector('#ev-btn');
          const info = result.querySelector('#ev-info');
          btn.addEventListener('click', () => {
            c++;
            btn.textContent = '¡Clics: ' + c + '!';
            btn.style.background = 'hsl(' + ((c * 40) % 360) + ', 70%, 45%)';
            info.textContent = 'Clics: ' + c + ' · Evento: click ✓';
            info.style.color = '#3fb950';
          });
          btn.addEventListener('mouseover', () => { info.style.opacity = '0.7'; });
          btn.addEventListener('mouseout',  () => { info.style.opacity = '1'; });
        },
        variations: [
          { title: 'Múltiples eventos en el mismo elemento', code: `const caja = document.getElementById('caja');

caja.addEventListener('mouseover', () => {
  caja.style.background = 'dodgerblue';
});

caja.addEventListener('mouseout', () => {
  caja.style.background = '#eee';
});` },
          { title: 'Evento en muchos elementos a la vez', code: `const botones = document.querySelectorAll('.btn');

botones.forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.textContent = '¡Listo!';
  });
});` },
        ],
      },

      {
        id: 'textcontent',
        icon: '✏️',
        name: 'textContent · innerHTML · value',
        tagline: 'Leer y cambiar el contenido de elementos HTML',
        whatis: `<p>Estas propiedades permiten <strong>leer</strong> o <strong>modificar</strong> lo que hay dentro de un elemento:</p>
<ul>
  <li><code>textContent</code> — texto plano (sin HTML)</li>
  <li><code>innerHTML</code> — HTML completo (con etiquetas)</li>
  <li><code>value</code> — contenido de un input, select o textarea</li>
</ul>`,
        syntax: [
          {
            label: 'textContent',
            code: `// Leer texto de un elemento
const parrafo = document.getElementById('parrafo');
console.log(parrafo.textContent); // "Hola mundo"

// Cambiar el texto
parrafo.textContent = 'Texto nuevo';`,
          },
          {
            label: 'innerHTML',
            code: `// innerHTML acepta etiquetas HTML
const div = document.getElementById('caja');

div.innerHTML = '<strong>Negrita</strong> y normal';
// → muestra: **Negrita** y normal

div.innerHTML = '<ul><li>A</li><li>B</li></ul>';
// → muestra una lista`,
          },
          {
            label: 'value (inputs)',
            code: `const input = document.getElementById('miInput');

// Leer lo que escribió el usuario
const texto = input.value;
console.log(texto); // "lo que escribió"

// Limpiar el input
input.value = '';

// Poner texto por defecto
input.value = 'Texto inicial';`,
          },
        ],
        demoCode: `const input = document.getElementById('miInput');
const titulo = document.getElementById('titulo');
const contador = document.getElementById('contador');

input.addEventListener('input', function() {
  // Cada vez que el usuario escribe...
  titulo.textContent = input.value || 'Escribe algo...';
  contador.textContent = input.value.length + ' caracteres';
});`,
        init(result) {
          result.innerHTML = `
<style>
  #tc-input { width:100%; padding:10px 14px; font-size:1rem; border:2px solid #444;
    border-radius:8px; background:#161b22; color:white; outline:none; box-sizing:border-box; }
  #tc-input:focus { border-color:#58a6ff; }
  #tc-titulo { font-size:1.6rem; font-weight:800; color:#58a6ff; margin:14px 0 4px;
    min-height:40px; transition:all 0.2s; word-break:break-all; }
  #tc-contador { font-size:0.82rem; color:#6a9955; }
</style>
<input id="tc-input" placeholder="Escribe aquí y observa los cambios en tiempo real...">
<div id="tc-titulo">Escribe algo...</div>
<div id="tc-contador">0 caracteres</div>`;
          const inp = result.querySelector('#tc-input');
          const tit = result.querySelector('#tc-titulo');
          const cnt = result.querySelector('#tc-contador');
          inp.addEventListener('input', () => {
            tit.textContent = inp.value || 'Escribe algo...';
            cnt.textContent = inp.value.length + ' caracteres';
            tit.style.color = inp.value.length > 10 ? '#3fb950' : '#58a6ff';
          });
        },
        variations: [
          { title: 'Mostrar saludo personalizado', code: `const input = document.getElementById('nombre');
const boton = document.getElementById('saludar');
const resultado = document.getElementById('resultado');

boton.addEventListener('click', function() {
  const nombre = input.value;
  resultado.textContent = '¡Hola, ' + nombre + '!';
});` },
          { title: 'Insertar HTML dinámico', code: `const lista = document.getElementById('lista');

lista.innerHTML = \`
  <li>🍎 Manzana</li>
  <li>🍌 Banana</li>
  <li>🍇 Uva</li>
\`;` },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // SECCIÓN 2 · NIVEL 2
  // ──────────────────────────────────────────
  {
    id: 'sec2', title: 'Nivel 2: Manipulación del DOM', icon: '🔸', color: '#3fb950',
    topics: [

      {
        id: 'selectores',
        icon: '🔍',
        name: 'getElementById · querySelector',
        tagline: 'Encontrar y seleccionar elementos de la página',
        whatis: `<p>Antes de modificar un elemento necesitas <em>obtenerlo</em>. JavaScript ofrece varias formas de seleccionar elementos del HTML:</p>
<ul>
  <li><code>getElementById</code> — por id exacto (el más rápido)</li>
  <li><code>querySelector</code> — por selector CSS (cualquier selector)</li>
  <li><code>querySelectorAll</code> — todos los que coincidan</li>
</ul>`,
        syntax: [
          {
            label: 'getElementById',
            code: `// Selecciona por id (sin el #)
const titulo = document.getElementById('titulo');
const boton  = document.getElementById('btn-enviar');

// Devuelve null si no existe
if (!titulo) {
  console.log('Elemento no encontrado');
}`,
          },
          {
            label: 'querySelector',
            code: `// Selecciona usando sintaxis CSS
const primero = document.querySelector('p');      // primera <p>
const clase   = document.querySelector('.tarjeta'); // primera con esa clase
const id      = document.querySelector('#titulo'); // por id

// Combinaciones CSS también funcionan:
const link = document.querySelector('nav a.activo');`,
          },
          {
            label: 'querySelectorAll',
            code: `// Devuelve TODOS los elementos que coincidan
const parrafos = document.querySelectorAll('p');
const tarjetas = document.querySelectorAll('.tarjeta');
const inputs   = document.querySelectorAll('input[type="text"]');

// Itera con forEach
parrafos.forEach(function(p) {
  p.style.color = 'blue';
});`,
          },
        ],
        demoCode: `// Seleccionar por diferentes métodos
const porId    = document.getElementById('caja1');
const porClase = document.querySelector('.caja');
const todos    = document.querySelectorAll('.caja');

// Resaltar el seleccionado
porId.style.border = '3px solid #58a6ff';

// Aplicar a todos
todos.forEach(caja => {
  caja.addEventListener('click', () => {
    caja.classList.toggle('activa');
  });
});`,
        init(result) {
          result.innerHTML = `
<style>
  .sel-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:12px; }
  .sel-caja { padding:14px; border-radius:8px; background:#21262d; border:2px solid #30363d;
    text-align:center; cursor:pointer; font-size:0.85rem; transition:all 0.25s; color:#e6edf3; }
  .sel-caja.activa { background:#1f3d2e; border-color:#3fb950; color:#3fb950; }
  .sel-btns { display:flex; gap:8px; flex-wrap:wrap; }
  .sel-btn { padding:6px 12px; border:1px solid #444; border-radius:6px; background:#0d1117;
    color:#9cdcfe; cursor:pointer; font-size:0.8rem; }
  .sel-btn:hover { border-color:#9cdcfe; }
  #sel-log { margin-top:10px; font-size:0.8rem; color:#6a9955; min-height:20px; }
</style>
<div class="sel-grid">
  <div class="sel-caja" id="sel-c1" data-i="1">id="sel-c1"</div>
  <div class="sel-caja" id="sel-c2" data-i="2">id="sel-c2"</div>
  <div class="sel-caja" id="sel-c3" data-i="3">id="sel-c3"</div>
</div>
<div class="sel-btns">
  <button class="sel-btn" data-act="id">getElementById('sel-c1')</button>
  <button class="sel-btn" data-act="qs">querySelector('#sel-c2')</button>
  <button class="sel-btn" data-act="all">querySelectorAll('.sel-caja')</button>
  <button class="sel-btn" data-act="reset">↺ Limpiar</button>
</div>
<div id="sel-log"></div>`;
          const cajas = result.querySelectorAll('.sel-caja');
          const log   = result.querySelector('#sel-log');
          cajas.forEach(c => c.addEventListener('click', () => {
            c.classList.toggle('activa');
            log.textContent = `Clic en #${c.id} — classList: ${c.classList.contains('activa') ? 'activa ✓' : '(vacío)'}`;
          }));
          result.querySelector('[data-act="id"]').addEventListener('click', () => {
            cajas.forEach(c => c.classList.remove('activa'));
            result.querySelector('#sel-c1').classList.add('activa');
            log.textContent = 'getElementById → solo #sel-c1 seleccionada';
          });
          result.querySelector('[data-act="qs"]').addEventListener('click', () => {
            cajas.forEach(c => c.classList.remove('activa'));
            result.querySelector('#sel-c2').classList.add('activa');
            log.textContent = 'querySelector → solo #sel-c2 seleccionada';
          });
          result.querySelector('[data-act="all"]').addEventListener('click', () => {
            cajas.forEach(c => c.classList.add('activa'));
            log.textContent = 'querySelectorAll → las 3 cajas seleccionadas';
          });
          result.querySelector('[data-act="reset"]').addEventListener('click', () => {
            cajas.forEach(c => c.classList.remove('activa'));
            log.textContent = 'Todas las selecciones limpiadas';
          });
        },
        variations: [
          { title: 'Verificar si existe antes de usar', code: `const el = document.getElementById('miElemento');

if (el) {
  el.textContent = 'Encontrado';
} else {
  console.log('Elemento no existe en el HTML');
}` },
          { title: 'Seleccionar dentro de un contenedor', code: `const form = document.getElementById('formulario');

// Busca solo dentro del formulario, no en toda la página
const inputs  = form.querySelectorAll('input');
const boton   = form.querySelector('button[type="submit"]');` },
        ],
      },

      {
        id: 'createremove',
        icon: '🏗️',
        name: 'createElement · appendChild · remove',
        tagline: 'Crear, insertar y eliminar elementos del DOM',
        whatis: `<p>JavaScript puede <strong>construir</strong> elementos HTML desde cero y agregarlos a la página sin recargarla. También puede eliminarlos.</p>
<p>Esta es la base de frameworks como React y Vue: todo el UI se construye dinámicamente con JS.</p>`,
        syntax: [
          {
            label: 'Crear y agregar',
            code: `// 1. Crear el elemento
const nuevoDiv = document.createElement('div');

// 2. Configurarlo
nuevoDiv.textContent = 'Soy nuevo';
nuevoDiv.className = 'tarjeta';
nuevoDiv.id = 'tarjeta1';

// 3. Agregarlo al DOM
const contenedor = document.getElementById('contenedor');
contenedor.appendChild(nuevoDiv); // al final
// contenedor.prepend(nuevoDiv);  // al inicio`,
          },
          {
            label: 'Eliminar elementos',
            code: `// Método 1: el elemento se elimina a sí mismo
const item = document.getElementById('item1');
item.remove();

// Método 2: el padre elimina al hijo
const padre = document.getElementById('lista');
const hijo  = document.getElementById('item1');
padre.removeChild(hijo);`,
          },
          {
            label: 'Atributos y propiedades',
            code: `const img = document.createElement('img');

// Atributos HTML
img.setAttribute('src', 'foto.jpg');
img.setAttribute('alt', 'Mi foto');

// Propiedades JS directas
img.src = 'foto.jpg';     // equivalente
img.alt = 'Mi foto';      // equivalente
img.className = 'imagen-grande';
img.style.width = '100px';`,
          },
        ],
        demoCode: `const input = document.getElementById('txtItem');
const btnAg = document.getElementById('btnAgregar');
const lista = document.getElementById('miLista');

btnAgregar.addEventListener('click', function() {
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement('li');
  li.textContent = texto;

  // Botón para borrar cada item
  const btnBorrar = document.createElement('button');
  btnBorrar.textContent = '×';
  btnBorrar.addEventListener('click', () => li.remove());

  li.appendChild(btnBorrar);
  lista.appendChild(li);
  input.value = '';
});`,
        init(result) {
          result.innerHTML = `
<style>
  .cr-row { display:flex; gap:8px; margin-bottom:12px; }
  #cr-inp { flex:1; padding:9px 12px; background:#161b22; border:2px solid #30363d;
    border-radius:8px; color:white; font-size:0.9rem; outline:none; }
  #cr-inp:focus { border-color:#3fb950; }
  #cr-add { padding:9px 16px; background:#238636; color:white; border:none;
    border-radius:8px; cursor:pointer; font-weight:bold; }
  #cr-list { list-style:none; padding:0; display:flex; flex-direction:column; gap:6px; }
  #cr-list li { display:flex; align-items:center; justify-content:space-between;
    padding:9px 12px; background:#21262d; border-radius:8px; border-left:3px solid #3fb950;
    animation:aparecer 0.25s ease; }
  @keyframes aparecer { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
  .cr-del { background:#da3633; color:white; border:none; border-radius:4px;
    width:22px; height:22px; cursor:pointer; font-size:0.9rem; flex-shrink:0; }
  #cr-empty { color:#484f58; font-size:0.85rem; font-style:italic; }
</style>
<div class="cr-row">
  <input id="cr-inp" placeholder="Escribe un elemento...">
  <button id="cr-add">+ Agregar</button>
</div>
<ul id="cr-list"><li id="cr-empty">La lista está vacía</li></ul>`;
          const inp  = result.querySelector('#cr-inp');
          const add  = result.querySelector('#cr-add');
          const list = result.querySelector('#cr-list');
          function agregar() {
            const txt = inp.value.trim();
            if (!txt) return;
            result.querySelector('#cr-empty')?.remove();
            const li  = document.createElement('li');
            const del = document.createElement('button');
            del.className = 'cr-del'; del.textContent = '×';
            del.addEventListener('click', () => { li.remove(); if (!list.children.length) { const e=document.createElement('li');e.id='cr-empty';e.textContent='La lista está vacía';list.appendChild(e); } });
            li.textContent = txt;
            li.appendChild(del);
            list.appendChild(li);
            inp.value = '';
            inp.focus();
          }
          add.addEventListener('click', agregar);
          inp.addEventListener('keydown', e => { if (e.key === 'Enter') agregar(); });
        },
        variations: [
          { title: 'Crear elemento complejo con innerHTML', code: `const card = document.createElement('div');
card.className = 'tarjeta';

// innerHTML es más rápido para HTML complejo
card.innerHTML = \`
  <h3>Título</h3>
  <p>Descripción del elemento</p>
  <button>Ver más</button>
\`;

document.getElementById('grid').appendChild(card);` },
          { title: 'insertBefore — insertar en posición específica', code: `const lista = document.getElementById('lista');
const nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Primero siempre';

// Insertar ANTES del primer hijo
lista.insertBefore(nuevoItem, lista.firstChild);` },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // SECCIÓN 3 · NIVEL 3
  // ──────────────────────────────────────────
  {
    id: 'sec3', title: 'Nivel 3: Estilos Dinámicos', icon: '🎨', color: '#d2a8ff',
    topics: [

      {
        id: 'styles',
        icon: '🎨',
        name: 'style.property',
        tagline: 'Cambiar estilos CSS directamente desde JavaScript',
        whatis: `<p>Cada elemento HTML tiene una propiedad <code>style</code> que expone todas las propiedades CSS como propiedades JavaScript. Puedes leerlas y cambiarlas en tiempo real.</p>
<p><strong>Nota:</strong> los nombres CSS con guión (<code>background-color</code>) se escriben en camelCase JS (<code>backgroundColor</code>).</p>`,
        syntax: [
          {
            label: 'Cambiar propiedades',
            code: `const caja = document.getElementById('caja');

// CSS → JS (camelCase)
caja.style.backgroundColor = '#4a90e2'; // background-color
caja.style.fontSize         = '1.5rem'; // font-size
caja.style.borderRadius     = '8px';    // border-radius
caja.style.display          = 'flex';   // display
caja.style.margin           = '0 auto'; // margin`,
          },
          {
            label: 'Leer estilos actuales',
            code: `const caja = document.getElementById('caja');

// Leer estilo inline (solo el que pusimos con JS)
const color = caja.style.backgroundColor;

// Leer el estilo COMPUTADO (incluyendo CSS externo)
const estilosFinales = getComputedStyle(caja);
const colorFinal = estilosFinales.backgroundColor;
console.log(colorFinal); // "rgb(74, 144, 226)"`,
          },
          {
            label: 'Múltiples propiedades',
            code: `const el = document.getElementById('elemento');

// Aplicar varias propiedades de golpe
Object.assign(el.style, {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '20px',
  borderRadius: '10px',
  transform: 'scale(1.1)',
  transition: 'all 0.3s'
});`,
          },
        ],
        demoCode: `const caja = document.getElementById('caja');

// Los sliders controlan el color RGB
rSlider.addEventListener('input', actualizarColor);
gSlider.addEventListener('input', actualizarColor);
bSlider.addEventListener('input', actualizarColor);

function actualizarColor() {
  const r = rSlider.value;
  const g = gSlider.value;
  const b = bSlider.value;

  caja.style.backgroundColor =
    'rgb(' + r + ', ' + g + ', ' + b + ')';
}`,
        init(result) {
          result.innerHTML = `
<style>
  .st-demo { display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap; }
  #st-caja { width:120px; height:120px; border-radius:14px; transition:all 0.15s;
    background:rgb(74,144,226); flex-shrink:0; }
  .st-sliders { flex:1; min-width:180px; display:flex; flex-direction:column; gap:10px; }
  .st-row { display:flex; align-items:center; gap:8px; font-size:0.85rem; }
  .st-lbl { width:16px; font-weight:700; }
  .st-row input[type=range] { flex:1; }
  .st-val { width:28px; text-align:right; color:#888; font-size:0.8rem; }
  .st-props { margin-top:10px; font-family:monospace; font-size:0.78rem; color:#ce9178;
    background:#0d1117; padding:8px 10px; border-radius:6px; line-height:1.7; }
</style>
<div class="st-demo">
  <div id="st-caja"></div>
  <div class="st-sliders">
    <div class="st-row"><span class="st-lbl" style="color:#e74c3c">R</span>
      <input type="range" id="st-r" min="0" max="255" value="74">
      <span class="st-val" id="st-rv">74</span></div>
    <div class="st-row"><span class="st-lbl" style="color:#2ecc71">G</span>
      <input type="range" id="st-g" min="0" max="255" value="144">
      <span class="st-val" id="st-gv">144</span></div>
    <div class="st-row"><span class="st-lbl" style="color:#3498db">B</span>
      <input type="range" id="st-b" min="0" max="255" value="226">
      <span class="st-val" id="st-bv">226</span></div>
  </div>
</div>
<div class="st-props" id="st-code">caja.style.backgroundColor = "rgb(74, 144, 226)";</div>`;
          const caja = result.querySelector('#st-caja');
          const [r,g,b] = [result.querySelector('#st-r'), result.querySelector('#st-g'), result.querySelector('#st-b')];
          const [rv,gv,bv] = [result.querySelector('#st-rv'), result.querySelector('#st-gv'), result.querySelector('#st-bv')];
          const code = result.querySelector('#st-code');
          function upd() {
            rv.textContent = r.value; gv.textContent = g.value; bv.textContent = b.value;
            caja.style.backgroundColor = `rgb(${r.value},${g.value},${b.value})`;
            code.textContent = `caja.style.backgroundColor = "rgb(${r.value}, ${g.value}, ${b.value})";`;
          }
          [r,g,b].forEach(s => s.addEventListener('input', upd));
        },
        variations: [
          { title: 'Cambiar estilo al hacer hover (con JS)', code: `const card = document.getElementById('card');

card.addEventListener('mouseover', () => {
  card.style.transform = 'translateY(-4px)';
  card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
});

card.addEventListener('mouseout', () => {
  card.style.transform = 'none';
  card.style.boxShadow = 'none';
});` },
          { title: 'Mover un elemento con posición', code: `const caja = document.getElementById('caja');
// La caja debe tener position: absolute o relative
let x = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    x += 10;
    caja.style.left = x + 'px';
  }
});` },
        ],
      },

      {
        id: 'classlist',
        icon: '🏷️',
        name: 'classList',
        tagline: 'Agregar, quitar y alternar clases CSS con JavaScript',
        whatis: `<p><code>classList</code> es la forma elegante de gestionar las clases de un elemento. En vez de cambiar estilos uno por uno, defines los estilos en CSS y luego los <em>activas</em> o <em>desactivas</em> desde JS.</p>
<p>Así el CSS queda en CSS y el JS en JS — separación limpia de responsabilidades.</p>`,
        syntax: [
          {
            label: 'Métodos principales',
            code: `const el = document.getElementById('caja');

el.classList.add('activo');       // agrega la clase
el.classList.remove('activo');    // quita la clase
el.classList.toggle('activo');    // agrega si no está, quita si está
el.classList.contains('activo');  // true/false — ¿tiene la clase?
el.classList.replace('viejo','nuevo'); // reemplaza`,
          },
          {
            label: 'Toggle — el patrón más usado',
            code: `// CSS tiene el estilo "oscuro" definido
// JS solo activa/desactiva la clase

const btn  = document.getElementById('btnTema');
const body = document.body;

btn.addEventListener('click', () => {
  body.classList.toggle('modo-oscuro');
  btn.textContent = body.classList.contains('modo-oscuro')
    ? '☀️ Modo claro'
    : '🌙 Modo oscuro';
});`,
          },
          {
            label: 'Múltiples clases',
            code: `const card = document.getElementById('card');

// Agregar varias a la vez
card.classList.add('visible', 'destacada', 'animada');

// Quitar varias a la vez
card.classList.remove('oculta', 'gris');

// Ver todas las clases actuales
console.log(card.className); // "visible destacada animada"`,
          },
        ],
        demoCode: `const tarjeta = document.getElementById('tarjeta');

// Toggle cambia el "estado" de la tarjeta
document.getElementById('btnToggle')
  .addEventListener('click', () => {
    tarjeta.classList.toggle('activo');
  });

// También podemos agregar/quitar
document.getElementById('btnGrande')
  .addEventListener('click', () => {
    tarjeta.classList.toggle('grande');
  });`,
        init(result) {
          result.innerHTML = `
<style>
  .cl-wrap { display:flex; flex-direction:column; align-items:center; gap:16px; }
  #cl-card { width:180px; padding:20px; border-radius:12px; text-align:center;
    background:#e8f0fe; color:#1a237e; border:2px solid #4a90e2;
    transition:all 0.35s; font-weight:bold; }
  #cl-card.activo { background:#1a237e; color:white; border-color:#90caf9;
    transform:scale(1.05); box-shadow:0 8px 24px rgba(26,35,126,0.4); }
  #cl-card.grande { width:220px; font-size:1.2rem; }
  #cl-card.redondeado { border-radius:50px; }
  .cl-btns { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
  .cl-btn { padding:6px 14px; border:1px solid #444; border-radius:6px; background:#21262d;
    color:#e6edf3; cursor:pointer; font-size:0.82rem; }
  .cl-btn:hover { border-color:#d2a8ff; color:#d2a8ff; }
  #cl-log { font-family:monospace; font-size:0.78rem; color:#9cdcfe;
    background:#0d1117; padding:8px 12px; border-radius:6px; width:100%; box-sizing:border-box; min-height:22px; }
</style>
<div class="cl-wrap">
  <div id="cl-card">Tarjeta de prueba</div>
  <div class="cl-btns">
    <button class="cl-btn" data-cl="toggle" data-c="activo">toggle('activo')</button>
    <button class="cl-btn" data-cl="toggle" data-c="grande">toggle('grande')</button>
    <button class="cl-btn" data-cl="toggle" data-c="redondeado">toggle('redondeado')</button>
    <button class="cl-btn" data-cl="clear">↺ Limpiar</button>
  </div>
  <div id="cl-log">classList: (vacío)</div>
</div>`;
          const card = result.querySelector('#cl-card');
          const log  = result.querySelector('#cl-log');
          function updateLog() { log.textContent = 'classList: ' + (card.className || '(vacío)'); }
          result.querySelectorAll('[data-cl="toggle"]').forEach(btn => {
            btn.addEventListener('click', () => { card.classList.toggle(btn.dataset.c); updateLog(); });
          });
          result.querySelector('[data-cl="clear"]').addEventListener('click', () => { card.className = ''; updateLog(); });
        },
        variations: [
          { title: 'Modo oscuro con classList', code: `const btnTema = document.getElementById('btnTema');

btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    btnTema.textContent = '☀️ Modo claro';
  } else {
    btnTema.textContent = '🌙 Modo oscuro';
  }
});` },
          { title: 'Menú activo — marcar el item seleccionado', code: `const items = document.querySelectorAll('.menu-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    // Quitar 'activo' de todos
    items.forEach(i => i.classList.remove('activo'));
    // Poner 'activo' solo en el clickeado
    item.classList.add('activo');
  });
});` },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // SECCIÓN 4 · NIVEL 4
  // ──────────────────────────────────────────
  {
    id: 'sec4', title: 'Nivel 4: Eventos y Lógica', icon: '⚡', color: '#e3b341',
    topics: [

      {
        id: 'condicionales',
        icon: '🔀',
        name: 'if · else · else if',
        tagline: 'Tomar decisiones en el código según condiciones',
        whatis: `<p>Los condicionales permiten que el código tome <strong>caminos diferentes</strong> según una condición. Son fundamentales para validar datos, controlar acceso, mostrar mensajes personalizados y mucho más.</p>`,
        syntax: [
          {
            label: 'if / else básico',
            code: `const edad = 18;

if (edad >= 18) {
  console.log('Mayor de edad');
} else {
  console.log('Menor de edad');
}

// Con una sola línea (sin llaves — solo si es simple):
if (edad >= 18) console.log('Mayor de edad');`,
          },
          {
            label: 'else if — múltiples condiciones',
            code: `const nota = 75;

if (nota >= 90) {
  mensaje.textContent = '¡Excelente! 🏆';
} else if (nota >= 70) {
  mensaje.textContent = 'Aprobado ✓';
} else if (nota >= 50) {
  mensaje.textContent = 'Suficiente';
} else {
  mensaje.textContent = 'Reprobado ✗';
}`,
          },
          {
            label: 'Operadores de comparación',
            code: `// Igualdad estricta (siempre usa ===, no ==)
'5' === 5   // false (diferente tipo)
'5' ==  5   // true  (inseguro, evitar)

// Comparaciones
a >  b   // mayor que
a >= b   // mayor o igual
a <  b   // menor que
a <= b   // menor o igual
a !== b  // diferente

// Lógicos
a && b   // Y — ambos deben ser true
a || b   // O — basta con uno
!a       // NO — invierte el valor`,
          },
        ],
        demoCode: `const input = document.getElementById('password');
const barra = document.getElementById('barra');
const texto = document.getElementById('texto');

input.addEventListener('input', function() {
  const pass = input.value;
  let fuerza = 0;

  if (pass.length >= 6) fuerza++;
  if (/[A-Z]/.test(pass))  fuerza++;
  if (/[0-9]/.test(pass))  fuerza++;
  if (/[^A-Za-z0-9]/.test(pass)) fuerza++;

  if (fuerza <= 1) { /* débil */ }
  else if (fuerza === 2) { /* media */ }
  else { /* fuerte */ }
});`,
        init(result) {
          result.innerHTML = `
<style>
  .if-label { font-size:0.8rem; color:#8b949e; margin-bottom:4px; }
  #if-inp { width:100%; padding:10px 14px; background:#161b22; border:2px solid #30363d;
    border-radius:8px; color:white; font-size:1rem; outline:none; box-sizing:border-box; }
  #if-inp:focus { border-color:#e3b341; }
  .if-bar-wrap { margin-top:10px; background:#21262d; border-radius:4px; height:8px; overflow:hidden; }
  #if-bar { height:100%; width:0%; border-radius:4px; transition:all 0.3s; }
  #if-msg { margin-top:8px; font-size:0.9rem; font-weight:600; min-height:22px; }
  .if-checks { margin-top:10px; display:flex; flex-direction:column; gap:4px; }
  .if-check { font-size:0.78rem; display:flex; gap:6px; align-items:center; }
  .if-dot { width:10px; height:10px; border-radius:50%; background:#30363d; flex-shrink:0; transition:background 0.2s; }
  .if-dot.ok { background:#3fb950; }
</style>
<div class="if-label">Escribe una contraseña y observa la lógica if/else:</div>
<input id="if-inp" type="text" placeholder="Escribe una contraseña...">
<div class="if-bar-wrap"><div id="if-bar"></div></div>
<div id="if-msg"></div>
<div class="if-checks">
  <div class="if-check"><div class="if-dot" id="if-d1"></div> 6 o más caracteres</div>
  <div class="if-check"><div class="if-dot" id="if-d2"></div> Una letra mayúscula</div>
  <div class="if-check"><div class="if-dot" id="if-d3"></div> Un número</div>
  <div class="if-check"><div class="if-dot" id="if-d4"></div> Un símbolo (!@#$...)</div>
</div>`;
          const inp = result.querySelector('#if-inp');
          const bar = result.querySelector('#if-bar');
          const msg = result.querySelector('#if-msg');
          const dots = [1,2,3,4].map(i => result.querySelector('#if-d'+i));
          const niveles = [
            { color:'#e74c3c', label:'Muy débil 🔴', pct:'20%' },
            { color:'#e67e22', label:'Débil 🟠',     pct:'40%' },
            { color:'#e3b341', label:'Media 🟡',      pct:'65%' },
            { color:'#3fb950', label:'Fuerte 🟢',     pct:'100%'},
          ];
          inp.addEventListener('input', () => {
            const p = inp.value;
            const conds = [p.length >= 6, /[A-Z]/.test(p), /[0-9]/.test(p), /[^A-Za-z0-9]/.test(p)];
            const score = conds.filter(Boolean).length;
            dots.forEach((d,i) => d.classList.toggle('ok', conds[i]));
            if (!p) { bar.style.width='0'; msg.textContent=''; return; }
            const n = niveles[Math.max(0, score-1)];
            bar.style.width = n.pct; bar.style.background = n.color;
            msg.style.color = n.color; msg.textContent = n.label;
          });
        },
        variations: [
          { title: 'Validar formulario con if/else', code: `function validar() {
  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();
  const msg    = document.getElementById('mensaje');

  if (nombre === '') {
    msg.textContent = '❌ El nombre es obligatorio';
    return; // detiene la función
  }

  if (!email.includes('@')) {
    msg.textContent = '❌ Email inválido';
    return;
  }

  msg.textContent = '✅ Formulario válido';
}` },
          { title: 'Operador ternario — if/else en una línea', code: `const edad = 20;

// Ternario: condición ? siTrue : siFalse
const mensaje = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';

// Equivale a:
// let mensaje;
// if (edad >= 18) { mensaje = 'Mayor de edad'; }
// else            { mensaje = 'Menor de edad'; }` },
        ],
      },

      {
        id: 'for-foreach',
        icon: '🔄',
        name: 'for · forEach · querySelectorAll',
        tagline: 'Repetir acciones y trabajar con múltiples elementos',
        whatis: `<p>Los bucles permiten repetir código sin copiar y pegar. <code>forEach</code> es el más usado para colecciones de elementos del DOM porque es más limpio que un <code>for</code> clásico.</p>`,
        syntax: [
          {
            label: 'forEach con querySelectorAll',
            code: `// Seleccionar todos los botones
const botones = document.querySelectorAll('.btn');

// forEach ejecuta la función una vez por elemento
botones.forEach(function(boton) {
  boton.addEventListener('click', function() {
    boton.style.background = 'green';
  });
});

// Con arrow function (más corto):
botones.forEach(btn => btn.style.color = 'white');`,
          },
          {
            label: 'for clásico',
            code: `const items = document.querySelectorAll('li');

for (let i = 0; i < items.length; i++) {
  // i es el índice: 0, 1, 2...
  items[i].textContent = 'Item #' + (i + 1);
}

// for...of (moderno, más legible)
for (const item of items) {
  item.classList.add('procesado');
}`,
          },
          {
            label: 'Filtrar elementos',
            code: `const tarjetas = document.querySelectorAll('.tarjeta');

// Convertir a Array para usar .filter()
const activas = Array.from(tarjetas)
  .filter(t => t.classList.contains('activa'));

// Mostrar solo las activas
activas.forEach(t => t.style.display = 'block');`,
          },
        ],
        demoCode: `const items = document.querySelectorAll('.item');
const btnResaltar = document.getElementById('btnResaltar');
const btnLimpiar  = document.getElementById('btnLimpiar');

btnResaltar.addEventListener('click', () => {
  items.forEach((item, indice) => {
    // El índice empieza en 0
    const tono = indice * 40;
    item.style.background =
      'hsl(' + tono + ', 60%, 40%)';
  });
});

btnLimpiar.addEventListener('click', () => {
  items.forEach(item => item.style.background = '');
});`,
        init(result) {
          result.innerHTML = `
<style>
  .fe-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-bottom:10px; }
  .fe-item { padding:12px; border-radius:8px; background:#21262d; text-align:center;
    font-size:0.82rem; transition:all 0.3s; border:1px solid #30363d; cursor:pointer; }
  .fe-btns { display:flex; gap:8px; flex-wrap:wrap; }
  .fe-btn { padding:7px 14px; border:1px solid #444; border-radius:6px; background:#161b22;
    color:#e6edf3; cursor:pointer; font-size:0.8rem; }
  #fe-log { margin-top:8px; font-size:0.78rem; color:#8b949e; min-height:18px; }
</style>
<div class="fe-grid" id="fe-grid">
  ${[1,2,3,4,5,6].map(i=>`<div class="fe-item" data-i="${i}">Item ${i}</div>`).join('')}
</div>
<div class="fe-btns">
  <button class="fe-btn" data-act="color">forEach → colores</button>
  <button class="fe-btn" data-act="index">forEach → índices</button>
  <button class="fe-btn" data-act="click">Haz clic en items</button>
  <button class="fe-btn" data-act="reset">↺ Reset</button>
</div>
<div id="fe-log"></div>`;
          const items = result.querySelectorAll('.fe-item');
          const log   = result.querySelector('#fe-log');
          items.forEach((item, i) => {
            item.addEventListener('click', () => {
              item.classList.toggle('selec');
              item.style.border = item.classList.contains('selec') ? '2px solid white' : '1px solid #30363d';
              log.textContent = `Clic en Item ${i+1} (índice ${i})`;
            });
          });
          result.querySelector('[data-act="color"]').addEventListener('click', () => {
            items.forEach((item, i) => { item.style.background = `hsl(${i*40},60%,35%)`; item.style.color='white'; });
            log.textContent = 'forEach aplicó un color diferente a cada item (hsl con índice)';
          });
          result.querySelector('[data-act="index"]').addEventListener('click', () => {
            items.forEach((item, i) => { item.textContent = `Índice: ${i}`; });
            log.textContent = 'forEach actualizó el texto de cada item con su índice';
          });
          result.querySelector('[data-act="click"]').addEventListener('click', () => {
            log.textContent = 'Ahora haz clic en cualquier item para seleccionarlo';
          });
          result.querySelector('[data-act="reset"]').addEventListener('click', () => {
            items.forEach((item, i) => { item.style.background=''; item.style.color=''; item.style.border=''; item.textContent=`Item ${i+1}`; item.classList.remove('selec'); });
            log.textContent = 'Todos los items reseteados';
          });
        },
        variations: [
          { title: 'Contar elementos y mostrar resultado', code: `const completadas = document.querySelectorAll('.tarea.hecha');
const total = document.querySelectorAll('.tarea');
const info  = document.getElementById('progreso');

info.textContent = completadas.length + ' de ' + total.length + ' completadas';` },
          { title: 'Buscar y filtrar elementos', code: `const input   = document.getElementById('busqueda');
const tarjetas = document.querySelectorAll('.tarjeta');

input.addEventListener('input', () => {
  const texto = input.value.toLowerCase();

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.textContent.toLowerCase();
    tarjeta.style.display = nombre.includes(texto) ? '' : 'none';
  });
});` },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // SECCIÓN 5 · NIVEL 5
  // ──────────────────────────────────────────
  {
    id: 'sec5', title: 'Nivel 5: Animaciones y Efectos', icon: '✨', color: '#f78166',
    topics: [

      {
        id: 'animations',
        icon: '🎬',
        name: 'CSS @keyframes + JS',
        tagline: 'Activar animaciones CSS desde JavaScript',
        whatis: `<p>Las animaciones se definen en CSS con <code>@keyframes</code>, pero JS decide <em>cuándo</em> activarlas agregando o quitando clases. Esta separación mantiene el código limpio.</p>
<p>También puedes controlar animaciones directamente con <code>style.animation</code>.</p>`,
        syntax: [
          {
            label: 'Definir en CSS, activar desde JS',
            code: `/* CSS: define la animación */
@keyframes rebotar {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-30px); }
}

.animando {
  animation: rebotar 0.6s ease-in-out infinite;
}

/* JS: agrega/quita la clase */
const pelota = document.getElementById('pelota');

boton.addEventListener('click', () => {
  pelota.classList.toggle('animando');
});`,
          },
          {
            label: 'Animaciones CSS disponibles',
            code: `/* Propiedades de la animación */
.elemento {
  animation-name:            rebotar;     /* nombre del @keyframes */
  animation-duration:        1s;          /* duración */
  animation-timing-function: ease-in-out; /* velocidad */
  animation-iteration-count: infinite;    /* repeticiones */
  animation-delay:           0.5s;        /* espera inicial */
  animation-direction:       alternate;   /* dirección */
  animation-fill-mode:       forwards;    /* estado final */

  /* Shorthand (todo en una línea): */
  animation: rebotar 1s ease-in-out infinite;
}`,
          },
          {
            label: 'Transiciones (transition)',
            code: `/* Las transiciones animan cambios de estado */
.boton {
  background: blue;
  /* Anima cualquier cambio de propiedad en 0.3s */
  transition: all 0.3s ease;
}

.boton:hover {
  background: darkblue;  /* Se anima suavemente */
  transform: scale(1.05);
}

/* Desde JS — la transición se aplica automáticamente */
boton.style.background = 'green'; /* ← se anima si tiene transition */`,
          },
        ],
        demoCode: `const el = document.getElementById('elemento');

// Toggle de la clase activa la animación CSS
document.getElementById('btnRebotar').addEventListener('click', () => {
  el.classList.toggle('anim-rebotar');
});

document.getElementById('btnGirar').addEventListener('click', () => {
  el.classList.toggle('anim-girar');
});

document.getElementById('btnPulsar').addEventListener('click', () => {
  el.classList.toggle('anim-pulsar');
});`,
        init(result) {
          result.innerHTML = `
<style>
  @keyframes an-rebotar { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.1)} }
  @keyframes an-girar   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
  @keyframes an-pulsar  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:0.7} }
  @keyframes an-sacudir { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
  .anim-rebotar { animation: an-rebotar 0.6s ease-in-out infinite; }
  .anim-girar   { animation: an-girar   1s linear infinite; }
  .anim-pulsar  { animation: an-pulsar  0.8s ease-in-out infinite; }
  .anim-sacudir { animation: an-sacudir 0.4s ease-in-out infinite; }
  .an-stage { display:flex; justify-content:center; align-items:center; height:110px; margin-bottom:14px; }
  #an-el { width:72px; height:72px; border-radius:14px; background:linear-gradient(135deg,#f78166,#da3633);
    display:flex;align-items:center;justify-content:center;font-size:1.8rem; }
  .an-btns { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
  .an-btn { padding:7px 14px; border:1px solid #444; border-radius:6px; background:#21262d;
    color:#f78166; cursor:pointer; font-size:0.8rem; font-weight:600; }
  .an-btn.on { background:#f78166; color:#0d1117; border-color:#f78166; }
  #an-log { margin-top:10px; text-align:center; font-size:0.78rem; color:#6a9955; min-height:18px; }
</style>
<div class="an-stage"><div id="an-el">🎮</div></div>
<div class="an-btns">
  <button class="an-btn" data-anim="rebotar">⬆ Rebotar</button>
  <button class="an-btn" data-anim="girar">↻ Girar</button>
  <button class="an-btn" data-anim="pulsar">💓 Pulsar</button>
  <button class="an-btn" data-anim="sacudir">↔ Sacudir</button>
  <button class="an-btn" data-reset="1">✕ Detener todo</button>
</div>
<div id="an-log"></div>`;
          const el  = result.querySelector('#an-el');
          const log = result.querySelector('#an-log');
          result.querySelectorAll('[data-anim]').forEach(btn => {
            btn.addEventListener('click', () => {
              const cls = 'anim-' + btn.dataset.anim;
              el.classList.toggle(cls);
              btn.classList.toggle('on', el.classList.contains(cls));
              log.textContent = el.classList.contains(cls)
                ? `Clase "${cls}" agregada → animación activa`
                : `Clase "${cls}" removida → animación detenida`;
            });
          });
          result.querySelector('[data-reset]').addEventListener('click', () => {
            el.className = '';
            result.querySelectorAll('.an-btn').forEach(b => b.classList.remove('on'));
            log.textContent = 'Todas las animaciones detenidas (classList vacío)';
          });
        },
        variations: [
          { title: 'Animación una sola vez (sin infinite)', code: `const el = document.getElementById('elemento');

boton.addEventListener('click', () => {
  el.classList.add('sacudir');

  // Quitar la clase cuando termine la animación
  el.addEventListener('animationend', () => {
    el.classList.remove('sacudir');
  }, { once: true }); // once:true → se auto-elimina
});` },
          { title: 'Transition con transform y opacity', code: `/* CSS */
.tarjeta {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s, transform 0.4s;
}
.tarjeta.oculta {
  opacity: 0;
  transform: translateY(20px);
}

/* JS */
document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('tarjeta').classList.toggle('oculta');
});` },
        ],
      },

      {
        id: 'movement',
        icon: '🕹️',
        name: 'Posición y Movimiento',
        tagline: 'Mover elementos con style.left, style.top y transform',
        whatis: `<p>Para mover elementos en la pantalla necesitas que tengan <code>position: absolute</code> o <code>relative</code>. Luego controlas su posición cambiando <code>left</code>, <code>top</code>, o usando <code>transform: translate()</code>.</p>`,
        syntax: [
          {
            label: 'Mover con left / top',
            code: `/* CSS necesario */
#caja {
  position: absolute; /* o relative */
  left: 0px;
  top: 0px;
}

/* JS — mover la caja */
const caja = document.getElementById('caja');
let x = 0, y = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') x += 10;
  if (e.key === 'ArrowLeft')  x -= 10;
  if (e.key === 'ArrowDown')  y += 10;
  if (e.key === 'ArrowUp')    y -= 10;

  caja.style.left = x + 'px';
  caja.style.top  = y + 'px';
});`,
          },
          {
            label: 'Mover con transform (recomendado)',
            code: `/* transform es más eficiente que left/top
   porque no causa reflow del layout */
const caja = document.getElementById('caja');
let x = 0, y = 0;

boton.addEventListener('click', () => {
  x += 20;
  caja.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
});

/* Con transition se anima suavemente */
// CSS: .caja { transition: transform 0.2s ease; }`,
          },
        ],
        demoCode: `const caja = document.getElementById('caja');
let x = 100, y = 70;

function mover(dx, dy) {
  x += dx;
  y += dy;
  caja.style.left = x + 'px';
  caja.style.top  = y + 'px';
}

document.getElementById('arriba').addEventListener('click',  () => mover(0, -20));
document.getElementById('abajo').addEventListener('click',   () => mover(0,  20));
document.getElementById('izq').addEventListener('click',    () => mover(-20, 0));
document.getElementById('der').addEventListener('click',    () => mover( 20, 0));`,
        init(result) {
          result.innerHTML = `
<style>
  .mv-arena { position:relative; width:100%; height:170px; background:#0d1117;
    border-radius:10px; border:1px solid #30363d; overflow:hidden; margin-bottom:12px; }
  #mv-caja { position:absolute; left:100px; top:55px; width:56px; height:56px;
    background:linear-gradient(135deg,#58a6ff,#1f6feb); border-radius:10px;
    display:flex;align-items:center;justify-content:center;font-size:1.4rem;
    transition:left 0.12s, top 0.12s; user-select:none; }
  #mv-pos { position:absolute; top:6px; left:8px; font-size:0.72rem; font-family:monospace; color:#484f58; }
  .mv-pad { display:grid; grid-template-columns:repeat(3,40px); gap:5px; justify-content:center; }
  .mv-btn { width:40px; height:40px; background:#21262d; border:1px solid #30363d;
    border-radius:7px; color:#e6edf3; font-size:1rem; cursor:pointer; }
  .mv-btn:hover { background:#30363d; }
</style>
<div class="mv-arena">
  <div id="mv-caja">📦</div>
  <div id="mv-pos">x: 100  y: 55</div>
</div>
<div class="mv-pad">
  <div></div><button class="mv-btn" id="mv-up">↑</button><div></div>
  <button class="mv-btn" id="mv-left">←</button>
  <button class="mv-btn" id="mv-down">↓</button>
  <button class="mv-btn" id="mv-right">→</button>
</div>`;
          const caja = result.querySelector('#mv-caja');
          const pos  = result.querySelector('#mv-pos');
          let x = 100, y = 55;
          const arena = result.querySelector('.mv-arena');
          function mover(dx, dy) {
            x = Math.max(0, Math.min(arena.offsetWidth - 56, x + dx));
            y = Math.max(0, Math.min(arena.offsetHeight - 56, y + dy));
            caja.style.left = x + 'px';
            caja.style.top  = y + 'px';
            pos.textContent = `x: ${x}  y: ${y}  →  style.left="${x}px"  style.top="${y}px"`;
          }
          result.querySelector('#mv-up').addEventListener('click',    () => mover(0, -20));
          result.querySelector('#mv-down').addEventListener('click',  () => mover(0,  20));
          result.querySelector('#mv-left').addEventListener('click',  () => mover(-20, 0));
          result.querySelector('#mv-right').addEventListener('click', () => mover( 20, 0));
        },
        variations: [
          { title: 'Mover con teclado (keydown)', code: `const caja = document.getElementById('caja');
let x = 0, y = 0;

document.addEventListener('keydown', (e) => {
  // Prevenir scroll de la página
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }

  const paso = 10;
  if (e.key === 'ArrowRight') x += paso;
  if (e.key === 'ArrowLeft')  x -= paso;
  if (e.key === 'ArrowDown')  y += paso;
  if (e.key === 'ArrowUp')    y -= paso;

  caja.style.left = x + 'px';
  caja.style.top  = y + 'px';
});` },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // SECCIÓN 6 · NIVEL 6
  // ──────────────────────────────────────────
  {
    id: 'sec6', title: 'Nivel 6: Componentes Dinámicos', icon: '🚀', color: '#58a6ff',
    topics: [

      {
        id: 'innerhtml',
        icon: '🧩',
        name: 'innerHTML + Template Strings',
        tagline: 'Generar HTML complejo dinámicamente con JavaScript',
        whatis: `<p><code>innerHTML</code> permite insertar HTML completo (con etiquetas, clases, etc.) en un elemento. Combinado con los <em>template strings</em> de JavaScript (backtick), puedes generar componentes completos de forma elegante.</p>`,
        syntax: [
          {
            label: 'innerHTML básico',
            code: `const contenedor = document.getElementById('app');

contenedor.innerHTML = '<h2>Título</h2><p>Párrafo</p>';

// Agregar sin reemplazar (usa +=)
contenedor.innerHTML += '<p>Otro párrafo</p>';

// Limpiar el contenedor
contenedor.innerHTML = '';`,
          },
          {
            label: 'Template Strings (backtick)',
            code: `const nombre = 'Ana';
const edad   = 25;
const rol    = 'Desarrolladora';

// Con comillas normales (incómodo):
const html1 = '<div><h3>' + nombre + '</h3><p>' + rol + '</p></div>';

// Con template string ` + '`' + ` (moderno y legible):
const html2 = \`
  <div class="tarjeta">
    <h3>\${nombre}</h3>
    <p>\${rol} · \${edad} años</p>
  </div>
\`;

contenedor.innerHTML = html2;`,
          },
          {
            label: 'Generar listas con map()',
            code: `const frutas = ['🍎 Manzana', '🍌 Banana', '🍇 Uva'];

const lista = document.getElementById('lista');

// map() transforma cada elemento del array en HTML
lista.innerHTML = frutas
  .map(fruta => \`<li>\${fruta}</li>\`)
  .join('');

// Resultado:
// <li>🍎 Manzana</li>
// <li>🍌 Banana</li>
// <li>🍇 Uva</li>`,
          },
        ],
        demoCode: `const form   = document.getElementById('form');
const grid   = document.getElementById('grid');
const btnAdd = document.getElementById('btnAgregar');

btnAgregar.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const rol    = document.getElementById('rol').value;
  const color  = document.getElementById('color').value;
  if (!nombre) return;

  const inicial = nombre[0].toUpperCase();

  grid.innerHTML += \`
    <div class="card">
      <div class="avatar" style="background:\${color}">\${inicial}</div>
      <strong>\${nombre}</strong>
      <span>\${rol}</span>
    </div>
  \`;
});`,
        init(result) {
          result.innerHTML = `
<style>
  .ih-form { display:flex; flex-direction:column; gap:8px; margin-bottom:12px; }
  .ih-row { display:flex; gap:8px; }
  .ih-inp { flex:1; padding:8px 12px; background:#161b22; border:2px solid #30363d;
    border-radius:8px; color:white; font-size:0.85rem; outline:none; }
  .ih-inp:focus { border-color:#58a6ff; }
  #ih-add { padding:8px 16px; background:#1f6feb; color:white; border:none;
    border-radius:8px; cursor:pointer; font-weight:bold; white-space:nowrap; }
  #ih-grid { display:flex; flex-wrap:wrap; gap:10px; }
  .ih-card { background:#21262d; border-radius:10px; padding:14px; text-align:center;
    width:100px; display:flex; flex-direction:column; align-items:center; gap:6px;
    animation:aparecer 0.25s ease; border:1px solid #30363d; }
  @keyframes aparecer{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:none}}
  .ih-ava { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;
    justify-content:center;font-size:1.3rem;font-weight:800;color:white; }
  .ih-card strong { font-size:0.8rem; color:#e6edf3; }
  .ih-card span { font-size:0.7rem; color:#8b949e; }
</style>
<div class="ih-form">
  <div class="ih-row">
    <input class="ih-inp" id="ih-nom" placeholder="Nombre...">
    <input class="ih-inp" id="ih-rol" placeholder="Rol...">
    <input type="color" id="ih-col" value="#58a6ff" style="width:36px;height:36px;border:none;border-radius:6px;cursor:pointer;flex-shrink:0;">
    <button id="ih-add">+</button>
  </div>
</div>
<div id="ih-grid"></div>`;
          const nom  = result.querySelector('#ih-nom');
          const rol  = result.querySelector('#ih-rol');
          const col  = result.querySelector('#ih-col');
          const grid = result.querySelector('#ih-grid');
          result.querySelector('#ih-add').addEventListener('click', () => {
            const n = nom.value.trim();
            if (!n) return;
            const card = document.createElement('div');
            card.className = 'ih-card';
            card.innerHTML = `<div class="ih-ava" style="background:${col.value}">${n[0].toUpperCase()}</div><strong>${n}</strong><span>${rol.value || 'Sin rol'}</span>`;
            grid.appendChild(card);
            nom.value = ''; rol.value = ''; nom.focus();
          });
          nom.addEventListener('keydown', e => { if(e.key==='Enter') result.querySelector('#ih-add').click(); });
        },
        variations: [
          { title: 'Lista dinámica desde un array', code: `const productos = [
  { nombre: 'Laptop',  precio: 1200 },
  { nombre: 'Mouse',   precio: 25 },
  { nombre: 'Teclado', precio: 80 },
];

const lista = document.getElementById('lista');

lista.innerHTML = productos
  .map(p => \`
    <div class="producto">
      <span>\${p.nombre}</span>
      <strong>$\${p.precio}</strong>
    </div>
  \`)
  .join('');` },
          { title: 'Tabla dinámica', code: `const datos = [
  { nombre: 'Ana', nota: 90 },
  { nombre: 'Carlos', nota: 75 },
];

const tabla = document.getElementById('tabla');

tabla.innerHTML = \`
  <tr><th>Nombre</th><th>Nota</th></tr>
  \${datos.map(d => \`
    <tr>
      <td>\${d.nombre}</td>
      <td>\${d.nota}</td>
    </tr>
  \`).join('')}
\`;` },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// MOTOR DEL TUTORIAL
// ─────────────────────────────────────────────

(function initTutorial() {
  // Recolectar todos los topics en un array plano para navegación prev/next
  const ALL_TOPICS = [];
  TUTORIAL_SECTIONS.forEach(sec => sec.topics.forEach(t => ALL_TOPICS.push({ sec, topic: t })));

  let currentTopicIndex = -1;

  // ── Construir sidebar ──
  function buildSidebar() {
    const list = document.getElementById('tut-topic-list');
    if (!list) return;
    list.innerHTML = '';
    TUTORIAL_SECTIONS.forEach(sec => {
      const secEl = document.createElement('div');
      secEl.className = 'tut-sec';
      secEl.innerHTML = `<div class="tut-sec-title" style="color:${sec.color}">${sec.icon} ${sec.title}</div>`;
      sec.topics.forEach(topic => {
        const btn = document.createElement('button');
        btn.className = 'tut-topic-btn';
        btn.dataset.id = topic.id;
        btn.textContent = topic.icon + ' ' + topic.name;
        btn.addEventListener('click', () => loadTopic(topic.id));
        secEl.appendChild(btn);
      });
      list.appendChild(secEl);
    });
  }

  // ── Cargar un tema ──
  function loadTopic(id) {
    const idx = ALL_TOPICS.findIndex(t => t.topic.id === id);
    if (idx === -1) return;
    currentTopicIndex = idx;
    const { sec, topic } = ALL_TOPICS[idx];

    // Marcar sidebar
    document.querySelectorAll('.tut-topic-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-id="${id}"]`);
    if (activeBtn) { activeBtn.classList.add('active'); activeBtn.scrollIntoView({ block: 'nearest' }); }

    // Mostrar contenido
    document.getElementById('tut-home').classList.add('hidden');
    const content = document.getElementById('tut-content');
    content.classList.remove('hidden');

    // Header
    document.getElementById('tut-topic-icon').textContent = topic.icon;
    document.getElementById('tut-topic-icon').style.background = sec.color + '22';
    document.getElementById('tut-topic-icon').style.color      = sec.color;
    document.getElementById('tut-topic-name').textContent    = topic.name;
    document.getElementById('tut-topic-name').style.color    = sec.color;
    document.getElementById('tut-topic-tagline').textContent = topic.tagline;

    // ¿Qué es?
    document.getElementById('tut-whatis').innerHTML = topic.whatis;

    // Sintaxis — tabs
    const tabsEl   = document.getElementById('tut-syntax-tabs');
    const blocksEl = document.getElementById('tut-syntax-blocks');
    tabsEl.innerHTML = ''; blocksEl.innerHTML = '';
    topic.syntax.forEach((s, i) => {
      const tab = document.createElement('button');
      tab.className = 'tut-stab' + (i === 0 ? ' active' : '');
      tab.textContent = s.label;
      tab.addEventListener('click', () => {
        tabsEl.querySelectorAll('.tut-stab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        blocksEl.querySelectorAll('.tut-sblock').forEach((b, bi) => b.classList.toggle('hidden', bi !== i));
      });
      tabsEl.appendChild(tab);

      const block = document.createElement('pre');
      block.className = 'tut-sblock code-highlight' + (i === 0 ? '' : ' hidden');
      block.innerHTML = (typeof highlightJS === 'function') ? highlightJS(s.code) : s.code;
      blocksEl.appendChild(block);
    });

    // Demo en vivo
    const demoResult = document.getElementById('tut-demo-result');
    demoResult.innerHTML = '';
    try { topic.init(demoResult); } catch(e) { demoResult.textContent = 'Error al cargar demo: ' + e.message; }

    const demoCode = document.getElementById('tut-demo-code');
    demoCode.innerHTML = (typeof highlightJS === 'function') ? highlightJS(topic.demoCode) : topic.demoCode;

    // Variaciones
    const varEl = document.getElementById('tut-variations');
    varEl.innerHTML = '';
    topic.variations.forEach(v => {
      const wrap = document.createElement('div');
      wrap.className = 'tut-var';
      const pre = document.createElement('pre');
      pre.className = 'tut-var-code code-highlight';
      pre.innerHTML = (typeof highlightJS === 'function') ? highlightJS(v.code) : v.code;
      wrap.innerHTML = `<div class="tut-var-title">${v.title}</div>`;
      wrap.appendChild(pre);
      varEl.appendChild(wrap);
    });

    // Prev / Next
    document.getElementById('tut-btn-prev').disabled = idx === 0;
    document.getElementById('tut-btn-next').disabled = idx === ALL_TOPICS.length - 1;
    document.getElementById('tut-btn-next').textContent = idx === ALL_TOPICS.length - 1 ? '¡Listo para jugar! 🎮' : 'Siguiente →';

    content.scrollTop = 0;
  }

  // ── Navegación prev / next ──
  document.getElementById('tut-btn-prev')?.addEventListener('click', () => {
    if (currentTopicIndex > 0) loadTopic(ALL_TOPICS[currentTopicIndex - 1].topic.id);
  });
  document.getElementById('tut-btn-next')?.addEventListener('click', () => {
    if (currentTopicIndex < ALL_TOPICS.length - 1) {
      loadTopic(ALL_TOPICS[currentTopicIndex + 1].topic.id);
    } else {
      // Último tema → volver al inicio
      if (typeof showScreen === 'function') showScreen('screen-welcome');
    }
  });

  // ── Botón volver: va al mapa si ya jugó, o al inicio si no ──
  document.getElementById('btn-tutorial-back')?.addEventListener('click', () => {
    if (typeof showScreen !== 'function') return;
    const mapScreen = document.getElementById('screen-map');
    const hasPlayer = mapScreen && mapScreen.querySelector('#player-display')?.textContent?.length > 3;
    showScreen(hasPlayer ? 'screen-map' : 'screen-welcome');
  });

  // ── Botón abrir tutorial desde welcome ──
  document.getElementById('btn-open-tutorial')?.addEventListener('click', () => {
    if (typeof showScreen === 'function') {
      showScreen('screen-tutorial');
      window.buildTutorialSidebar();
    }
  });

  // Construir sidebar cuando se inicializa
  document.addEventListener('DOMContentLoaded', buildSidebar);

  // Exponer para que game.js pueda llamarlo desde el mapa
  window.buildTutorialSidebar = function() {
    buildSidebar();
    if (currentTopicIndex === -1) loadTopic(ALL_TOPICS[0].topic.id);
  };
})();
