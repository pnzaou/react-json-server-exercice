import React, { useEffect, useState } from 'react'
import BugerItem from './BugerItem'
import useBurgers from '../hooks/burger.hook'

const BurgersList = () => {
    const burgers = useBurgers()
    const [pasArchivé, setPasArchivé] = useState([])

    useEffect(() => {
        setPasArchivé(burgers.filter(burger => burger.archived === false))
    }, [burgers])

    return (
        <div className='mt-4 mb-4'>
            <h1 className='text-center'>Liste de nos burgers</h1>
            <div className='row'>
                {pasArchivé.map(burger => (
                    <BugerItem key={burger.id} burger={burger} />
                ))}
            </div>
        </div>
    )
}

export default BurgersList
