import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const salaryInRange = (salary, range) => {
    const value = Number(salary);
    if (!range) return true;
    if (range === '0 - 5L') return value <= 5;
    if (range === '5L - 10L') return value >= 5 && value <= 10;
    if (range === '10L - 15L') return value >= 10 && value <= 15;
    if (range === '15L+') return value >= 15;
    return true;
}

const includesText = (value, query) => value?.toLowerCase().includes(query.toLowerCase());

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const filters = useSelector(store => store.job.filters || { location: '', industry: '', salary: '' });
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        const filteredJobs = allJobs.filter((job) => {
            const matchesSearch = searchedQuery
                ? includesText(job.title, searchedQuery) ||
                  includesText(job.description, searchedQuery) ||
                  includesText(job.location, searchedQuery) ||
                  job.requirements?.some((skill) => includesText(skill, searchedQuery))
                : true;

            const matchesLocation = filters.location
                ? includesText(job.location, filters.location)
                : true;

            const matchesIndustry = filters.industry
                ? includesText(job.title, filters.industry) ||
                  includesText(job.description, filters.industry) ||
                  job.requirements?.some((skill) => includesText(skill, filters.industry))
                : true;

            const matchesSalary = salaryInRange(job.salary, filters.salary);

            return matchesSearch && matchesLocation && matchesIndustry && matchesSalary;
        });

        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, filters]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-64 shrink-0'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs