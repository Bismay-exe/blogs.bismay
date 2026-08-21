import TwitterEmbed from './[slug]/components/sections/mainLayout/embeds/Twitterembed'

const page = () => {
  return (
    <div>
      <TwitterEmbed url="https://x.com/Bismay_exe/status/2050262576093958327" variant="card1" />
      <TwitterEmbed url="https://x.com/Bismay_exe/status/2050262576093958327" />
      <TwitterEmbed url="https://x.com/Bismay_exe" variant="card2" />
    </div>
  )
}

export default page
