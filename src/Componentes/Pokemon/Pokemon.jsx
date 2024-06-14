import { createContext, useContext, useEffect, useState } from 'react'
import './Pokemon.css'
const {VITE_POKEMONS} = import.meta.env

const PokemonContext = createContext()
const DatosContext = createContext()
const HabilidadContext = createContext()


export const Pokemon = () => {

  const [pokemon, setPokemon] = useState([])

  const pedirDatos = async () => {
    let controller = new AbortController()
    let options = {
      method: 'get',
      signal: controller.signal
    }

    await fetch(VITE_POKEMONS, options)
      .then(res => res.json())
      .then(data => setPokemon(data.results))
      .catch(err => console.log(err))
      .finally(() => controller.abort())

  }

  useEffect(() => {
    pedirDatos()
  }, [])


  return (
    <>
      <PokemonContext.Provider value={pokemon}>
        <main className="Main-Pokemons Pokemons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png" alt="Logo pokemon" className='Pokemons-logo' />
          <Informacion />


        </main>
      </PokemonContext.Provider>
    </>
  )
}

const Informacion = () => {
  const pokemon = useContext(PokemonContext)



  return (
    <>
      <div className="Pokemons-container">
        {pokemon.length == 0 && <p>No hay Pokemons</p>}
        {pokemon.length != 0 && pokemon.map(eachPokemon =>
          <Pokemons key={eachPokemon.id} {...eachPokemon} />
        )} </div></>
  )
}


const Pokemons = (props) => {
  const { name, url } = props
  const [datos, setDatos] = useState(null)

  const pedirDatos = async () => {
    let controller = new AbortController()
    let options = {
      method: 'get',
      signal: controller.signal
    }

    await fetch(url, options)
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.log(err))
      .finally(() => controller.abort())
  }


  useEffect(() => {
    pedirDatos()
  }, [])


  return (
    <DatosContext.Provider value={datos}>
      <>

        {!datos && <p>Cargando Pokemon</p>}
        {datos &&
          <div className="Pokemon-card">


            <Imagen />
            <div className="Pokemon-info">
              <h2 className='Pokemon-h2'> {name} </h2>
              <Tipos />
              <Tabs />
            </div>
          </div>

        }
      </>
    </DatosContext.Provider>
  )
}

const Imagen = () => {
  const { sprites, name } = useContext(DatosContext)
  const { other } = sprites
  const { dream_world } = other


  return (
    <>
      <div className="Pokemon-svg">
        <img className='Pokemon-img' src={dream_world.front_default} alt={name} loading='lazy' />
      </div>
    </>
  )
}

const Tipos = () => {
  const { types } = useContext(DatosContext)
  return (
    <>
      <div className="Pokemon-type">
        {types.length == 0 && <p>No pertenece a ningún tipo</p>}
        {types.length != 0 && types.map(eachTipo =>
          <TipoPokemon key={eachTipo.id}{...eachTipo} />
        )}
      </div>

    </>
  )
}
const TipoPokemon = (props) => {
  const { type } = props
  const {name } = type


  return (
    <>
      <button className={`Pokemon-btn ${name}`}>{name}

      </button>

    </>
  )
}
const Tabs = () => {
  const [tabs, setTabs] = useState(0)
  const { height , weight, base_experience, abilities} = useContext(DatosContext)

  const tabsBtn = (i) =>{
    setTabs(i);
  }
  
  return (
    <>
      <div className="Pokemon-Tabs Tabs">
        <div className="Tabs-wrapper">
          <ul className="Tabs-ul">
            <li className="Tabs-li">
              <button onClick={() => tabsBtn(0)} className={tabs === 0 ? 'Tabs-btn isActive' : 'Tabs-btn'}>General</button>
            </li>
            <li>
              <button onClick={() => tabsBtn(1)} className={tabs === 1 ? 'Tabs-btn isActive' : 'Tabs-btn'}>Abilities</button>
            </li>
          </ul>
          <div className="Tabs-Content Content">
            {tabs == 0 && <ul className="Content-ul isAvailable">
              <li className='Content-li'>Height : {height} m </li>
              <li className='Content-li'>Weight : {weight} kg </li>
              <li className='Content-li'>Base experience : {base_experience}</li>

            </ul>
            }
            {tabs == 1 && <ul className="Content-ul isAvailable">
              {abilities.length == 0 && <p> No special features </p> }
              {abilities.length != 0 && abilities.map ((eachAbility)=>
              <AbilitiesList key={eachAbility.slot} {...eachAbility}/>
              )}
              
            </ul>}

          </div>

        </div>

      </div>
    </>
  )
}

const AbilitiesList = (props)=>{

  const { ability} = props
  const [habilidad , setHabilidad] =useState(null)

  const pedirDatos = async () =>{
    let controller = new AbortController()
    let options= {
      method : 'get',
      signal : controller.signal
    }

    await fetch( ability.url , options)
    .then (res => res.json())
    .then (data => setHabilidad(data))
    .catch (err => console.log(err))
    .finally (()=> controller.abort())


  }


  useEffect(()=>{
    pedirDatos()
  }, [ability.url])


  return(
    <>
    <HabilidadContext.Provider value={habilidad}>
    <li className='Content-li'> {ability.name} : 
    {!habilidad && <p>No have special features</p> }
    {habilidad && <Hablididad/>}
     </li>
     </HabilidadContext.Provider>
    </>
  )

}

const Hablididad = ()=>{
  const {effect_entries} = useContext(HabilidadContext)

  
 
  return(
    <>
     {effect_entries == 0 && <p>Ningún efecto</p> }
     {effect_entries != 0 && effect_entries.map((eachEfecto)=>
     <Efectos  key={eachEfecto.id} {...eachEfecto}/>
    )}

    </>
  )
}

const Efectos = (props)=>{
  
  const {effect , language} = props
 const {name} = language

  
  return(
    <> 
      <p className='Content-p'>{name === 'en' ? effect : ''} </p>
    </>
  )
}