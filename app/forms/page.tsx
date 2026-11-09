"use client";

import { useState, ChangeEvent, SyntheticEvent } from "react";
import Link from "next/link";

const initialState = {
  first_name: "",
  last_name: "",
  company: "",
  phone: "",
  website: "",
  visitors: "",
  email: "",
  password: "",
  confirm_password: "",
  remember: false,
};

export default function Forms() {

    const [formData, setFormData] = useState(initialState);
    const [isMessage, setIsMessage] = useState(false);

  // Appelée à chaque modification d'un champ
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value,checked,type } = e.target;
    setFormData((prev) => ({
      ...prev,
  [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Appelée quand on clique sur Submit
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // empêche le rechargement de la page

    if (formData.password !== formData.confirm_password) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }

    console.log(formData); // affiche les champs renseignés
    // setFormData(initialState); // réinitialise le formulaire
    setIsMessage(true); // Affiche le message de succès
    setTimeout(() => {
      setIsMessage(false); // Masque le message de succès après 3 secondes
      setFormData(initialState); // Réinitialise le formulaire
    }, 10000);
  };
  

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row" >
          <Link href="/about" type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mr-5 mb-5">About</Link>
          <Link href="/dashboard" type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] leading-5 mb-5">Dashboard</Link>
          <Link href="/forms" type="button" className="inline-flex items-center  text-white bg-blue-500 hover:bg-blue-600 box-border border border-transparent focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none rounded-[10px] ml-5 mb-5">
            Forms</Link>
            <Link href="/tables"  type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center rounded-[10px] ml-5 mb-5 leading-5">
              Tables
            </Link>
        </div>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">First name</label>
              <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={(handleChange)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="John" required />
            </div>
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">Last name</label>
              <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Doe" required />
            </div>
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">Company</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Flowbite" required />
            </div>
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">Phone number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
            </div>
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">Website URL</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="flowbite.com" required />
            </div>
            <div>
              <label className="block mb-2.5 text-sm font-medium text-heading">Unique visitors (per month)</label>
              <input type="number" id="visitors" name="visitors" value={formData.visitors} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2.5 text-sm font-medium text-heading">Email address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="john.doe@company.com" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2.5 text-sm font-medium text-heading">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2.5 text-sm font-medium text-heading">Confirm password</label>
            <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="remember" name="remember" type="checkbox" checked={formData.remember} onChange={handleChange} className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
            </div>
            <label className="ms-2 text-sm font-medium text-heading">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</label>
          </div>
          <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
          {isMessage && (
            <div className="mt-4 text-green-600 font-medium">
              Form submitted successfully!
            </div>
          )}
        </form>
        </main>     
    </div>
  );                        
}
