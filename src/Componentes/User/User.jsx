import { useEffect, useState } from 'react'
import './User.css'
const {VITE_USERS} = import.meta.env

export const User = () => {

    const [users, setUsers] = useState([])

    const pedirDatos = async () => {
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }

        await fetch( VITE_USERS, options)
            .then(res => res.json())
            .then(data => {
                setUsers(data.results)
            })
            .catch(err => console.log(err))
            .finally(() => controller.abort())
    }

    useEffect(() => {
        pedirDatos()
    }, [])



    return (
        <>  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Hinge_logo.svg/1200px-Hinge_logo.svg.png" alt="Hinge app de citas" className="Container-img" />

            <div className="Container">

                {users.lenght == 0 && <p>No hay usuarios</p>}
                {users.length != 0 && users.map((eachUser) =>
                    <Persona key={eachUser.login.uuid}{...eachUser} />
                )}

            </div>
        </>
    )
}

const Persona = (props) => {
    const { gender, picture, name, location, email, phone, nat, dob} = props
    return (
        <>
            <div className="User-card">
                <Picture {...picture} />
                <div className="User-info">
                    <div className="User-text">
                        <Name  {...name} />
                        <Location {...location} />

                        <p className='User-p'> My gender is {gender} </p>
                    </div>
                  

                   
                </div> 
                
                <div className="User-overlay">
                    <ul className="User-ul">
                        <li className="User-li"> <span className="User-span">Contact :</span>   {email}</li>
                        <li className="User-li"> <span className="User-span">Phone :</span>   {phone} </li>
                        <li className="User-li"> <span className="User-span">Nationality: </span> {nat} </li>
                        <li className="User-li"> <Birth  {...dob}/>  </li>
                    </ul>
               
                </div>

            </div>
          
        </>
    )
}

const Picture = (props) => {
    const { large, medium, thumbnail , name } = props
    return (
        <>
            <img src={large} alt={name} className="User-img" loading='lazy' />
        </>
    )
}

const Name = (props) => {
    const { title, first, last } = props
    return (
        <>
            <div className="User-name">
                <h2 className="User-h2"> {title}.</h2>
                <h2 className="User-h2"> {first}</h2>
                <h2 className="User-h2"> {last}</h2>
            </div>
        </>
    )
}

const Location = (props) => {
    const { city, country } = props
    return (
        <>
            <div className="User-location">
                <p className='User-p' >I live in {city} 🌏 {country} </p>
            </div>

        </>
    )
}

const Birth = (props) =>{
    const { age , date} = props
    return(
        <>
        <p className='Birth-p'>I'm {age} years old and my birthday is {date} </p>
        <p className='Birth-p'>Don't forget to congratulate me on my birthday😉</p>
        </>
    )
}