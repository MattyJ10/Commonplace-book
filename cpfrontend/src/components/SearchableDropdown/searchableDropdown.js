import React from 'react'; 
import './searchableDropdown.css';

export default class SearchableDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      filteredList: props.values,
      filterValue: props.initialValue || "",
      selectedValue: undefined,
    }
  }

  showList = () => {
    this.setState({ showList: true })
  }

  hideList = () => {
    const { selectedValue } = this.state; 
    const { displayField, values } = this.props;
    if (selectedValue) {
      this.setState({ filterValue: selectedValue[displayField], showList: false })
    } else {
      this.setState({ filterValue: "" , showList: false, filteredList: values})
    }
  }

  filterList = (event) => {
    const { values, emitDelete, displayField } = this.props;
    let newVal = event.target.value.toLowerCase();
    if (newVal.length == 0) {
      emitDelete();
      return this.setState({ selectedValue: undefined, filteredList: values, filterValue: "" })
    } else {
      let newList = values.filter((val) => {
        return val[displayField].toLowerCase().startsWith(newVal); 
      })
      this.setState({ filteredList: newList, filterValue: newVal })
    }
  }

  onSelectFromList = (value) => {
    const { emitChange, displayField } = this.props; 
    emitChange(value); 
    this.setState({ filterValue: value[displayField], showList: false, selectedValue: value })
  }

  render() {
    const { showList, filteredList, filterValue } = this.state; 
    const { displayField } = this.props; 
    return (
      <div className="searchable-dropdown-container">
        <input 
          onFocus={this.showList} 
          onChange={this.filterList}
          onBlur={this.hideList}
          value={filterValue}
          className="searchable-dropdown-input"
        ></input>
        {showList && filteredList && filteredList.length > 0 && (
          <div className="searchable-dropdown-list-container">
            <div className="searchable-dropdown-list">
              {filteredList && filteredList.map((value) => {
                return (
                  <div 
                    className="searchable-dropdown-item" 
                    key={value._id}
                    onMouseDown={() => this.onSelectFromList(value)}
                  >
                    {value[displayField]}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

}