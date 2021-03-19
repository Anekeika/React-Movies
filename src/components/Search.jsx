import React from 'react';

export class Search extends React.Component {
    state = {
        search: "",
    }


    handleKey = (event) => {
        if (event.key === "Enter") {
            this.props.updMovies(this.state.search);
        }
    }

    searchBarStyle = {
        marginBottom: 0
    }

    render() {
        return (
            <div className="row" style={this.searchBarStyle}>
                    <div className="input-field col s12">
                        <input
                            placeholder="Search"
                            type="search"
                            className="validate"
                            value={this.state.search}
                            onChange={(event) => this.setState({search: event.target.value})}
                            onKeyDown={this.handleKey}
                        />
                    <button
                        className="btn search-btn"
                        onClick={() =>
                            this.props.updMovies(this.state.search)
                        }
                    >
                        Search
                    </button>
                </div>

            </div>
        );
    }
}
