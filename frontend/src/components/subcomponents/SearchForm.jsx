
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function SearchForm({searchRef}) {

    let formRef = useRef(0)

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();


    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        if (searchVal.length){
            navigate(`/products?search=${searchVal}`)
        }
    }


    const searchToggle = (e, num) => {
        e.preventDefault()

        let form = formRef.current;
        let inputBar = form.children[0];
        let searchOpen = form.children[3];
        if (num === 1) {
            formRef.current.classList.add('active')
            searchOpen.classList.add('active')
            searchOpen.classList.remove('not-active')
            searchRef.current.forEach(x => x? x.classList.add('active') : null);
            inputBar.focus()
        } 
        if (num === 0 ) {
            formRef.current.classList.remove('active')
            searchOpen.classList.replace('active' , 'not-active')
            searchRef.current.forEach(x => x? x.classList.remove('active') : null);
            inputBar.blur();    
            setSearchVal('')
        }
    }

    useEffect( () => {
        document.addEventListener('click', e => {
            if (formRef.current && !formRef.current.contains(e.target))
            {
                searchToggle(e, 0)
                formRef.current.classList.remove('active')
            }
        }, { })
    },[])


    return (
        <div className="search-container" >
            <form onSubmit={doSearch} 
                className="search-bar-universal" 
                id="sf"
                ref={formRef}
            >
                <input 
                    placeholder="Search"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    id = "search-bar"
                    type = "search"
                    className = "search-bar"
                    onKeyDown={ e => e.key === "Escape" ? searchToggle(e, 0) : null }
                    />
                <div 
                    className="search-close" 
                    id="search-close" 
                    onClick={e => searchToggle(e, 0)}
                >
                &times;
                </div>
                <button type="submit" className="search-bar-universal" id="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button> 
                <button 
                    type="button"
                    id="search-open"
                    onClick={e => searchToggle(e, 1)}
                    >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-open-icon" />
                </button>

            </form>
        </div>
    )
} 