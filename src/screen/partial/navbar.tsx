import {PyxNavbar} from 'pyx';

function NavBarPartialScreen () {
  return (
    <PyxNavbar logo='LOGO' links={[
      <a href='#'>Jobs</a>,
      <a href='#'>Interviews</a>
    ]} />
  )
}

export default NavBarPartialScreen;