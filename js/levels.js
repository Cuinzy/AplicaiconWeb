// ============================================================
// WEBCRAFT: DOMINA EL DOM — Niveles y retos
// ============================================================

const LEVELS = [

  // ============================================================
  // NIVEL 1: PRIMER CONTACTO
  // ============================================================
  {
    id: 1, name: 'Primer Contacto', subtitle: 'HTML + JS básico',
    icon: '🔹', color: '#58a6ff',
    challenges: [

      {
        id: '1-1',
        title: 'El Botón Parlanchín',
        mission: `¡Bienvenido a CodeLab! Soy tu mentor CodeMaster. Tu primera misión: el CEO quiere ver que dominas los eventos básicos. Tienes un botón en pantalla... ¡hazlo reaccionar al clic del usuario!`,
        objective: `Cuando el usuario haga clic en el botón, su texto debe cambiar a "¡Listo!"`,
        initialHTML: `<div class="contenedor">
  <button id="miBoton">Haz clic aquí</button>
</div>`,
        initialCSS: `/* Estilos de la página */
body {
  font-family: sans-serif;
  background: #f0f4ff;
}

.contenedor {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

#miBoton {
  padding: 14px 28px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid #4a90e2;
  background: #e8f0fe;
  color: #1a237e;
  transition: all 0.2s;
}

#miBoton:hover {
  background: #4a90e2;
  color: white;
}`,
        initialJS: `// Tu misión: cambiar el texto del botón al hacer clic
// Paso 1: obtén el botón por su id
// Paso 2: agrega un evento 'click'
// Paso 3: dentro del evento, cambia el textContent

`,
        hints: [
          `Usa <code>document.getElementById('miBoton')</code> para obtener el botón.`,
          `Agrega el evento: <code>boton.addEventListener('click', function() { ... })</code>`,
          `Dentro de la función: <code>boton.textContent = '¡Listo!'</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('miBoton');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="miBoton". ¿Lo borraste del HTML?' };
            const original = btn.textContent.trim();
            btn.click();
            const after = btn.textContent.trim();
            if (after !== original && after.length > 0) return { pass: true, msg: '¡El botón reacciona al clic y cambia su texto. Evento "click" dominado!' };
            if (after === original) return { pass: false, msg: 'El texto del botón no cambió después del clic. ¿Pusiste el código dentro del addEventListener?' };
            return { pass: false, msg: 'El botón quedó sin texto. Asigna un valor a textContent dentro del evento.' };
          } catch(e) { return { pass: false, msg: 'Error en tu código: ' + e.message }; }
        },
      },

      {
        id: '1-2',
        title: 'Mensaje en Pantalla',
        mission: `El equipo de marketing pide una herramienta: un botón que muestre un mensaje de bienvenida directamente en la página. ¡Sin alerts, directo en el HTML!`,
        objective: `Al hacer clic en el botón, muestra un mensaje de bienvenida dentro del elemento con id="mensaje"`,
        initialHTML: `<div class="contenedor">
  <button id="btnMostrar">Mostrar Mensaje</button>
  <div id="mensaje"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0fff4;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#btnMostrar {
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 8px;
}

#btnMostrar:hover {
  background: #1b5e20;
}

#mensaje {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2e7d32;
  min-height: 40px;
}`,
        initialJS: `// Haz que al hacer clic en #btnMostrar
// aparezca un mensaje en #mensaje
// Puedes usar cualquier texto de bienvenida

`,
        hints: [
          `Necesitas dos elementos: <code>document.getElementById('btnMostrar')</code> y <code>document.getElementById('mensaje')</code>`,
          `Agrega un evento 'click' al botón.`,
          `Dentro del evento: <code>mensaje.textContent = '¡Bienvenido a CodeLab!'</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnMostrar');
            const msg = doc.getElementById('mensaje');
            if (!btn) return { pass: false, msg: 'No encontré el botón con id="btnMostrar".' };
            if (!msg) return { pass: false, msg: 'No encontré el div con id="mensaje".' };
            btn.click();
            const txt = msg.textContent.trim();
            if (txt.length > 0) return { pass: true, msg: '¡El mensaje aparece en la página al hacer clic! textContent dominado.' };
            return { pass: false, msg: 'Al hacer clic, el div #mensaje sigue vacío. Asigna su textContent dentro del addEventListener.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '1-3',
        title: 'Leer el Input',
        mission: `RRHH quiere una mini-herramienta de saludo. El usuario escribe su nombre y al presionar el botón, el sistema lo saluda personalmente. ¡Aprende a leer inputs!`,
        objective: `Al hacer clic en "Saludar", leer el valor del input y mostrar un saludo personalizado en el párrafo #resultado`,
        initialHTML: `<div class="contenedor">
  <div class="fila">
    <input id="nombre" type="text" placeholder="Escribe tu nombre...">
    <button id="btnSaludar">Saludar</button>
  </div>
  <p id="resultado"></p>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff8e1;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px 20px;
}

.fila {
  display: flex;
  gap: 10px;
}

#nombre {
  padding: 10px 14px;
  font-size: 1rem;
  border: 2px solid #f9a825;
  border-radius: 8px;
  outline: none;
  width: 220px;
}

#nombre:focus {
  border-color: #f57f17;
}

#btnSaludar {
  padding: 10px 20px;
  background: #f9a825;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

#resultado {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e65100;
  min-height: 36px;
}`,
        initialJS: `// Lee el valor del input #nombre
// y muestra un saludo en #resultado
// Pista: input.value te da el texto escrito

`,
        hints: [
          `Obtén el valor del input: <code>const nombre = document.getElementById('nombre').value;</code>`,
          `Agrega un evento 'click' al botón #btnSaludar.`,
          `Muestra el saludo: <code>resultado.textContent = '¡Hola, ' + nombre + '!'</code>`,
        ],
        validate(doc) {
          try {
            const inp = doc.getElementById('nombre');
            const btn = doc.getElementById('btnSaludar');
            const res = doc.getElementById('resultado');
            if (!inp || !btn || !res) return { pass: false, msg: 'Faltan elementos. No borres los ids "nombre", "btnSaludar" o "resultado".' };
            inp.value = 'María';
            btn.click();
            const txt = res.textContent.trim();
            if (txt.includes('María')) return { pass: true, msg: '¡El saludo incluye el nombre del input! Sabes leer input.value.' };
            if (txt.length > 0) return { pass: false, msg: `Se mostró texto pero no incluye el nombre. ¿Estás usando input.value? Resultado: "${txt}"` };
            return { pass: false, msg: 'El párrafo #resultado quedó vacío. Asigna su textContent con el valor del input dentro del evento clic.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 2: MANIPULACIÓN DEL DOM
  // ============================================================
  {
    id: 2, name: 'Manipulación del DOM', subtitle: 'Crear, modificar y eliminar elementos',
    icon: '🔸', color: '#3fb950',
    challenges: [

      {
        id: '2-1',
        title: 'Cambiar Contenido',
        mission: `El equipo de diseño necesita un sistema donde el titular de la página cambie dinámicamente. Domina innerHTML e innerText para modificar el contenido de cualquier elemento.`,
        objective: `Al hacer clic en el botón, cambia el texto del h2 con id="titulo" por uno diferente`,
        initialHTML: `<div class="contenedor">
  <h2 id="titulo">Título Original</h2>
  <button id="cambiar">Cambiar Título</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8f5e9;
}

.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#titulo {
  color: #1a237e;
  font-size: 2rem;
  text-align: center;
  transition: all 0.3s;
}

#cambiar {
  padding: 12px 24px;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

#cambiar:hover {
  background: #0d47a1;
}`,
        initialJS: `// Cambia el innerText (o textContent) del h2#titulo
// cuando se haga clic en #cambiar

`,
        hints: [
          `Obtén el h2: <code>const titulo = document.getElementById('titulo');</code>`,
          `Agrega el evento al botón #cambiar.`,
          `Usa <code>titulo.innerText = '¡DOM Modificado!'</code> o <code>textContent</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('cambiar');
            const tit = doc.getElementById('titulo');
            if (!btn || !tit) return { pass: false, msg: 'Faltan elementos. Verifica #cambiar y #titulo en el HTML.' };
            const original = tit.textContent.trim();
            btn.click();
            const after = tit.textContent.trim();
            if (after !== original && after.length > 0) return { pass: true, msg: '¡El título cambia dinámicamente al hacer clic! innerText dominado.' };
            if (after === original) return { pass: false, msg: 'El título no cambió. ¿Cambiaste innerText del h2#titulo dentro del evento?' };
            return { pass: false, msg: 'El título quedó vacío. Asigna un nuevo texto dentro del addEventListener.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-2',
        title: 'Crear Elementos',
        mission: `El producto más importante de CodeLab: crear elementos dinámicamente. El cliente necesita agregar párrafos a una lista con solo presionar un botón. ¡Aprende createElement!`,
        objective: `Al hacer clic en "+ Agregar Párrafo", crea un nuevo elemento <p> con texto y agrégalo dentro del div#contenedor`,
        initialHTML: `<div class="pagina">
  <button id="agregar">+ Agregar Párrafo</button>
  <div id="contenedor">
    <p class="placeholder">Los elementos aparecerán aquí...</p>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fce4ec;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
}

#agregar {
  padding: 10px 20px;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
}

#agregar:hover {
  background: #b71c1c;
}

#contenedor {
  border: 2px dashed #ef9a9a;
  border-radius: 10px;
  padding: 16px;
  min-height: 80px;
  background: white;
}

#contenedor p {
  padding: 8px 12px;
  background: #fce4ec;
  border-left: 4px solid #e53935;
  border-radius: 4px;
  margin: 6px 0;
  color: #333;
}

.placeholder {
  color: #aaa;
  font-style: italic;
}`,
        initialJS: `// Al hacer clic en #agregar:
// 1. Crea un nuevo elemento <p>
// 2. Asígnale algún texto
// 3. Agrégalo dentro de #contenedor
// Usa: document.createElement(), element.textContent, contenedor.appendChild()

`,
        hints: [
          `Crea el elemento: <code>const parrafo = document.createElement('p');</code>`,
          `Asígnale texto: <code>parrafo.textContent = 'Nuevo elemento';</code>`,
          `Agrégalo: <code>document.getElementById('contenedor').appendChild(parrafo);</code>`,
        ],
        validate(doc) {
          try {
            const btn  = doc.getElementById('agregar');
            const cont = doc.getElementById('contenedor');
            if (!btn || !cont) return { pass: false, msg: 'Faltan elementos #agregar o #contenedor.' };
            const before = cont.querySelectorAll('p').length;
            btn.click();
            const after = cont.querySelectorAll('p').length;
            if (after > before) return { pass: true, msg: '¡createElement y appendChild funcionan! Creaste un elemento dinámicamente.' };
            return { pass: false, msg: 'Al hacer clic no se agregó ningún <p> al contenedor. Usa createElement() y appendChild().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '2-3',
        title: 'Eliminar Elementos',
        mission: `A veces hay que saber quitar. El sistema de gestión de CodeLab necesita eliminar elementos del DOM. Aprende a remover nodos con remove() o removeChild().`,
        objective: `Al hacer clic en "Borrar Elemento", elimina el li con id="itemBorrar" del DOM`,
        initialHTML: `<div class="pagina">
  <ul id="lista">
    <li id="item1" class="item-ok">✅ Este elemento se queda</li>
    <li id="itemBorrar" class="item-mal">❌ Elimina este elemento</li>
    <li id="item3" class="item-ok">✅ Este también se queda</li>
  </ul>
  <button id="btnBorrar">Borrar Elemento</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #fff3e0;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
}

#lista {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#lista li {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1rem;
}

.item-ok {
  background: #e8f5e9;
  border-left: 4px solid #43a047;
  color: #1b5e20;
}

.item-mal {
  background: #ffebee;
  border-left: 4px solid #e53935;
  color: #b71c1c;
}

#btnBorrar {
  padding: 10px 20px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
}`,
        initialJS: `// Al hacer clic en #btnBorrar
// elimina el elemento con id="itemBorrar"
// Opción 1 (más simple): document.getElementById('itemBorrar').remove()
// Opción 2: padre.removeChild(hijo)

`,
        hints: [
          `Obtén el elemento: <code>const item = document.getElementById('itemBorrar');</code>`,
          `El método más simple: <code>item.remove();</code>`,
          `También puedes usar: <code>item.parentNode.removeChild(item);</code>`,
        ],
        validate(doc) {
          try {
            const btn = doc.getElementById('btnBorrar');
            if (!btn) return { pass: false, msg: 'No encontré el botón #btnBorrar.' };
            btn.click();
            const deleted = doc.getElementById('itemBorrar');
            if (!deleted) return { pass: true, msg: '¡Elemento eliminado del DOM correctamente! .remove() dominado.' };
            return { pass: false, msg: 'El elemento #itemBorrar sigue en el DOM. Usa .remove() dentro del evento clic.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 3: ESTILOS DINÁMICOS
  // ============================================================
  {
    id: 3, name: 'Estilos Dinámicos', subtitle: 'CSS + JS en acción',
    icon: '🎨', color: '#d2a8ff',
    challenges: [

      {
        id: '3-1',
        title: 'Color al Hover',
        mission: `El equipo de UX quiere efectos interactivos. Necesitan que una tarjeta cambie de color cuando el mouse pasa encima. ¡Aprende los eventos mouseover y mouseout!`,
        objective: `Cuando el mouse entre en la caja (#caja), cambia su fondo a "dodgerblue". Cuando salga, regresa a su color original`,
        initialHTML: `<div class="pagina">
  <div id="caja">
    <span>Pasa el mouse aquí</span>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f3e5f5;
}

.pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

#caja {
  width: 220px;
  height: 130px;
  background: #f0f0f0;
  border-radius: 14px;
  border: 2px solid #ce93d8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  color: #555;
}`,
        initialJS: `// Agrega dos eventos al div#caja:
// 'mouseover' → cambia background a 'dodgerblue' y color a 'white'
// 'mouseout'  → regresa background a '#f0f0f0' y color a '#555'

`,
        hints: [
          `Obtén la caja: <code>const caja = document.getElementById('caja');</code>`,
          `Evento de entrada: <code>caja.addEventListener('mouseover', function() { caja.style.backgroundColor = 'dodgerblue'; caja.style.color = 'white'; })</code>`,
          `Evento de salida: <code>caja.addEventListener('mouseout', function() { caja.style.backgroundColor = '#f0f0f0'; caja.style.color = '#555'; })</code>`,
        ],
        validate(doc) {
          try {
            const caja = doc.getElementById('caja');
            if (!caja) return { pass: false, msg: 'No encontré el div#caja.' };
            const win = doc.defaultView;
            caja.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true }));
            const bg = caja.style.backgroundColor;
            if (bg === 'dodgerblue' || bg === 'rgb(30, 144, 255)') return { pass: true, msg: '¡Los eventos mouseover/mouseout funcionan! UX mejorada.' };
            if (bg && bg !== '' && bg !== 'rgb(240, 240, 240)') return { pass: true, msg: '¡El color cambia al hacer hover! Eventos de mouse dominados.' };
            return { pass: false, msg: `Al hacer hover el fondo no cambia. Revisa el event listener 'mouseover'. Fondo actual: "${bg || 'sin cambio'}"` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-2',
        title: 'Alternar Clases CSS',
        mission: `El diseñador definió dos estilos: modo claro y modo oscuro. Tu trabajo: usar classList.toggle() para alternar entre ellos al hacer clic. ¡Técnica clave en el mundo real!`,
        objective: `Al hacer clic en el botón, alterna (toggle) la clase "activo" en el div#tarjeta`,
        initialHTML: `<div class="pagina">
  <div id="tarjeta">
    <h3>Soy una tarjeta</h3>
    <p>Mi estilo cambia con classList</p>
  </div>
  <button id="btnToggle">Alternar Estilo</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #e8eaf6;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 50px 20px;
}

#tarjeta {
  width: 240px;
  padding: 24px;
  border-radius: 14px;
  text-align: center;
  transition: all 0.4s;
  background: #e8f0fe;
  color: #1a237e;
  border: 2px solid #4a90e2;
}

#tarjeta h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

#tarjeta p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Clase que JS agrega/quita */
#tarjeta.activo {
  background: #1a237e;
  color: white;
  border-color: #90caf9;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(26, 35, 126, 0.4);
}

#btnToggle {
  padding: 10px 22px;
  background: #3949ab;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}`,
        initialJS: `// Al hacer clic en #btnToggle,
// alterna la clase 'activo' en #tarjeta
// Usa: classList.toggle('activo')

`,
        hints: [
          `Obtén los elementos con getElementById.`,
          `En el evento click del botón: <code>tarjeta.classList.toggle('activo');</code>`,
          `classList.toggle agrega la clase si no existe, o la quita si ya existe.`,
        ],
        validate(doc) {
          try {
            const btn     = doc.getElementById('btnToggle');
            const tarjeta = doc.getElementById('tarjeta');
            if (!btn || !tarjeta) return { pass: false, msg: 'Faltan elementos #btnToggle o #tarjeta.' };
            btn.click();
            if (tarjeta.classList.contains('activo')) return { pass: true, msg: '¡classList.toggle() funciona! El estilo se alterna dinámicamente.' };
            return { pass: false, msg: 'Después del clic, la clase "activo" no está en #tarjeta. Usa classList.toggle().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '3-3',
        title: 'Panel de Colores',
        mission: `El equipo creativo quiere un panel de colores interactivo. Al hacer clic en cada botón de color, el fondo del lienzo principal debe cambiar. ¡Controla estilos inline con JavaScript!`,
        objective: `Al hacer clic en cada botón de color, cambia el backgroundColor del div#lienzo al color de ese botón (usa dataset.color)`,
        initialHTML: `<div class="pagina">
  <div id="lienzo">
    <span id="colorActual">Sin color</span>
  </div>
  <div class="paleta">
    <button class="btnColor" data-color="#e74c3c">Rojo</button>
    <button class="btnColor" data-color="#2ecc71">Verde</button>
    <button class="btnColor" data-color="#3498db">Azul</button>
    <button class="btnColor" data-color="#9b59b6">Morado</button>
    <button class="btnColor" data-color="#f39c12">Naranja</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #212121;
}

.pagina {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
}

#lienzo {
  width: 100%;
  height: 160px;
  border-radius: 14px;
  border: 2px solid #555;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s;
}

#colorActual {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
}

.paleta {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.btnColor {
  padding: 10px 18px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: bold;
  transition: transform 0.1s;
}

.btnColor:nth-child(1) { background: #e74c3c; }
.btnColor:nth-child(2) { background: #2ecc71; }
.btnColor:nth-child(3) { background: #3498db; }
.btnColor:nth-child(4) { background: #9b59b6; }
.btnColor:nth-child(5) { background: #f39c12; }

.btnColor:hover {
  transform: scale(1.08);
}`,
        initialJS: `// Obtén todos los botones con clase 'btnColor'
// Para cada uno, al hacer clic:
//   - Lee su atributo data-color (btn.dataset.color)
//   - Aplica ese color al fondo de #lienzo
//   - Muestra el color en #colorActual
// Pista: usa document.querySelectorAll('.btnColor') y forEach

`,
        hints: [
          `Selecciona todos: <code>const botones = document.querySelectorAll('.btnColor');</code>`,
          `Itera: <code>botones.forEach(function(btn) { btn.addEventListener('click', function() { ... }) })</code>`,
          `Lee y aplica: <code>lienzo.style.backgroundColor = btn.dataset.color;</code>`,
        ],
        validate(doc) {
          try {
            const btns   = doc.querySelectorAll('.btnColor');
            const lienzo = doc.getElementById('lienzo');
            if (!lienzo) return { pass: false, msg: 'No encontré el div#lienzo.' };
            if (!btns.length) return { pass: false, msg: 'No encontré botones con clase "btnColor".' };
            btns[0].click();
            const bg = lienzo.style.backgroundColor;
            if (bg && bg !== '' && bg !== 'rgb(51, 51, 51)') return { pass: true, msg: '¡Los colores se aplican dinámicamente! Dominas dataset y style.' };
            return { pass: false, msg: 'Al hacer clic en un botón, el fondo de #lienzo no cambia. Asigna style.backgroundColor.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 4: EVENTOS Y LÓGICA
  // ============================================================
  {
    id: 4, name: 'Eventos y Lógica', subtitle: 'Condicionales, validación y contadores',
    icon: '⚡', color: '#e3b341',
    challenges: [

      {
        id: '4-1',
        title: 'Control de Acceso',
        mission: `¡Seguridad primero! CodeLab necesita un sistema de login básico. Si el usuario escribe "admin123" se le da acceso, si no, se muestra error. ¡Usa condicionales para controlar el flujo!`,
        objective: `Si el input tiene "admin123", muestra "✅ Acceso Permitido" en verde. Si no, muestra "❌ Contraseña incorrecta" en rojo`,
        initialHTML: `<div class="pagina">
  <div class="panel">
    <h3 class="titulo-panel">🔐 Panel de Acceso</h3>
    <input id="password" type="password" placeholder="Contraseña secreta...">
    <button id="btnAcceso">Verificar Acceso</button>
    <div id="resultado"></div>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.panel {
  background: #16213e;
  border: 1px solid #0f3460;
  border-radius: 14px;
  padding: 32px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.titulo-panel {
  color: #e0e0e0;
  margin: 0;
  text-align: center;
  font-size: 1.1rem;
}

#password {
  padding: 10px 14px;
  background: #0f3460;
  border: 1px solid #1a5276;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
}

#btnAcceso {
  padding: 11px;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#resultado {
  min-height: 40px;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 0.95rem;
}`,
        initialJS: `// Al hacer clic en #btnAcceso:
// Lee el valor de #password
// Si es 'admin123': muestra "✅ Acceso Permitido" en verde
// Si no: muestra "❌ Contraseña incorrecta" en rojo
// Cambia también el style del #resultado

`,
        hints: [
          `Lee el valor: <code>const pass = document.getElementById('password').value;</code>`,
          `Usa if/else: <code>if (pass === 'admin123') { ... } else { ... }</code>`,
          `Para el estilo verde: <code>resultado.style.background = '#1b5e20'; resultado.style.color = 'white';</code>`,
        ],
        validate(doc) {
          try {
            const inp = doc.getElementById('password');
            const btn = doc.getElementById('btnAcceso');
            const res = doc.getElementById('resultado');
            if (!inp || !btn || !res) return { pass: false, msg: 'Faltan elementos del formulario.' };
            inp.value = 'admin123'; btn.click();
            const t1 = res.textContent.trim().toLowerCase();
            if (t1.includes('permitido') || t1.includes('acceso') || t1.includes('✅')) {
              inp.value = 'clave_mala'; btn.click();
              const t2 = res.textContent.trim().toLowerCase();
              if (t2.includes('incorrecta') || t2.includes('❌') || t2.includes('denegado') || t2.includes('error')) {
                return { pass: true, msg: '¡El control de acceso funciona! Las dos condiciones están perfectas.' };
              }
              return { pass: false, msg: 'El acceso correcto funciona, pero con contraseña incorrecta no muestra error.' };
            }
            return { pass: false, msg: `Con "admin123" el resultado dice "${res.textContent.trim()}". Debe incluir "Acceso Permitido" o "✅".` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-2',
        title: 'Contador Interactivo',
        mission: `El equipo de estadísticas necesita un contador. Botones para incrementar, decrementar y reiniciar. El número cambia de color según su valor. ¡Lógica + DOM!`,
        objective: `"+1" suma, "-1" resta (mínimo 0), "Reset" vuelve a 0. Muestra el valor en #contador`,
        initialHTML: `<div class="pagina">
  <div id="contador">0</div>
  <div class="controles">
    <button id="btnMenos">−</button>
    <button id="btnReset">Reset</button>
    <button id="btnMas">+</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

#contador {
  font-size: 5rem;
  font-weight: 800;
  color: #484f58;
  transition: color 0.3s, transform 0.1s;
  min-width: 120px;
  text-align: center;
}

.controles {
  display: flex;
  gap: 14px;
}

#btnMenos {
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background: #da3633;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

#btnReset {
  padding: 0 20px;
  height: 56px;
  background: #30363d;
  color: #e6edf3;
  border: 1px solid #484f58;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
}

#btnMas {
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background: #238636;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}`,
        initialJS: `// Implementa el contador:
// - Variable 'cuenta' que empieza en 0
// - #btnMas: suma 1 a cuenta
// - #btnMenos: resta 1 (mínimo 0)
// - #btnReset: pone cuenta en 0
// - Actualiza el texto de #contador cada vez
// - Si cuenta > 0: cambia el color a '#3fb950', si = 0: '#484f58'

`,
        hints: [
          `Declara: <code>let cuenta = 0;</code> y una función: <code>function actualizar() { document.getElementById('contador').textContent = cuenta; }</code>`,
          `Para no bajar de 0: <code>if (cuenta > 0) { cuenta--; actualizar(); }</code>`,
          `Cambia el color: <code>const el = document.getElementById('contador'); el.style.color = cuenta > 0 ? '#3fb950' : '#484f58';</code>`,
        ],
        validate(doc) {
          try {
            const mas   = doc.getElementById('btnMas');
            const menos = doc.getElementById('btnMenos');
            const reset = doc.getElementById('btnReset');
            const cont  = doc.getElementById('contador');
            if (!mas || !menos || !reset || !cont) return { pass: false, msg: 'Faltan botones o el elemento #contador.' };
            mas.click(); mas.click(); mas.click();
            if (cont.textContent.trim() !== '3') return { pass: false, msg: `Después de 3 clics en +, el contador muestra "${cont.textContent}" en vez de "3".` };
            menos.click();
            if (cont.textContent.trim() !== '2') return { pass: false, msg: `Después de restar, muestra "${cont.textContent}" en vez de "2".` };
            reset.click();
            if (cont.textContent.trim() !== '0') return { pass: false, msg: `Después de Reset, muestra "${cont.textContent}" en vez de "0".` };
            menos.click();
            if (cont.textContent.trim() !== '0') return { pass: false, msg: 'El contador bajó de 0. Debe tener un mínimo de 0.' };
            return { pass: true, msg: '¡Contador perfecto! Suma, resta, mínimo 0 y reset funcionan.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '4-3',
        title: 'Validación de Formulario',
        mission: `¡Los formularios son el pan de cada día del desarrollador web! CodeLab necesita un formulario de registro que valide datos antes de enviar. ¡Implementa validaciones reales!`,
        objective: `Valida que el nombre no esté vacío y que el email contenga "@". Muestra mensajes de error o éxito en #mensajeForm`,
        initialHTML: `<div class="pagina">
  <form class="formulario" id="form">
    <h3 class="titulo">📝 Registro CodeLab</h3>
    <div class="campo">
      <label for="inputNombre">Nombre</label>
      <input id="inputNombre" type="text" placeholder="Tu nombre completo">
    </div>
    <div class="campo">
      <label for="inputEmail">Email</label>
      <input id="inputEmail" type="text" placeholder="tu@email.com">
    </div>
    <button type="button" id="btnRegistrar">Registrar</button>
    <div id="mensajeForm"></div>
  </form>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.formulario {
  background: white;
  border-radius: 14px;
  padding: 32px;
  width: 320px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.titulo {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  text-align: center;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-size: 0.82rem;
  color: #555;
  font-weight: 600;
}

input {
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4a90e2;
}

#btnRegistrar {
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

#mensajeForm {
  min-height: 36px;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  text-align: center;
}`,
        initialJS: `// Al hacer clic en #btnRegistrar:
// 1. Lee #inputNombre y #inputEmail
// 2. Si nombre vacío: error "El nombre es obligatorio"
// 3. Si email no tiene '@': error "El email no es válido"
// 4. Si todo OK: muestra "✅ Registro exitoso, [nombre]!"
// Muestra el mensaje en #mensajeForm con colores apropiados

`,
        hints: [
          `Verifica vacío: <code>if (nombre.trim() === '') { ... }</code>`,
          `Verifica @: <code>if (!email.includes('@')) { ... }</code>`,
          `Para error rojo: <code>msg.style.background = '#ffebee'; msg.style.color = '#c62828';</code>`,
        ],
        validate(doc) {
          try {
            const nom   = doc.getElementById('inputNombre');
            const email = doc.getElementById('inputEmail');
            const btn   = doc.getElementById('btnRegistrar');
            const msg   = doc.getElementById('mensajeForm');
            if (!nom || !email || !btn || !msg) return { pass: false, msg: 'Faltan elementos del formulario.' };
            nom.value = ''; email.value = ''; btn.click();
            if (!msg.textContent.trim()) return { pass: false, msg: 'Con nombre vacío no muestra ningún mensaje de error.' };
            nom.value = 'Carlos'; email.value = 'sinArroba'; btn.click();
            const t2 = msg.textContent.trim().toLowerCase();
            if (!t2.includes('email') && !t2.includes('válido') && !t2.includes('@')) {
              return { pass: false, msg: 'Con email sin "@" no muestra error de email inválido.' };
            }
            nom.value = 'Carlos'; email.value = 'carlos@email.com'; btn.click();
            const t3 = msg.textContent.trim();
            if (t3.includes('Carlos') || t3.toLowerCase().includes('exitoso') || t3.includes('✅')) {
              return { pass: true, msg: '¡Validación completa! Los 3 casos funcionan correctamente.' };
            }
            return { pass: false, msg: `Con datos válidos el mensaje dice "${t3}". Debe incluir éxito y el nombre.` };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 5: ANIMACIONES Y EFECTOS
  // ============================================================
  {
    id: 5, name: 'Animaciones y Efectos', subtitle: 'CSS animations + JavaScript',
    icon: '✨', color: '#f78166',
    challenges: [

      {
        id: '5-1',
        title: 'Activar Animaciones',
        mission: `¡Hora de darle vida a la interfaz! Aprende a activar animaciones CSS desde JavaScript usando classList. La animación ya está definida en CSS — tú solo decides cuándo activarla.`,
        objective: `Al hacer clic en el botón, alterna la clase "animar" en el div#pelota para que rebote`,
        initialHTML: `<div class="pagina">
  <div id="pelota">⚽</div>
  <button id="btnAnimar">Animar / Detener</button>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #1c2128;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

#pelota {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

/* Animación definida — JS solo agrega/quita la clase */
@keyframes rebotar {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-50px) scale(1.12); }
}

.animar {
  animation: rebotar 0.7s ease-in-out infinite;
}

#btnAnimar {
  padding: 12px 28px;
  background: #58a6ff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}`,
        initialJS: `// Al hacer clic en #btnAnimar:
// Alterna (toggle) la clase 'animar' en #pelota
// La animación CSS ya está definida — solo agrega/quita la clase

`,
        hints: [
          `Obtén la pelota: <code>const pelota = document.getElementById('pelota');</code>`,
          `En el clic del botón: <code>pelota.classList.toggle('animar');</code>`,
          `classList.toggle agrega la clase si no existe, y la quita si ya existe.`,
        ],
        validate(doc) {
          try {
            const btn    = doc.getElementById('btnAnimar');
            const pelota = doc.getElementById('pelota');
            if (!btn || !pelota) return { pass: false, msg: 'Faltan elementos #btnAnimar o #pelota.' };
            btn.click();
            if (pelota.classList.contains('animar')) return { pass: true, msg: '¡La animación se activa con JS! classList.toggle es poderoso.' };
            return { pass: false, msg: 'Después del clic, la clase "animar" no se agrega a #pelota. Usa classList.toggle().' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '5-2',
        title: 'Mover un Elemento',
        mission: `¡El elemento cobra vida! Implementa el movimiento de una caja con las propiedades CSS de posición desde JavaScript. Concepto fundamental para juegos y animaciones interactivas.`,
        objective: `Al hacer clic en los botones de dirección, mueve el div#caja 20px en esa dirección usando style.left y style.top`,
        initialHTML: `<div class="pagina">
  <div class="arena">
    <div id="caja">📦</div>
  </div>
  <div class="controles">
    <div></div>
    <button id="btnArriba">↑</button>
    <div></div>
    <button id="btnIzq">←</button>
    <button id="btnAbajo">↓</button>
    <button id="btnDer">→</button>
  </div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #161b22;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.arena {
  position: relative;
  width: 360px;
  height: 220px;
  border: 2px solid #30363d;
  border-radius: 12px;
  background: #0d1117;
  overflow: hidden;
}

#caja {
  position: absolute;
  left: 50px;
  top: 50px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #58a6ff, #1f6feb);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: left 0.1s, top 0.1s;
  cursor: pointer;
}

.controles {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  gap: 6px;
}

.controles button {
  width: 46px;
  height: 46px;
  font-size: 1.2rem;
  background: #21262d;
  color: #e6edf3;
  border: 1px solid #30363d;
  border-radius: 8px;
  cursor: pointer;
}

.controles button:hover {
  background: #30363d;
}`,
        initialJS: `// La caja tiene position:absolute, left:50px, top:50px
// Cada botón debe moverla 20px en su dirección
// Pista:
//   const caja = document.getElementById('caja');
//   let x = 50, y = 50; // posición actual
//   Al presionar derecha: x += 20; caja.style.left = x + 'px';
//   Al presionar arriba:  y -= 20; caja.style.top  = y + 'px';

`,
        hints: [
          `Declara: <code>let x = 50, y = 50;</code>`,
          `Al presionar derecha: <code>x += 20; caja.style.left = x + 'px';</code>`,
          `Al presionar arriba: <code>y -= 20; caja.style.top = y + 'px';</code> (arriba = menos top)`,
        ],
        validate(doc) {
          try {
            const der  = doc.getElementById('btnDer');
            const caja = doc.getElementById('caja');
            if (!der || !caja) return { pass: false, msg: 'Faltan elementos. Verifica los ids.' };
            const before = parseInt(caja.style.left) || 50;
            der.click();
            const after = parseInt(caja.style.left) || 50;
            if (after > before) return { pass: true, msg: '¡La caja se mueve con JS! Controlas posición absoluta.' };
            return { pass: false, msg: 'Al hacer clic en →, la caja no se movió. Verifica que cambias style.left.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },

  // ============================================================
  // NIVEL 6: COMPONENTES DINÁMICOS
  // ============================================================
  {
    id: 6, name: 'Componentes Dinámicos', subtitle: 'Mini-aplicaciones completas',
    icon: '🚀', color: '#58a6ff',
    challenges: [

      {
        id: '6-1',
        title: 'Lista de Tareas (To-Do)',
        mission: `¡El proyecto más pedido en el mundo web! Construye una lista de tareas funcional: el usuario escribe una tarea, la agrega, y puede marcarla como completada. ¡Pura manipulación del DOM!`,
        objective: `Al hacer clic en "+": crea un <li> con el texto del input en #listaTareas. Al hacer clic en el li, toggle la clase "completada". El input se limpia después de agregar.`,
        initialHTML: `<div class="app">
  <h2 class="titulo">📋 Mis Tareas</h2>
  <div class="entrada">
    <input id="inputTarea" type="text" placeholder="Nueva tarea...">
    <button id="btnAgregar">+</button>
  </div>
  <ul id="listaTareas"></ul>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  margin: 0;
}

.app {
  background: white;
  border-radius: 16px;
  padding: 28px;
  width: 380px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.titulo {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.entrada {
  display: flex;
  gap: 8px;
}

#inputTarea {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

#inputTarea:focus {
  border-color: #4a90e2;
}

#btnAgregar {
  width: 42px;
  height: 42px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.4rem;
  cursor: pointer;
}

#listaTareas {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Estas clases las usa JS con classList.toggle */
#listaTareas li {
  padding: 11px 14px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  font-size: 0.95rem;
}

#listaTareas li:hover {
  opacity: 0.8;
}

#listaTareas li.completada {
  background: #e8f5e9;
  border-left-color: #43a047;
  text-decoration: line-through;
  color: #999;
}`,
        initialJS: `// Al hacer clic en #btnAgregar:
// 1. Lee el valor de #inputTarea
// 2. Si no está vacío, crea un <li> con ese texto
// 3. Agrégalo a #listaTareas
// 4. Al hacer clic en el li, alterna la clase 'completada'
// 5. Limpia el input (inputTarea.value = '')

`,
        hints: [
          `Crea el li: <code>const li = document.createElement('li'); li.textContent = texto;</code>`,
          `Toggle al hacer clic: <code>li.addEventListener('click', () => li.classList.toggle('completada'));</code>`,
          `Agrega y limpia: <code>lista.appendChild(li); input.value = '';</code>`,
        ],
        validate(doc) {
          try {
            const inp   = doc.getElementById('inputTarea');
            const btn   = doc.getElementById('btnAgregar');
            const lista = doc.getElementById('listaTareas');
            if (!inp || !btn || !lista) return { pass: false, msg: 'Faltan elementos del HTML.' };
            inp.value = 'Aprender JavaScript'; btn.click();
            const items = lista.querySelectorAll('li');
            if (!items.length) return { pass: false, msg: 'Al hacer clic en +, no se agregó ningún <li> a #listaTareas.' };
            const last = items[items.length - 1];
            if (!last.textContent.includes('Aprender JavaScript')) return { pass: false, msg: `El li dice "${last.textContent}" en vez del texto del input.` };
            if (inp.value !== '') return { pass: false, msg: 'El input no se limpió después de agregar. Usa input.value = "".' };
            last.click();
            if (!last.classList.contains('completada')) return { pass: false, msg: 'Al hacer clic en el li, no alterna la clase "completada".' };
            return { pass: true, msg: '¡To-Do List completa! Crear, completar y limpiar funcionan perfectamente.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },

      {
        id: '6-2',
        title: 'Generador de Tarjetas',
        mission: `¡Última misión, desarrollador! Crea un sistema que genere tarjetas de perfil dinámicamente. El usuario llena un formulario y se genera una tarjeta visual. ¡Combina todo lo aprendido!`,
        objective: `Al hacer clic en "Crear Tarjeta": genera una tarjeta con nombre, rol y color dentro de #contenedorCards. La tarjeta debe mostrar un avatar con la inicial del nombre.`,
        initialHTML: `<div class="app">
  <div class="formulario">
    <h3 class="titulo">🪪 Nueva Tarjeta</h3>
    <input id="cardNombre" type="text" placeholder="Nombre...">
    <input id="cardRol"    type="text" placeholder="Rol (ej: Desarrollador Frontend)...">
    <div class="fila-color">
      <label>Color:</label>
      <input id="cardColor" type="color" value="#4a90e2">
    </div>
    <button id="btnCrearCard">+ Crear Tarjeta</button>
  </div>
  <div id="contenedorCards"></div>
</div>`,
        initialCSS: `body {
  font-family: sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 24px;
}

.app {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 480px;
  margin: 0 auto;
}

.formulario {
  background: white;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.titulo {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

input[type="text"] {
  padding: 9px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
}

input[type="text"]:focus {
  border-color: #4a90e2;
}

.fila-color {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #555;
}

input[type="color"] {
  width: 40px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

#btnCrearCard {
  padding: 11px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

/* Las tarjetas generadas por JS tendrán esta estructura */
#contenedorCards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}`,
        initialJS: `// Al hacer clic en #btnCrearCard:
// 1. Lee nombre, rol y color de los inputs
// 2. Si nombre está vacío, no hagas nada
// 3. Crea un div con la tarjeta
//    - La inicial del nombre como avatar: nombre[0].toUpperCase()
//    - Muestra el nombre y el rol
// 4. Agrega la tarjeta a #contenedorCards
// 5. Limpia los inputs de texto

// Ejemplo para crear el HTML de la tarjeta:
// const inicial = nombre[0].toUpperCase();
// card.innerHTML = '<div class="avatar">' + inicial + '</div>' +
//                  '<strong>' + nombre + '</strong>' +
//                  '<span>' + rol + '</span>';

`,
        hints: [
          `Lee los valores: <code>const nombre = document.getElementById('cardNombre').value.trim();</code>`,
          `Crea el div: <code>const card = document.createElement('div');</code> y asigna su innerHTML con el avatar, nombre y rol.`,
          `La inicial: <code>const inicial = nombre[0].toUpperCase();</code> — úsala dentro del avatar.`,
        ],
        validate(doc) {
          try {
            const nom  = doc.getElementById('cardNombre');
            const rol  = doc.getElementById('cardRol');
            const btn  = doc.getElementById('btnCrearCard');
            const cont = doc.getElementById('contenedorCards');
            if (!nom || !rol || !btn || !cont) return { pass: false, msg: 'Faltan elementos del formulario.' };
            nom.value = 'Ana García'; rol.value = 'Desarrolladora'; btn.click();
            const cards = cont.children;
            if (!cards.length) return { pass: false, msg: 'Al hacer clic, no se creó ninguna tarjeta en #contenedorCards.' };
            const card = cards[cards.length - 1];
            const txt  = card.textContent;
            if (txt.includes('Ana') || txt.includes('A')) {
              if (txt.includes('Desarrolladora')) return { pass: true, msg: '¡Generador de tarjetas completo! Dominas la creación de componentes dinámicos.' };
              return { pass: false, msg: 'La tarjeta tiene el nombre pero no muestra el rol.' };
            }
            return { pass: false, msg: 'La tarjeta no muestra el nombre "Ana García". Verifica que usas el valor del input.' };
          } catch(e) { return { pass: false, msg: 'Error: ' + e.message }; }
        },
      },
    ],
  },
];

// ============================================================
// LOGROS
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first_blood', name: '¡Primer Reto!',       icon: '🎯', condition: s => s.completedChallenges.length === 1 },
  { id: 'no_hints_3',  name: 'Sin Ayuda',            icon: '🧠', condition: s => Object.values(s.usedHints).filter(h => h === 0).length >= 3 },
  { id: 'lvl1_done',   name: 'Primer Contacto',      icon: '🔹', condition: s => ['1-1','1-2','1-3'].every(id => s.completedChallenges.includes(id)) },
  { id: 'lvl2_done',   name: 'Maestro del DOM',      icon: '🔸', condition: s => ['2-1','2-2','2-3'].every(id => s.completedChallenges.includes(id)) },
  { id: 'lvl3_done',   name: 'Rey del CSS Dinámico', icon: '🎨', condition: s => ['3-1','3-2','3-3'].every(id => s.completedChallenges.includes(id)) },
  { id: 'lvl4_done',   name: 'Experto en Eventos',   icon: '⚡', condition: s => ['4-1','4-2','4-3'].every(id => s.completedChallenges.includes(id)) },
  { id: 'halfway',     name: 'A Mitad del Camino',   icon: '🌟', condition: s => s.completedChallenges.length >= 8 },
  { id: 'all_done',    name: 'DOM Master',            icon: '🏆', condition: s => s.completedChallenges.length >= 16 },
];
