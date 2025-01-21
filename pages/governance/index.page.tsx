import React from 'react';
import { getLayout } from '~/components/SiteLayout';
import { SectionContext } from '~/context';
import Accordion from '~/components/Accordion';
import fs from 'fs';
import path from 'path';
// import Image from 'next/image';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'governance.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const governanceData = JSON.parse(fileContents);

  return {
    props: {
      governanceData,
    },
  };
}

export default function GovernancePage({
  governanceData,
}: {
  governanceData: any;
}) {
  const { header, sections, faq } = governanceData;

  return (
    <SectionContext.Provider value='governance'>
      <div
        className='max-w-screen-xl block px-4 sm:px-6 lg:px-8 mx-auto w-full'
        data-testid='Container-main'
      >
        {/* Header Section */}
        <div
          className='flex flex-col items-center justify-between lg:flex-row mt-20'
          data-testid='Governance-main'
        >
          <div
            className='w-full text-center lg:w-[45%] lg:text-left'
            data-testid='Governance-content'
          >
            <h1
              className='mt-10 text-h2 font-semibold md:text-4xl lg:text-5xl'
              data-testid='Governance-title'
            >
              {header.title}
            </h1>
            <p className='mt-5 text-slate-700 text-lg dark:text-slate-100'>
              {header.description}
            </p>
            <div data-testid='Governance-button'>
              <a
                className='mt-10 inline-block px-6 py-3 bg-blue-600 text-white font-semibold text-center rounded hover:bg-blue-700 transition duration-300'
                href={header.buttonLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                {header.buttonText}
              </a>
            </div>
          </div>

          {/* Banner */}
          <div className='hidden w-1/2 lg:block'>
            {/* <Image
              src={header.bannerImage}
              alt='Governance Banner'
              title='Governance Banner'
              className='w-full pt-10'
              layout='intrinsic'
            /> */}
          </div>
        </div>

        {/* Governance Sections */}
        <div className='mt-10'>
          {sections.map((section: any, index: number) => (
            <section key={index} className='mt-10'>
              <h2 className='text-h3 font-bold text-gray-900 dark:text-white'>
                {section.title}
              </h2>
              <p className='mt-5 text-lg text-gray-700 dark:text-slate-100'>
                {section.content}
              </p>
              {section.links && (
                <ul className='list-disc ml-6 mt-5 text-lg text-blue-700 dark:text-blue-300'>
                  {section.links.map((link: any, i: number) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        <div className='mt-16'>
          <h2 className='text-h3 font-bold text-gray-900 dark:text-white text-center'>
            Frequently Asked Questions
          </h2>
          <div className='mt-10'>
            <Accordion items={faq} />
          </div>
        </div>
      </div>
    </SectionContext.Provider>
  );
}

GovernancePage.getLayout = getLayout;
