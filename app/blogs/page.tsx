import TwitterEmbed from './[slug]/components/sections/mainLayout/embeds/Twitterembed'

const page = () => {
  return (
    <div className='w-full flex justify-center items-center'>
    <div className='w-full max-w-4xl flex flex-col items-center gap-2 p-5'>
      <TwitterEmbed url="https://x.com/Bismay_exe/status/2050262576093958327" variant="card1" />
      <TwitterEmbed url="https://x.com/Bismay_exe/status/2050262576093958327" />
      <TwitterEmbed url="https://x.com/Bismay_exe" variant="card2" />
    </div></div>
  )
}

export default page
