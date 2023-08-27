/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findDog } from '../../Redux/actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const [_dog, setDog] = useState('')
    const dispatch = useDispatch()
    function handleChange(event) {
        setDog(event.target.value);
        dispatch(findDog(event.target.value))
    }
    return (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchInput} type='search' onChange={handleChange} placeholder="Buscar perro" />
        </div>
    );
}