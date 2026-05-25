import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Briefcase, IndianRupee, MapPin } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const companyName = job?.company?.name || 'Company';
    const companyInitial = companyName.charAt(0).toUpperCase();
    const skills = job?.requirements?.slice(0, 3) || [];

    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='group flex h-full cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6A38C2]/30 hover:shadow-xl'>
            <div>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-11 w-11 items-center justify-center rounded-md bg-[#6A38C2]/10 text-base font-bold text-[#6A38C2]'>
                            {companyInitial}
                        </div>
                        <div>
                            <h1 className='line-clamp-1 text-base font-semibold text-gray-900'>{companyName}</h1>
                            <p className='flex items-center gap-1 text-sm text-gray-500'>
                                <MapPin className='h-3.5 w-3.5' />
                                {job?.location || job?.company?.location || 'India'}
                            </p>
                        </div>
                    </div>
                    <ArrowUpRight className='h-5 w-5 text-gray-400 transition-colors group-hover:text-[#6A38C2]' />
                </div>

                <div className='mt-5'>
                    <h1 className='line-clamp-2 text-xl font-bold text-gray-950'>{job?.title}</h1>
                    <p className='mt-2 line-clamp-3 min-h-[60px] text-sm leading-5 text-gray-600'>{job?.description}</p>
                </div>

                <div className='mt-4 flex flex-wrap gap-2'>
                    {skills.map((skill) => (
                        <Badge key={skill} variant='secondary' className='rounded-md bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/10'>
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className='mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-sm'>
                <div>
                    <p className='flex items-center gap-1 text-xs text-gray-500'><IndianRupee className='h-3 w-3' /> Salary</p>
                    <p className='font-semibold text-gray-900'>{job?.salary} LPA</p>
                </div>
                <div>
                    <p className='flex items-center gap-1 text-xs text-gray-500'><Briefcase className='h-3 w-3' /> Type</p>
                    <p className='font-semibold text-gray-900'>{job?.jobType}</p>
                </div>
                <div>
                    <p className='text-xs text-gray-500'>Openings</p>
                    <p className='font-semibold text-gray-900'>{job?.position}</p>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards