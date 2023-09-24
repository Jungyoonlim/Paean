import './styles.scss'
import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className = 'container'>
                <div className = 'row align-items-center'>
                    <div className = 'col-lg-6'>
                        <div className = 'footer-text-p'>
                            Paean{' '}
                            <span>
                                / The Spaced Repetition Learning Platform for Medics. 
                            </span>
                        </div>
                    </div>
                    <div className='col-lg-6 footer-text-p text-right'>
                        <span>Copyright©2023. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
