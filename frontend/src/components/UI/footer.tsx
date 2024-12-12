import Link from "next/link"
import Image from 'next/image';
export default function Component() {
  return (
    <footer className="py-12 mt-32">
      <div className="mx-auto container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Foliode className="h-6 w-6" />
            <p className="text-26 font-normal">Foliode</p>
          </Link>
          <p className="text-muted-foreground">
          Le projet Foliode développe une solution pour les étudiants et enseignants de formations BUT. Il permet de créer et personnaliser un portfolio web, mettant en avant les compétences et projets des étudiants.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Navigation</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Products
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Resources</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline" prefetch={false}>
              Blog
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Documentation
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Support
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Legal</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
      <div className=" mx-auto container max-w-7xl mt-12 border-t pt-6 text-sm text-muted-foreground">
        <p>&copy; 2024 Foliode Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

function Foliode(props) {
  return (
    <Image src="/foliode-icon.svg" alt="logo foliode" width={25} height={25} />
  )
}