import {PyxNavbar} from 'pyx';
import { useState } from 'react';
import { NavLink } from 'react-router';

function NavBarPartialScreen () {
  const [open, setOpen] = useState(false);
  return (
    <PyxNavbar open={open} toggle={setOpen} logo='LOGO' links={[
      <NavLink to='/' onClick={() => {setOpen(false)}}>Jobs</NavLink>,
      <NavLink to='/interviews' onClick={() => {setOpen(false)}}>Interviews</NavLink>
    ]} />
  )
}

export default NavBarPartialScreen;