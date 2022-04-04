import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="nav">
      <Link passHref  href="/" ><div className="logo"></div></Link>
    </div>
  )
}

export default Navbar;