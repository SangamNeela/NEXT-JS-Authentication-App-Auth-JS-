"use client"

import { useSearchParams } from "next/navigation"

enum Error {
  OAuthAccountNotLinked = "OAuthAccountNotLinked",
  // ... other error types
}

const errorMap = {
  [Error.OAuthAccountNotLinked]: (
    <p>
      There was a problem when trying to link your OAuth account. This typically occurs when an email address is already associated with an account but the OAuth account is not linked to it. For security reasons, Auth.js does not automatically link OAuth accounts to existing accounts.
    </p>
  ),
  // ... other error messages
}

export default function AuthErrorPage() {
  const search = useSearchParams()
  const error = search.get("error") as Error

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Authentication Error
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || "An unknown error occurred. Please try again or contact support."}
        </div>
      </div>
    </div>
  )
}