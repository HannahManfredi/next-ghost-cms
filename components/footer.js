import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 w-full">
      <div className="flex w-full py-4">
        <div className="flex w-1/2 px-5">
          <Link href="/blogpages/[slug]" as="/blogpages/copyright">
            <a className="text-white">Copyright</a>
          </Link>
        </div>
        <div className="flex w-1/2 justify-end"></div>
      </div>
    </footer>
  )
}
