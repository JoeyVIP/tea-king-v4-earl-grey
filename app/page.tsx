import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TeaLegend from '@/components/TeaLegend'
import AfternoonTea from '@/components/AfternoonTea'
import Purchase from '@/components/Purchase'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <TeaLegend />
      <AfternoonTea />
      <Purchase />
      <Footer />
    </main>
  )
}
