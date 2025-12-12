import Vision from '@/components/Vision'
import Nav from '../components/Nav'
import Hero from '@/components/Hero'
import Personas from '@/components/Personas'

const Index = () => {
    return (
        <div className='min-h-screen bg-background'>
            <Nav />
            <main>
                <Hero />
                <Vision />
                <Personas />
            </main>
        </div>
    )
}

export default Index