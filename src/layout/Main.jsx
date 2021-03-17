import React from "react";
import needle from "needle";

import {
    Search,
    Movies,
    Preloader,
    SelectType,
} from "../components"

import {
    moviesDB
} from '../config';

const API_KEY = process.env.REACT_APP_API_KEY

class MoviesApi {
    constructor({search, type}) {
        this.url = new URL(moviesDB.URL);
        this.url.searchParams.append('apikey', API_KEY);
        if (type && type !== 'All') this.url.searchParams.append("type", type);
        if (search) this.url.searchParams.append("s", search);
    }
}


class Main extends React.Component {
    state = {
        movies: [],
        search: "matrix",
        loading: true,
    }

    getMovies = async () => {
        const moviesApi = new MoviesApi({type: this.state.type, search: this.state.search})

        const res = await needle('get', moviesApi.url.href)
        const {body: {Search}} = res;

        console.log(res)
        return Search || []
    }

    showMovies = async (title) => {

        if (title && title !== this.state.search) this.state.search = title;

        const movies = await this.getMovies()

        this.setState({movies})
    }

    async componentDidMount() {

        await this.showMovies();
        this.setState({loading: false})
            .catch((err) => {
                console.log(err)
            })
    }

    updMovies = async (title) => {
        await this.showMovies(title);
    }

    selectType = async (type) => {
        await this.setState({type})

        this.showMovies();
    }


    render() {
        const {movies, loading} = this.state;

        return (
            <main className="container content">
                <Search updMovies={this.updMovies}/>
                <SelectType selectType={this.selectType}/>
                {
                    loading ?
                        <Preloader/> :
                        <Movies movies={movies}/>
                }
            </main>
        );
    }
}


export {Main}

