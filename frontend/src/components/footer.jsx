import { FaFacebook, FaGoogle, FaYoutube } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted mt-5">

            <div className="text-center p-4 bg-dark text-white" >
                © ITI 2024 Copyright:
                <span className="fw-bold"> Fady Malak, Mahmoud Alm, Omar Khaled</span>
            </div>

            <section className="d-flex justify-content-center justify-content-between p-4 border-top">
                <div className="me-5">
                    <span>let's get connected on social networks:</span>
                </div>
                <div>
                    <a href="" className="me-4 text-reset">
                        <FaFacebook className="fs-4" />
                    </a>
                    <a target="_blank" className="me-4 text-reset">
                        <FaGoogle className="fs-4" />
                    </a>
                    <a target="_blank" className="me-4 text-reset">
                        <FaYoutube className="fs-4" />
                    </a>
                </div>
            </section>
        </footer>
    )
}
