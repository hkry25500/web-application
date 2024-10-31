'use client'

import { ChangeEvent, useState } from "react";
import '../styles.scss'
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SigninPage()
{
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [rememberMe, setRememberMe] = useState<boolean>(true);

    const router = useRouter();

    const handleSignup = () =>
    {
        axios.post('/api/users', { email, username, password })
            .then(res => {
                if ((res.data as any).success)
                {
                    router.replace('/home');
                }
            })
    }

    return (
        <div id='login-page' className={`bg-[url('https://singh-cp.github.io/netflix-landingpage/images/netflix-background-image.jpg')]`}>
            <div className="login-container">

                <div className="login-form">
                    <div className="login-form-inner">
                        <div className="logo">
                            <svg
                            height={512}
                            viewBox="0 0 192 192"
                            width={512}
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
                            </svg>
                        </div>

                        <h1>Sign up</h1>
                        <p className="body-text">See your growth and get consulting support!</p>
                        

                        <div className="login-form-group mt-10">
                            <label htmlFor="email">
                                Email <span className="required-star">*</span>
                            </label>
                            <input type="text" placeholder="email@website.com" id="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="email">
                                Username <span className="required-star">*</span>
                            </label>
                            <input type="text" placeholder="Your username" id="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="pwd">
                                Password <span className="required-star">*</span>
                            </label>
                            <input
                            autoComplete="off"
                            type="text"
                            placeholder="Minimum 8 characters"
                            id="pwd"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-form-group single-row">
                            <div className="custom-check">
                                <input
                                    autoComplete="off"
                                    type="checkbox"
                                    defaultChecked={rememberMe}
                                    id="remember"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="link forgot-link flex items-center">
                                Forgot Password ?
                            </a>
                        </div>
                        <a role='button' className="rounded-button login-cta cursor-pointer" onClick={handleSignup}>
                            Register
                        </a>
                        <div className="register-div">
                            Already have one?{" "}
                            <a href="/auth/signin" className="link create-account">
                                Go to Sign in !
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}