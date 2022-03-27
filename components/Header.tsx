import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="item-center flex space-x-10">
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://links.papareact.com/yvf"
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>Our Story</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-gradient-to-r from-[#cc0000] to-[#fcbc2d] px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 font-semibold text-[#fcbc2d]">
        <h3>Sign In</h3>
        <h3 className="rounded-full border border-[#fcbc2d] px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
