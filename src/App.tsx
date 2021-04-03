import { Route, Switch } from 'react-router-dom';
import { FC } from 'react';

import Home from './pages/Home';
import New from './pages/New';
import InvalidPage from './components/InvalidPage';
import Project from './components/Project';
import User from './components/User';
import WOC from './pages/WOS';
import Me from './pages/Me';
import Settings from './pages/Settings';
import './style/App.css';
import { Layout } from './components/Layout';

const App: FC = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/new" component={New} />
                <Route exact path="/open-sourcers" component={WOC} />
                <Route exact path={`/r/:owner/:name`} component={Project} />
                <Route exact path={`/me`} component={Me} />
                <Route exact path={`/settings`} component={Settings} />
                <Route exact path={`/u/:username`} component={User} />
                <Route path="*" component={InvalidPage} />
            </Switch>
        </Layout>
    );
};

export default App;
