import SparklesText from '../magicui/sparkles-text'
function Header() {
  return (
    <>
    <SparklesText className='md:hidden relative text-3xl' text="KB" />
    <SparklesText className='hidden md:block relative text-3xl' text="KnowledgeBridge" />
    </>
  )
}

export default Header