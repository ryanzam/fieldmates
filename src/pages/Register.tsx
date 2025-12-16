import { ArrowLeft, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='mx-auto max-w-md '>
            <div className='flex justify-center items-center flex-col my-8'>
                <MapPin color='#2d9f9f' size={80} className='bg-shadow-primary' />
                <p className='text-white/50'>Register your account</p>
            </div>

            <form action="#" className="space-y-4 rounded-lg bg-primary-dark/50 p-6 shadow-lg shadow-primary/10">
                <div>
                    <label className="w-full text-sm font-medium text-primary-light" htmlFor="name">
                        Full Name
                    </label>

                    <input required className="mt-1 w-full rounded-lg border-primary-dark border-2 px-2 py-1 focus:border-primary focus:outline-none" id="name" type="text" placeholder="Your name" />
                </div>

                <div>
                    <label className="w-full text-sm font-medium text-primary-light" htmlFor="name">
                        Role
                    </label>

                    <input required className="mt-1 w-full rounded-lg border-primary-dark border-2 px-2 py-1 focus:border-primary focus:outline-none" id="role" type="text" placeholder="Your role" />
                </div>

                <div className=''>
                    <label className="text-sm font-medium text-primary-light" htmlFor="email">
                        Email
                    </label>

                    <input required className="mt-1 w-full rounded-lg border-primary-dark border-2 px-2 py-1 focus:border-primary focus:outline-none" id="email" type="email" placeholder="Your email" />
                </div>

                <button className="w-full rounded-lg border bg-primary px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-primary-dark" type="submit">
                    Log In
                </button>
            </form>

            <div className='flex justify-between items-center mt-4 text-sm text-primary-dark'>
                <Link to="/" className='flex justify-center items-center gap-2'>
                    <ArrowLeft color='#2d9f9f' size={20} /> <span>Back to Home</span>
                </Link>

                <div className='flex gap-2'>
                    <p>Already have an acount? </p>
                    <Link to="/signin" className='text-primary'>
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register