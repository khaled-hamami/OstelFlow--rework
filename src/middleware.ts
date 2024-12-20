import { authMiddleware } from "@clerk/nextjs"
export default authMiddleware({
  publicRoutes: ["/", "/signin", "/signup", "/hotels"],
  signInUrl: "/signin",
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
