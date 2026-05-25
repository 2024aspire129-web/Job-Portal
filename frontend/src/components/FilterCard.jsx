import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { clearJobFilters, setJobFilter, setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        name: "location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Noida", "Gurgaon", "Kolkata", "Indore", "Bhopal", "Ahmedabad", "Jaipur", "Remote"]
    },
    {
        filterType: "Industry",
        name: "industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "Cyber Security", "Cloud Computing", "DevOps Engineer", "Software Engineer", "Android Developer", "Java Developer", "Python Developer", "UI/UX Designer"]
    },
    {
        filterType: "Salary",
        name: "salary",
        array: ["0 - 5L", "5L - 10L", "10L - 15L", "15L+"]
    },
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const filters = useSelector(store => store.job.filters || { location: "", industry: "", salary: "" });

    const changeHandler = (name, value) => {
        dispatch(setJobFilter({ name, value }));
    }

    const removeFilterHandler = (name) => {
        dispatch(setJobFilter({ name, value: "" }));
    }

    return (
        <div className='w-full rounded-md bg-white p-3'>
            <div className='flex items-center justify-between gap-2'>
                <h1 className='font-bold text-base'>Filter Jobs</h1>
                <Button type='button' variant='ghost' size='sm' onClick={() => { dispatch(clearJobFilters()); dispatch(setSearchedQuery('')); }} className='h-8 px-2 text-xs'>Clear</Button>
            </div>
            <hr className='mt-2' />
            <div className='space-y-3'>
                {
                    filterData.map((data, index) => (
                        <div key={data.filterType}>
                            <h1 className='mb-1.5 mt-2.5 font-bold text-sm'>{data.filterType}</h1>
                            <RadioGroup value={filters[data.name]} onValueChange={(value) => changeHandler(data.name, value)} className='gap-1'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div
                                                key={itemId}
                                                onClickCapture={(event) => {
                                                    if (filters[data.name] === item) {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        removeFilterHandler(data.name);
                                                    }
                                                }}
                                                className='flex items-center space-x-2 rounded-sm py-0.5'
                                            >
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId} className='cursor-pointer text-sm'>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard
