import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
  
  let users = []
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : users.filter(user =>
        
          user.toLowerCase().slice(0, inputLength) === inputValue
      );
  };

  const renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );
  
  export default class SearchBar extends Component {
      constructor(props) {
          super(props);
          this.state = {
              value: '',
              suggestions: []
            };
            this.onChange = this.onChange.bind(this);
            this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
            this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
            this.getSuggestionValue = this.getSuggestionValue.bind(this);
        }
         
        onChange(event, { newValue }){
         this.setState({
           value: newValue
         });
       };

        onSuggestionsFetchRequested({ value }){
            this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested () {
      this.setState({
        suggestions: []
      });
    };

   getSuggestionValue(suggestion){ 
      this.props.chosenProfile(suggestion)
      return suggestion
    };
    render() {
      users = this.props.usersToSearch
      const { value, suggestions } = this.state;
  
      const inputProps = {
        placeholder: 'Search GitHub user',
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      );
    }
  }