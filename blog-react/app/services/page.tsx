import servicesData from '@/data/servicesData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Services' })

export default function Services() {
    return (
      <>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
              Services
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Oculus Working on following services 
            </p>
          </div>
          <div className="container py-12">
            <div className="-m-12 flex flex-wrap">
              {servicesData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                //  href={d.href}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
