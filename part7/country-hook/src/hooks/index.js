import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name !== ""){
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                console.log(response)
                setCountry(response.data)
            })}
    }, [name])

    if (name === ""){
        return null
    }

    if (!country) {
        return []
    }

    return country
}