import { cn } from "../../lib/utils";
import DotPattern from "../../components/magicui/dot-pattern";
import ShimmerButton from "../../components/magicui/shimmer-button";
import {useNavigate} from 'react-router-dom'
function LandingPage() {

  const navigate = useNavigate()

  function Navigator(){
    navigate('/signup')
  }
  return (
    <>
    <div className="h-screen w-full overflow-hidden">
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl dark:bg-slate-800">
      <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center">
      <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter text-black dark:text-white">Welcome To</p>
        <h1 className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-medium tracking-tighter text-black dark:text-white">Knowledge Bridge</h1>
      </div>
      <p className="mt-[40px] z-10 whitespace-pre-wrap text-center text-lg md:text-2xl font-medium tracking-tighter text-black dark:text-white">filling the gap between students and management</p>
    <div className="z-10 flex min-h-[16rem] items-center justify-center">
      <ShimmerButton onClick={Navigator} className="shadow-2xl mb-[40px]">
          <span className="z-10 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
           Get Started
          </span>
      </ShimmerButton>
    </div>
    <p className="mt-[10px] z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-black dark:text-white">"Connecting Knowledge Creating Success"</p>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
    </div>
</>
  )
}

export default LandingPage