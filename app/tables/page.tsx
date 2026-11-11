"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Submission = {
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  website: string;
  visitors: string;
  email: string;
  remember: boolean;
};

// Petit composant pour afficher une information dans le modal
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-slate-900 dark:text-white">
        {value || "—"}
      </p>
    </div>
  );
}

export default function Tables() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null); // client affiché dans le modal "view"
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null); // ligne à supprimer

  // Au chargement de la page, on lit les données du localStorage
  useEffect(() => {
    const saved = localStorage.getItem("formSubmissions");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSubmissions(JSON.parse(saved));
    }
  }, []);

  // Suppression confirmée : on retire la ligne du tableau ET du localStorage
  const confirmDelete = () => {
    if (deleteIndex === null) return;

    const updated = submissions.filter((_, index) => index !== deleteIndex);
    setSubmissions(updated);
    localStorage.setItem("formSubmissions", JSON.stringify(updated));
    setDeleteIndex(null); // ferme le pop up
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row">
          <Link href="/about" type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mr-5 mb-5">About</Link>

          <Link href="/dashboard" type="button" className="text-white bg-linear-to-r from-green-400 via-green-500 to-green-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mb-5">Dashboard</Link>

          <Link href="/forms" type="button" className="inline-flex items-center  text-white bg-blue-500 hover:bg-blue-600 box-border border border-transparent focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none rounded-[10px] ml-5 mb-5">
            Forms</Link>

          <Link href="/tables" type="button" className="text-white bg-linear-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium text-sm px-4 py-2.5 text-center rounded-[10px] ml-5 mb-5 leading-5">
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
                <th scope="col" className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Bouton VIEW (oeil) */}
                        <button
                          type="button"
                          onClick={() => setSelected(item)}
                          aria-label="Voir les informations"
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100 dark:hover:bg-blue-900/40"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>

                        {/* Bouton SUPPRIMER (poubelle) */}
                        <button
                          type="button"
                          onClick={() => setDeleteIndex(index)}
                          aria-label="Supprimer"
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-100 dark:hover:bg-red-900/40"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ===== MODAL VIEW : détails du client ===== */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)} // clic sur le fond = fermer
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()} // clic dans le modal = ne pas fermer
          >
            {/* En-tête */}
            <div className="relative bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 rounded-full p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-xl font-bold uppercase text-white ring-4 ring-white/30">
                  {selected.first_name.charAt(0)}
                  {selected.last_name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selected.first_name} {selected.last_name}
                  </h2>
                  <p className="text-sm text-blue-100">{selected.company}</p>
                </div>
              </div>
            </div>

            {/* Informations */}
            <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
              <Field label="First name" value={selected.first_name} />
              <Field label="Last name" value={selected.last_name} />
              <Field label="Company" value={selected.company} />
              <Field label="Phone number" value={selected.phone} />
              <Field label="Website URL" value={selected.website} />
              <Field label="Unique visitors (per month)" value={selected.visitors} />
              <div className="sm:col-span-2">
                <Field label="Email address" value={selected.email} />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Terms and conditions"
                  value={selected.remember  ? "Acceptées" : "Non acceptées"}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL SUPPRESSION : confirmation ===== */}
      {deleteIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setDeleteIndex(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Êtes-vous sûr de vouloir supprimer les informations ?
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Cette action est définitive.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteIndex(null)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}