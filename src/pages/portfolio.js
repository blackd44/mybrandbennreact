import { Link } from "react-router-dom";

const Portfolio = () => {
    return (
        <>
            <main>
                <section className="first portfolio">
                    <div className="head1">
                        <span>My </span>
                        <h1>Works</h1>
                    </div>
                    <section>
                        <p style={{ margin: '2rem 0 0' }}>
                            <Link to="/images/Resume-IRADUKUNDA-Benn-Dalton-1.jpg" target="_blank"><b>View a resume</b></Link>
                        </p>
                        <article>
                            <h1>Work title</h1>
                            <p>work in <em>company name</em></p>
                            <p className="date">mm dd, yyyy - present</p>
                            <div>
                                A regular record of your thoughts, opinions, or experiences that you put on the internet for
                                other people to read, a regular record of your thoughts, opinions, or experiences that you put
                                on the internet for other people to read, a regular record of your thoughts, opinions, or
                                experiences that you put on the internet for other people to read, a regular record of your
                                thoughts, opinions, or experiences that you put on the internet for other people to read.
                            </div>
                        </article>
                        <article>
                            <h1>Work title</h1>
                            <p className="date">mm dd, yyyy - present</p>
                            <div>
                                A regular record of your thoughts, opinions, or experiences that you put on the internet for
                                other people to read, a regular record of your thoughts, opinions, or experiences that you put
                                on the internet for other people to read, a regular record of your thoughts, opinions, or
                                experiences that you put on the internet for other people to read, a regular record of your
                                thoughts, opinions, or experiences that you put on the internet for other people to read.
                            </div>
                        </article>
                        <article>
                            <h1>Work title</h1>
                            <p>work in <em>company name</em></p>
                            <p className="date">mm dd, yyyy - present</p>
                            <div>
                                A regular record of your thoughts, opinions, or experiences that you put on the internet for
                                other people to read, a regular record of your thoughts, opinions, or experiences that you put
                                on the internet for other people to read, a regular record of your thoughts, opinions, or
                                experiences that you put on the internet for other people to read, a regular record of your
                                thoughts, opinions, or experiences that you put on the internet for other people to read.
                            </div>
                        </article>
                    </section>
                </section>
            </main>
        </>
    );
}

export default Portfolio;