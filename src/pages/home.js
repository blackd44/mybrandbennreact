const Home = () => {
    return (
        <>
            <div className="back"></div>
            <main className="index">
                <p style={{ margin: '1rem 0' }}>HELLO</p>
                <h1>
                    I’m <b>Benn Dalton IRADUKUNDA</b><br />
                    a <b>Software Developer</b>
                </h1>
                <p style={{ color: 'var(--grey-color)', margin: '2rem 0' }}>
                    I’m a software developer! I can help you build a product, feature or website Look through some of my work
                    and experience! If you like what you see and have a project you need coded, don’t hestiate to contact me.
                    I’m a software developer! I can help you build a product, feature or website Look through some of my work
                </p>
                <div>
                    <button className="button but1">Hire Me</button>
                    <button className="button but2" onClick={() => window.location.assign('/portfolio.html')}>Portfolia</button>
                </div>
            </main>
        </>
    );
}

export default Home;