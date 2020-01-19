import React, { Component } from 'react';
import './styles.css';

class Search extends Component {

    constructor(props) {

        super(props);

        this.onValueChange = this.onValueChange.bind(this);

        this.state = {
            searchText: ''
        }
    }

    onValueChange(event) {
        
        const value = event.target.value;

        this.setState({
            searchText: value
        });

        this.props.searchText(value);
    };

    render() {
        return (
            <form id="frmSearch">
                <div className="input-group">
                    <div className="input-block">

                        <input
                            type="text"
                            name="search_text"
                            id="search_text"
                            placeholder="Buscar algo..."
                            required
                            value={this.state.searchText}
                            onChange={this.onValueChange} />

                    </div>
                </div>
            </form>
        );
    }
}

export default Search;