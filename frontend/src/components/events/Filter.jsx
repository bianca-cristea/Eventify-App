import { FormControl, InputLabel, MenuItem , Select, Tooltip, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {FiArrowUp, FiArrowDown, FiRefreshCcw, FiSearch} from "react-icons/fi"
import { useDispatch } from 'react-redux';
import {useSearchParams, useLocation, useNavigate} from 'react-router-dom';

const Filter = ({categories}) => {

   
  const [searchParams] = useSearchParams(); // da acces la param din url
  const params = new URLSearchParams(searchParams); // e o copie de search params pe care o poti modif , fara sa schimbi originalul
 
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all"
    const currentSortOrder = searchParams.get("sortOrder") || "asc"
    const currentKeyword = searchParams.get("keyword") || ""


    setCategory(currentCategory)
    setSortOrder(currentSortOrder)
    setSearchTerm(currentKeyword)
  }, [searchParams])



  const [category, setCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

 
  useEffect(() => {

    const handler = setTimeout(() => {
      if(searchTerm){
        searchParams.set("keyword", searchTerm)
      }
      else {
        searchParams.delete("keyword") 
      }
      navigate(`${pathname}?${searchParams.toString()}`)
    }, 700) //ca sa aiba timp userul sa tasteze

    return () => clearTimeout(handler)
  }, [searchParams, searchTerm, navigate, pathname])



  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if(selectedCategory === "all"){
      params.delete("category")
      navigate(`${pathname}?${params}`) 
    } else {
        params.set("category", selectedCategory)
        navigate(`${pathname}?${params}`)
    }

    setCategory(event.target.value)
  }

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc"
      params.set("sortOrder",newOrder)
      navigate(`${pathname}?${params}`)
      return newOrder
    })
  }
 
  const handleClearFilters = () => { 
      navigate({pathname: window.location.pathname}) 
  }


  return (
    <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4'>
       {/* Search bar */}
       <div className='relative flex items-center 2xl:w-[450] sm:w-[420] w-full'>
          <input 
              type='text' 
              placeholder='Search products' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border border-gray-400 text-white rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]'/>
          <FiSearch className='absolute left-3 text-slate-100 size={20}'/>
       </div>

       {/* Select category */}
       <div className='flex sm:flex-row flex-col gap-4 items-center'>
          <FormControl  
              variant="outlined"
              size='small'>
                 <InputLabel id="category-select-label">Category</InputLabel>
                 <Select
                    labelId="category-select-label"
                    value={category}
                    onChange = {handleCategoryChange}
                    label="Category"
                    className='min-w-[120]'>
                        <MenuItem value="all">All</MenuItem>
                        {categories.map(item => 
                          (
                            <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>
                          ))}
                 </Select>
          </FormControl>

          {/* Sort button & CLEAR FILTER*/}
          <Tooltip title={sortOrder === "asc" ? ("Sorted by price: asc") : ("Sorted by price: desc")}>
              <Button variant='contained' 
                color='primary' 
                className='flex items-center gap-2 h-10'
                onClick={toggleSortOrder}>
                Sort by
                {
                  sortOrder === "asc" ? (<FiArrowUp size={20}/>) : (<FiArrowDown size={20}/>)
                }
              </Button>
          </Tooltip>
          <button 
             className='flex rounded-md items-center gap-2 bg-rose-900 text-white px-3 py-2 transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer'
             onClick={handleClearFilters}>
              <FiRefreshCcw className='font-semibold' size={20}/>
              <span className='font-semibold'>Clear filter</span>
          </button>                  

       </div>
    </div>
  )
}

export default Filter
