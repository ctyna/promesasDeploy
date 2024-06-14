import { useState } from 'react'
import './Store.css'
import { useEffect } from 'react'
const {VITE_PRODUCTS} = import.meta.env



export const Store = () => {

    const [tienda, setTienda] = useState([])
    const [productosFiltrados, setFiltrados] = useState([]);



    const pedirDatos = async () => {
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }

        await fetch(VITE_PRODUCTS, options)
            .then(res => res.json())
            .then(data => setTienda(data))

            .catch(err => console.log(err))
            .finally(() => controller.abort())
    }
    const filtrarCategoria = (category) => {
        const productosFiltrados = category ? tienda.filter((each) => each.category == category) : tienda;
        setFiltrados(productosFiltrados);
    }


    useEffect(() => {
        pedirDatos()
    }, [])
    return (
        <div className="Products">
            <img
                className="Products-imagen"
                src="https://www.theindustry.fashion/wp-content/uploads/2021/07/asos2020-1.jpg"
                alt="Amazon"
            />
            <div className="Categorias">
                <button onClick={() => filtrarCategoria('')} className="Categoria-btn">
                    Todos
                </button>
                <button onClick={() => filtrarCategoria(`men's clothing`)} className="Categoria-btn">
                    Hombre
                </button>
                <button onClick={() => filtrarCategoria(`women's clothing`)} className="Categoria-btn">
                    Mujer
                </button>
                <button onClick={() => filtrarCategoria(`jewelery`)} className="Categoria-btn">
                    Joyas
                </button>
                <button onClick={() => filtrarCategoria(`electronics`)} className="Categoria-btn">
                    Electrónica
                </button>


            </div>
            <div className="Products-wrapper">
                {productosFiltrados.length == 0 && <p>No hay productos disponibles</p>}
                {productosFiltrados.length != 0 &&
                    productosFiltrados.map((eachProduct) =>
                    <Product key={eachProduct.id} {...eachProduct} />)}
            </div>
        </div>
    );
};


const Product = (props) => {

    const { image, title, description, price } = props
    const [descripcion, setDescripcion] = useState(false);
    const toogleDescripcion = () => setDescripcion(!descripcion);

    return (


        <div className="Products-container">

            <div className="Products-general">
                <h2 className="Products-h2"> {title} </h2>
                <img src={image} alt={title} className="Products-img" loading='lazy' />
                <span className="Products-span">Precio : {price} €</span>

                <button className="Products-btn" onClick={toogleDescripcion}>Ver Información del producto</button>
            </div>
            {descripcion ? <p className="Products-p">{description}</p> : ''}

        </div>

    )
}