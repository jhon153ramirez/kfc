const productos = [
    {
        nombre: "Pollo Frito Clásico",
        imagen: "./src/imagenes/PolloFritoClásico.jpg",
        precio: 20000,
        descripcion: "Delicioso pollo frito con una receta clásica, crujiente por fuera y jugoso por dentro.",
        categoria: "Pollo Frito",
        marca: "Crispy King"
    },
    {
        nombre: "Tiras de Pollo Empanizadas",
        imagen: "./src/imagenes/tiras_pollo.jpg",
        precio: 15000,
        descripcion: "Crujientes tiras de pollo empanizadas, perfectas para acompañar con tu salsa favorita.",
        categoria: "Pollo Frito",
        marca: "Crunchy Bites"
    },
    {
        nombre: "Alitas Picantes",
        imagen: "./src/imagenes/alitas_picantes.jpg",
        precio: 18000,
        descripcion: "Alitas de pollo bañadas en salsa picante, ideales para los amantes de lo picoso.",
        categoria: "Alitas",
        marca: "Spicy Wings"
    },
    {
        nombre: "Combo Familiar de Pollo",
        imagen: "./src/imagenes/combo_familiar.jpg",
        precio: 60000,
        descripcion: "Un combo con 8 piezas de pollo, papas fritas y bebidas para compartir en familia.",
        categoria: "Combos",
        marca: "Family Feast"
    },
    {
        nombre: "Pollo Frito Estilo Coreano",
        imagen: "./src/imagenes/pollo_coreano.jpg",
        precio: 25000,
        descripcion: "Pollo frito con salsa dulce y picante, al estilo coreano, perfecto para disfrutar.",
        categoria: "Pollo Frito",
        marca: "Korean Flavors"
    },
    {
        nombre: "Sandwich de Pollo Frito",
        imagen: "./src/imagenes/sandwich_pollo.jpg",
        precio: 22000,
        descripcion: "Sandwich con pechuga de pollo frito, lechuga, tomate y mayonesa, servido en pan brioche.",
        categoria: "Sandwiches",
        marca: "Chicken Delish"
    },
    {
        nombre: "Popcorn de Pollo",
        imagen: "./src/imagenes/popcorn_pollo.jpg",
        precio: 12000,
        descripcion: "Pequeños y crujientes bocados de pollo, ideales para compartir o picar.",
        categoria: "Bocados",
        marca: "Popcorn Crunch"
    },
    {
        nombre: "Bowl de Pollo y Arroz",
        imagen: "./src/imagenes/bowl_pollo.jpg",
        precio: 18000,
        descripcion: "Trozos de pollo frito servidos sobre arroz con vegetales frescos y salsa especial.",
        categoria: "Bowls",
        marca: "Healthy Fry"
    },
    {
        nombre: "Hamburguesa de Pollo Frito",
        imagen: "./src/imagenes/hamburguesa_pollo.jpg",
        precio: 24000,
        descripcion: "Hamburguesa con pollo frito, queso cheddar, ensalada y una salsa especial.",
        categoria: "Hamburguesas",
        marca: "Burger Chick"
    },
    {
        nombre: "Papas Fritas con Pollo",
        imagen: "./src/imagenes/papas_pollo.jpg",
        precio: 15000,
        descripcion: "Papas fritas cubiertas con trozos de pollo frito y aderezo de queso.",
        categoria: "Acompañamientos",
        marca: "Loaded Fries"
    }
];

localStorage.setItem("productos", JSON.stringify(productos));

let carrito = [];

function cargarProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    mostrarProductos(productos);
    cargarFiltros(productos);
}

function cargarFiltros(productos) {
    const categoriaFilter = document.getElementById("category-filter");
    const marcaFilter = document.getElementById("brand-filter");

    const categorias = [...new Set(productos.map(producto => producto.categoria))];
    const marcas = [...new Set(productos.map(producto => producto.marca))];

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categoriaFilter.appendChild(option);
    });

    marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaFilter.appendChild(option);
    });
}

function aplicarFiltros() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const categoriaSeleccionada = document.getElementById("category-filter").value;
    const marcaSeleccionada = document.getElementById("brand-filter").value;

    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true;
        const coincideMarca = marcaSeleccionada ? producto.marca === marcaSeleccionada : true;
        return coincideCategoria && coincideMarca;
    });

    mostrarProductos(productosFiltrados);
}

document.getElementById("category-filter").addEventListener("change", aplicarFiltros);
document.getElementById("brand-filter").addEventListener("change", aplicarFiltros);

function mostrarProductos(productos) {
    const productsGrid = document.getElementById("products-grid");
    productsGrid.innerHTML = "";

    productos.forEach((producto, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("bg-white", "rounded-lg", "border", "p-4", "mb-4");

        productCard.innerHTML = `
            <div class="max-w-sm mx-auto p-5 bg-gray-100 rounded-2xl shadow-xl">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="h-52 w-52 object-cover rounded-2xl mx-auto mb-5">
                <div class="flex-1 text-center">
                    <h3 class="text-xl font-bold text-black">${producto.nombre}</h3>
                    <p class="text-gray-700 mt-2">${producto.descripcion}</p>
                    <p class="text-black font-bold text-lg">$${producto.precio.toFixed(2)}</p>

                    <label for="adicionales-${index}" class="block mt-4 font-medium text-gray-700">Adicionales:</label>
                    <select id="adicionales-${index}" class="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-gray-500">
                        <option value="Papas">Papas</option>
                        <option value="Nuggets">Nuggets</option>
                        <option value="Helado">Helado</option>
                    </select>

                    <button onclick="añadirAlCarrito(${index})" class="bg-red-600 text-white rounded-3xl mt-5 px-8 py-4 w-full font-bold hover:bg-red-700 transition-colors duration-300 shadow-xl">
                        Añadir al Carrito
                    </button>
                </div>
            </div>

        `;
        productsGrid.appendChild(productCard);
    });
}

function añadirAlCarrito(index) {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const producto = productos[index];
    const adicionales = document.getElementById(`adicionales-${index}`).value;
    const cantidad = 1;  // Fija la cantidad a 1

    carrito.push({ ...producto, adicionales, cantidad });
    actualizarCarrito();
    mostrarMensajeExito();
    setTimeout(() => {
        ocultarMensajeExito();
    }, 5000);
}

function mostrarMensajeExito() {
    const mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.classList.remove("hidden");
    mensajeExito.textContent = "¡Producto añadido exitosamente!";
}

function ocultarMensajeExito() {
    const mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.classList.add("hidden");
}

function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";

    carrito.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("border-b", "pb-2", "mb-2");

        cartItem.innerHTML = `
            <h4 class="text-xl font-bold text-blue-600">${item.nombre}</h4>
            <p class="text-gray-700">Adicionales: ${item.adicionales}</p>
            <p class="font-semibold text-green-600">Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
            <button onclick="eliminarDelCarrito(${index})" class="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 border-2 border-red-800 rounded-full px-5 py-2 mt-3">Eliminar</button>
            <button onclick="modificarCarrito(${index})" class="bg-yellow-400 text-white hover:bg-yellow-500 transition-colors duration-300 border-2 border-yellow-600 rounded-full px-5 py-2 mt-3">Modificar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = carrito.length;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function modificarCarrito(index) {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const producto = productos[index];
    const adicionales = prompt("Modificar adicionales:", carrito[index].adicionales);
    
    carrito[index].adicionales = adicionales;
    actualizarCarrito();
}
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("hidden");
}
window.onload = cargarProductos;
