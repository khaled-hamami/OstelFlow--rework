"use client"

import Link from "next/link"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/passwordInput"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { FormEvent, KeyboardEvent, useState } from "react"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/nextjs/server"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"
import signupSchema from "@/schemas/signup"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (data: SignUpFormInputs) => {
    if (!isLoaded) {
      return
    }
    try {
      setLoading(true)
      await signUp?.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setPendingVerification(true)

      // .then((result) => {
      //   if (result.status === "complete") {
      //     console.log(result)
      //     setActive({ session: result.createdSessionId }).then(() => {
      //       router.push("/")
      //     })
      //   } else {
      //     throw new Error()
      //   }
      // })
    } catch (err: any) {
      console.log(err)
      if (err?.errors && err.errors?.[0]?.message === "Invalid verification strategy")
        setError("This email is registered with Google or Facebook. Please sign in with them.")
      else if (err?.errors && err.errors?.[0]?.longMessage) setError(err.errors?.[0]?.longMessage)
      else toast.error("Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded) return
    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({ code: code })

      if (completeSignup.status !== "complete") {
      }
      if (completeSignup.status === "complete") {
        await setActive({ session: completeSignup.createdSessionId })
        router.push("/")
      }
    } catch (err: any) {}
  }

  type SignUpFormInputs = z.infer<typeof signupSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignUpFormInputs) => {
    setLoading(true)
    try {
      await handleSignup(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An error occurred")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full">
      {!pendingVerification ? (
        <div className="flex flex-col justify-between rounded-lg ">
          <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="FirstName">
                    First Name
                  </label>
                  <Input {...register("firstName")} id="FirstName" placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="LastName">
                    Last Name
                  </label>
                  <Input {...register("lastName")} id="LastName" placeholder="Doe" />
                  {errors.lastName && (
                    <p className="text-xs text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="john.doe@gmail.com"
                  type="email"
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <PasswordInput
                  {...register("password")}
                  id="password"
                  placeholder="********"
                  type="password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="termsOfService" />
                  <label className="text-sm font-medium" htmlFor="termsOfService">
                    <span>
                      I agree to all the <span className=" text-primary">Terms</span> and
                      <span className="text-primary"> Privacy Policies</span>
                    </span>
                  </label>
                </div>
              </div>
              <Button disabled={loading} className="w-full" type="submit">
                Create an account
              </Button>
              <p className="text-xs text-red-600">{error}</p>
            </form>
            <form className="mt-8 space-y-6" onSubmit={handleVerify}></form>
          </div>
          <div className="mt-6">
            <p className="text-center text-sm">
              Already have an account ? &nbsp;&nbsp;
              <Link className="text-primary hover:underline" href="/signin">
                Sign in
              </Link>
            </p>
            <p className="py-4 text-center">Or sign in with</p>

            <div className="mt-4 flex items-center justify-center space-x-4">
              <FacebookSignin />
              <GoogleSignin />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between rounded-lg ">
          <div>
            <form className="mt-8 space-y-6" onSubmit={handleVerify}>
              <label className="text-sm font-medium" htmlFor="confirmationCode">
                Confirmation code
              </label>
              <Input
                onChange={(e) => {
                  setCode(e.target.value)
                }}
                value={code}
                required
                id="confirmationCode"
                placeholder="********"
              />
              <Button type="submit">Confirm</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const GoogleSignin = () => {
  const { signIn } = useSignIn()

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    })
  }

  return (
    <Button className="flex-1" variant="outline" onClick={() => signInWith("oauth_google")}>
      <GoogleIcon />
    </Button>
  )
}

const FacebookSignin = () => {
  return (
    <Button className="flex-1" variant="outline">
      <FacebookIcon />
    </Button>
  )
}

const GoogleIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#FFC107"
      />
      <path
        d="M3.15234 7.3455L6.43784 9.755C7.32684 7.554 9.47984 6 11.9993 6C13.5288 6 14.9203 6.577 15.9798 7.5195L18.8083 4.691C17.0223 3.0265 14.6333 2 11.9993 2C8.15834 2 4.82734 4.1685 3.15234 7.3455Z"
        fill="#FF3D00"
      />
      <path
        d="M12.0002 22.0003C14.5832 22.0003 16.9302 21.0118 18.7047 19.4043L15.6097 16.7853C14.5719 17.5745 13.3039 18.0014 12.0002 18.0003C9.39916 18.0003 7.19066 16.3418 6.35866 14.0273L3.09766 16.5398C4.75266 19.7783 8.11366 22.0003 12.0002 22.0003Z"
        fill="#4CAF50"
      />
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#1976D2"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M24 12.0733C24 5.40546 18.6274 0 12 0C5.37262 0 0 5.40536 0 12.0733C0 18.0994 4.38825 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41343C10.125 6.38755 11.9166 4.71615 14.6575 4.71615C15.9705 4.71615 17.3438 4.95195 17.3438 4.95195V7.92313H15.8306C14.3398 7.92313 13.875 8.85381 13.875 9.80864V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6117 23.0943 24 18.0995 24 12.0733Z"
        fill="#1877F2"
      />
    </svg>
  )
}
