import Vision from '@/components/Vision'
import Nav from '../components/Nav'
import Hero from '@/components/Hero'
import Personas from '@/components/Personas'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

const Index = () => {
    return (
        <div className='min-h-screen bg-background'>
            <Nav />
            <main>
                <Hero />
                <Vision />
                <Personas />
                <Pricing />
                <Footer />
            </main>
        </div>
    )
}

export default Index