import React from 'react';

export class SelectType extends React.Component{
  state = {
    type: 'All'
  }

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value })

    await this.props.selectType(event.target.value)
  }

  render () {
    return (
      <div className='row'>
        <label>
          <input name="type" value='All' type="radio" checked={this.state.type === 'All'} onChange={this.handleChange} />
          <span>All</span>
        </label>
        <label>
          <input name="type" value='Movie' type="radio" checked={this.state.type === 'Movie'} onChange={this.handleChange} />
          <span>Movie</span>
        </label>
        <label>
          <input name="type" value='Series' type="radio" checked={this.state.type === 'Series'} onChange={this.handleChange} />
          <span>Series</span>
        </label>
      </div>
    )
  }
}