import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Bookmark, Briefcase, Clock3, IndianRupee, MapPin, Users } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.max(0, Math.floor(timeDifference / (1000 * 24 * 60 * 60)));
    }

    const postedAgo = daysAgoFunction(job?.createdAt);
    const companyName = job?.company?.name || 'Company';
    const companyInitial = companyName.charAt(0).toUpperCase();
    const skills = job?.requirements?.slice(0, 3) || [];

    return (
        <div className='group flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6A38C2]/30 hover:shadow-xl'>
            <div>
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#6A38C2]/10 text-lg font-bold text-[#6A38C2]'>
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
                    <Button variant='outline' className='h-9 w-9 rounded-full p-0' size='icon'>
                        <Bookmark className='h-4 w-4' />
                    </Button>
                </div>

                <div className='mt-5'>
                    <div className='mb-2 flex items-center gap-2 text-xs font-medium text-gray-500'>
                        <Clock3 className='h-3.5 w-3.5' />
                        <span>{postedAgo === 0 ? 'Posted today' : `${postedAgo} days ago`}</span>
                    </div>
                    <h2 className='line-clamp-2 text-xl font-bold text-gray-950'>{job?.title}</h2>
                    <p className='mt-2 line-clamp-3 min-h-[60px] text-sm leading-5 text-gray-600'>{job?.description}</p>
                </div>

                <div className='mt-4 grid grid-cols-3 gap-2 rounded-md bg-gray-50 p-3'>
                    <div className='min-w-0'>
                        <p className='flex items-center gap-1 text-xs text-gray-500'><IndianRupee className='h-3 w-3' /> Salary</p>
                        <p className='truncate text-sm font-semibold text-gray-900'>{job?.salary} LPA</p>
                    </div>
                    <div className='min-w-0'>
                        <p className='flex items-center gap-1 text-xs text-gray-500'><Briefcase className='h-3 w-3' /> Type</p>
                        <p className='truncate text-sm font-semibold text-gray-900'>{job?.jobType}</p>
                    </div>
                    <div className='min-w-0'>
                        <p className='flex items-center gap-1 text-xs text-gray-500'><Users className='h-3 w-3' /> Openings</p>
                        <p className='truncate text-sm font-semibold text-gray-900'>{job?.position}</p>
                    </div>
                </div>

                <div className='mt-4 flex flex-wrap gap-2'>
                    {skills.map((skill) => (
                        <Badge key={skill} variant='secondary' className='rounded-md bg-[#6A38C2]/10 text-[#6A38C2] hover:bg-[#6A38C2]/10'>
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className='mt-5 flex items-center gap-3'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} className='flex-1 bg-[#6A38C2] hover:bg-[#5b2daf]'>
                    View Details
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
                <Button variant='outline' className='flex-1'>Save</Button>
            </div>
        </div>
    )
}

export default Job