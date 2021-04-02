import { Link } from 'react-router-dom';

import '../style/InvalidPage.css';

const InvalidPage = () => {
    return (
        <>
            <main>
                <h1 className="invalid-heading">404 😢</h1>
                <span className="description">
                    <b>bummer!</b> the page you are looking for could not be found.
                </span>
                <br />
                <div>
                    <Link to="/">
                        <button>home / repos 🎉</button>
                    </Link>
                    <Link to="/new">
                        <button>submit a repo 🔥</button>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default InvalidPage;
