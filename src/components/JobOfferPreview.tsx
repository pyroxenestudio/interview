import { memo } from "react";
import { NavLink } from "react-router";

interface JobOfferPreviewInterface {
  company: string;
  createdDate: Date;
  interviews: number;
  nextMeeting: Date;
  location: string;
  link: string;
  id: number;
}

export default memo(function JobOfferPreview({company, createdDate, interviews, nextMeeting, location, link, id}: JobOfferPreviewInterface) {

  const list = [
    interviews ? <li><span>Interviews: {interviews}</span></li> : null,
    nextMeeting ? <li><span>next Meeting: {nextMeeting.toString()}</span></li> : null,
    location ? <li><span>location: {location}</span></li> : null,
    link ? <li><span>link: {link}</span></li> : null
  ];

  return (
    <div className='pyx-block level-1 rounded-xl'>
      <header className='flex justify-between level-2 p-2 rounded-t-xl'>
        <NavLink to={`/job/${id}`}><h2>{company}</h2></NavLink>
        <span>{createdDate.toString()}</span>
      </header>
      <section className='p-2'>
        <ul>
          {list}
        </ul>
      </section>
    </div>
  );
})