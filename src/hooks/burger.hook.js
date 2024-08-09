import React, { useState, useEffect } from "react";

const useBurgers = () => {
    const [burgers, setBurgers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/burgers')
        .then(rep => rep.json())
        .then(data => setBurgers(data))
    }, [])

    return burgers
}

export default useBurgers