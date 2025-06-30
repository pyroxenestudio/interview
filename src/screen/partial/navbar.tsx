import {PyxNavbar} from 'pyx';
import { NavLink } from 'react-router';

function NavBarPartialScreen () {
  return (
    <PyxNavbar logo='LOGO' links={[
      <NavLink to='/'>Jobs</NavLink>,
      <NavLink to='/interviews'>Interviews</NavLink>,
      <NavLink to='/job/add'>Add Job</NavLink>
    ]} />
  )
}

export default NavBarPartialScreen;