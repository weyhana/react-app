import Link from "next/link";

export default function Tables() {
    return (
       <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        
       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="flex flex-row" >
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
                            <th scope="col" className="px-6 py-3 font-medium">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Apple MacBook Pro 17
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className   ="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Google Pixel Phone
                            </th>
                            <td className="px-6 py-4">
                                Gray
                            </td>
                            <td className="px-6 py-4">
                                Phone
                            </td>
                            <td className="px-6 py-4">
                                $799
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">
                                Red
                            </td>
                            <td className="px-6 py-4">
                                Wearables
                            </td>
                            <td className="px-6 py-4">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-fg-brand hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </main>
        </div>
    );
}