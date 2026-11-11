"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Submission = {
  first_name: string;
  last_name: string;
  company: string;
  website: string;
  email: string;
};

export default function Tables() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Au chargement de la page, on lit les données du localStorage
  useEffect(() => {
    const saved = localStorage.getItem("formSubmissions");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row">
          <Link href="/about" type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mr-5 mb-5">About</Link>

          <Link href="/dashboard" type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mb-5">Dashboard</Link>

          <Link href="/forms" type="button" className="inline-flex items-center  text-white bg-blue-500 hover:bg-blue-600 box-border border border-transparent focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none rounded-[10px] ml-5 mb-5">
            Forms</Link>

          <Link href="/tables" type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] ml-5 mb-5 leading-5">
            Tables
          </Link>
        </div>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">First name</th>
                <th scope="col" className="px-6 py-3 font-medium">Last name</th>
                <th scope="col" className="px-6 py-3 font-medium">Company</th>
                <th scope="col" className="px-6 py-3 font-medium">Website</th>
                <th scope="col" className="px-6 py-3 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Aucune donnée enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                submissions.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {item.first_name}
                    </th>
                    <td className="px-6 py-4">{item.last_name}</td>
                    <td className="px-6 py-4">{item.company}</td>
                    <td className="px-6 py-4">{item.website}</td>
                    <td className="px-6 py-4">{item.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}