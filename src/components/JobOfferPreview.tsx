import { memo } from "react";
import { NavLink } from "react-router";
import {LinkIcon, MapPinIcon, CalendarIcon, InformationCircleIcon} from '@heroicons/react/16/solid';

interface JobOfferPreviewInterface {
  company: string;
  position: string;
  createdDate: Date;
  interviews: number;
  nextMeeting?: Date;
  location?: string;
  link?: string;
  id: number;
}

export default memo(function JobOfferPreview({company, position, createdDate, interviews, nextMeeting, location, link, id}: JobOfferPreviewInterface) {

  const list = [
    <li className='flex my-2'>Interviews: {interviews ? interviews : 0}</li>,
    nextMeeting ? <li className='flex my-2 items-center'><CalendarIcon className='size-5'/>{nextMeeting.toString()}</li> : null,
    location ? <li className='flex my-2 items-center'><MapPinIcon className='size-5'/><a href={location}>Location Link</a></li> : null,
    link ? <li className='flex my-2 items-center'><LinkIcon className='size-5'/><a href={link}>Meeting Link</a></li> : null
  ];

  return (
    <div className='pyx-block level-1 rounded-xl p-2'>
      <header className='flex justify-between rounded-t-xl mb-3'>
        <div className='text-left'>
          <h2 className='text-xl font-medium my-1'>{<NavLink to={`/job/${id}`}><h2>{position}</h2></NavLink> }</h2>
          <h3 className='text-lg font-light'>{<NavLink to={`/job/${id}`} className='flex items-center'><h2>{company}</h2></NavLink> }</h3>
        </div>
      </header>
      <section className='text-left'>
        {!interviews && <p className='flex items-center text-sky-900'><InformationCircleIcon className='size-5 mr-1' /><span>There aren't any meeting yet</span></p>}
        {nextMeeting && <ul>
          {list}
        </ul>}
      </section>
    </div>
  );
})