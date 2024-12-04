"use client"

import Link from "next/link"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/passwordInput"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { AuthenticateWithRedirectCallback, useSignIn, useUser } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/nextjs/server"
import { useRouter, useSearchParams, redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { FormEvent, KeyboardEvent, useState } from "react"
import { toast } from "sonner"
import signinSchema from "@/schemas/signin"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const redirect_url = searchParams.get("redirect_url") || "/"

  async function handleSignin(data: SignInFormInputs) {
    console.log(data)
    if (!isLoaded) {
      return
    }
    setLoading(true)

    await signIn
      ?.create({
        identifier: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId }).then(() => {
            router.push(redirect_url)
          })
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        console.log(err)
        if (err?.errors?.[0]?.message === "Invalid verification strategy")
          setError("This email is registered with Google or Facebook. Please sign in with them.")
        else if (err?.errors?.[0]?.message) setError(err?.errors?.[0]?.message)
        else if (err?.errors?.[0]?.longMessage) setError(err?.errors?.[0]?.longMessage)
        else toast.error("Something went wrong, please try again.")
      })
      .finally(() => setLoading(false))
  }

  type SignInFormInputs = z.infer<typeof signinSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = async (data: SignInFormInputs) => {
    setLoading(true)
    try {
      await handleSignin(data)
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
      <div className="flex flex-col justify-between rounded-lg ">
        <div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                placeholder="john.doe@gmail.com"
                type="email"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <PasswordInput
                {...register("password")}
                id="password"
                placeholder="********"
                type="password"
              />
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <label className="text-sm font-medium" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <Link className="text-sm text-primary hover:underline" href="#">
                Forgot Password
              </Link>
            </div>
            <Button className="w-full" disabled={loading} type="submit">
              Login
            </Button>
            <p className="text-xs text-red-600">{error}</p>
          </form>
        </div>
        <div className="mt-6">
          <p className="text-center text-sm">
            Don't have an account ? &nbsp;&nbsp;
            <Link className="text-primary hover:underline" href="/signup">
              Sign up
            </Link>
          </p>
          <p className="py-4 text-center">Or sign in with</p>

          <div className="mt-4 flex items-center justify-center space-x-4">
            <FacebookSignin />
            <GoogleSignin redirect_url={redirect_url} />
          </div>
        </div>
      </div>
    </div>
  )
}

const GoogleSignin = ({ redirect_url }: { redirect_url: string }) => {
  const { signIn } = useSignIn()

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: redirect_url,
      redirectUrlComplete: redirect_url,
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
