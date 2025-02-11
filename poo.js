// Este sera la clase producto
var Producto = /** @class */ (function () {
    function Producto(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    // Aqui se obtendran los detalles de la info del producto
    Producto.prototype.obtenerInfo = function () {
        return " Producto [ID: ".concat(this.id, "] - ").concat(this.nombre, " |  Precio: $").concat(this.precio, " |  Cantidad: ").concat(this.cantidad);
    };
    return Producto;
}());
/* Servicio de Inventario que maneja la gestión de productos
map es como un array pero mejora el almacenado de info
*/
var Inventario = /** @class */ (function () {
    function Inventario() {
        this.productos = new Map();
        //id counter sera mi contador de id unicos
        this.idCounter = 1;
    }
    // Este metodo sumara, agregara los productos
    Inventario.prototype.agregarProducto = function (nombre, precio, cantidad) {
        var nuevoProducto = new Producto(this.idCounter++, nombre, precio, cantidad);
        this.productos.set(nuevoProducto.id, nuevoProducto);
        console.log("El producto se agrego: ".concat(nombre));
    };
    // Mostrara inventario
    Inventario.prototype.mostrarInventario = function () {
        if (this.productos.size === 0) {
            console.log(" Inventario vacío xd.");
            return;
        }
        console.log("\n Inventario actual:");
        this.productos.forEach(function (producto) { return console.log(producto.obtenerInfo()); });
    };
    // Metodo que restara productos 
    Inventario.prototype.venderProducto = function (id, cantidad) {
        var producto = this.productos.get(id);
        if (!producto) {
            console.log(" Producto con ID ".concat(id, " no se encuentra."));
            return;
        }
        if (producto.cantidad < cantidad) {
            console.log(" existencias insuficientes ".concat(cantidad, " solo \"").concat(producto.nombre, "\"."));
            return;
        }
        producto.cantidad -= cantidad;
        console.log("Venta exitosa: ".concat(cantidad, " por \"").concat(producto.nombre, "\"."));
    };
    // Este metodo dara la informacion por id para la consulta del producto
    Inventario.prototype.consultarProducto = function (id) {
        var producto = this.productos.get(id);
        if (!producto) {
            console.log("Producto con ID ".concat(id, " no se encuentra."));
            return;
        }
        console.log("Detalles producto:\n".concat(producto.obtenerInfo()));
    };
    return Inventario;
}());
console.log("Pruebas--------");
// se inicializa el objeto
var inventario = new Inventario();
// Agrega productos
inventario.agregarProducto("Plumas", 13, 123);
inventario.agregarProducto("Hojas", 20, 300);
inventario.agregarProducto("Carpetas", 6, 150);
// Muestra el inventario
inventario.mostrarInventario();
// mediante el ide se muestra la info del producto
inventario.consultarProducto(3);
// Realizar ventas
inventario.venderProducto(1, 10);
inventario.venderProducto(3, 5);
// inventario despues de las ventas
inventario.mostrarInventario();
// inventario final
inventario.mostrarInventario();
