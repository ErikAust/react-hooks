import React, {useContext, useEffect, Fragment} from "react";
import {Link} from "react-router-dom";
import {GithubContext} from "../context/github/githubContext";
import {Repos} from "../components/Repos";

export const Profile = ({match}) => {

    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext);

    useEffect(() => {
        getUser(match.params.name);
        getRepos(match.params.name);
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <p className="text-center">Loading</p>
    }

    const {
        name, company, avatar_url, location, bio, blog, following,
        login, html_url, followers, public_repos, public_gists
    } = user;

    return (
        <Fragment>
            <Link to='/' className='btn btn-link'>To Home</Link>
            <div className="card mp-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img src={avatar_url} alt={name}
                                 style={{width: '150px'}}/>
                            <h1>{name}</h1>
                            {location ? <p>Location: {location}</p> : null}
                        </div>
                        <div className="col">
                            {bio ? <Fragment>
                                <h3>BIO</h3>
                                <p>{bio}</p>
                            </Fragment> : null}
                            <a href={html_url} target='_black' className='btn btn-dark m-3'>Open profile</a>
                            <ul>
                                { login && <li>
                                        <strong>Username: </strong>{login}
                                    </li>}
                                { company && <li>
                                    <strong>Company: </strong>{company}
                                </li>}
                                { blog && <li>
                                    <strong>Blog: </strong>{blog}
                                </li>}
                            </ul>

                            <div className="btn btn-primary m-1">Followers: {followers}</div>
                            <div className="btn btn-success m-1">Following: {following}</div>
                            <div className="btn btn-info m-1">Repositories: {public_repos}</div>
                            <div className="btn btn-dark m-1">Gists: {public_gists}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )
}