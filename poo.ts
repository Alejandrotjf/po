// Interfaz o contrato para mi estructura
interface IProducto {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }
  
  // Este sera la clase producto
  class Producto implements IProducto {
    constructor(
      public id: number,
      public nombre: string,
      public precio: number,
      public cantidad: number
    ) {}
  
    // Aqui se obtendran los detalles de la info del producto
    obtenerInfo(): string {
      return ` Producto [ID: ${this.id}] - ${this.nombre} |  Precio: $${this.precio} |  Cantidad: ${this.cantidad}`;
    }
  }
  
  /* Servicio de Inventario que maneja la gestión de productos
  map es como un array pero mejora el almacenado de info
  */
  class Inventario {
    private productos: Map<number, Producto> = new Map();
    //id counter sera mi contador de id unicos
    private idCounter: number = 1; 
  
    // Este metodo sumara, agregara los productos
    agregarProducto(nombre: string, precio: number, cantidad: number): void {
      const nuevoProducto = new Producto(this.idCounter++, nombre, precio, cantidad);
      this.productos.set(nuevoProducto.id, nuevoProducto);
      console.log(`El producto se agrego: ${nombre}`);
    }
  
    // Mostrara inventario
    mostrarInventario(): void {
      if (this.productos.size === 0) {
        console.log(" Inventario vacío xd.");
        return;
      }
      console.log("\n Inventario actual:");
      this.productos.forEach((producto) => console.log(producto.obtenerInfo()));
    }
  
    // Metodo que restara productos 
    venderProducto(id: number, cantidad: number): void {
      const producto = this.productos.get(id);
      if (!producto) {
        console.log(` Producto con ID ${id} no se encuentra.`);
        return;
      }
      if (producto.cantidad < cantidad) {
        console.log(` existencias insuficientes ${cantidad} solo "${producto.nombre}".`);
        return;
      }
      producto.cantidad -= cantidad;
      console.log(`Venta exitosa: ${cantidad} por "${producto.nombre}".`);
    }
  
    // Este metodo dara la informacion por id para la consulta del producto
    consultarProducto(id: number): void {
      const producto = this.productos.get(id);
      if (!producto) {
        console.log(`Producto con ID ${id} no se encuentra.`);
        return;
      }
      console.log(`Detalles producto:\n${producto.obtenerInfo()}`);
    }
  }
  
  console.log("Pruebas--------")
  
  // se inicializa el objeto
  const inventario = new Inventario();
  
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