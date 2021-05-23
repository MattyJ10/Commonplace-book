import React from 'react'; 
import './multiSelectDropdown.css';

export default class MultiSelectDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      filteredList: props.values,
      filterValue: "",
      selectedValues: [],
    }
  }

  showList = () => {
    this.setState({ showList: true })
  }

  hideList = () => {
    const { values } = this.props;
    this.setState({ filterValue: "" , showList: false, filteredList: values})
  }

  filterList = (event) => {
    const { values, displayField } = this.props;
    let newVal = event.target.value.toLowerCase();
    if (newVal.length == 0) {
      return this.setState({ filteredList: values, filterValue: "" })
    } else {
      let newList = values.filter((val) => {
        return val[displayField].toLowerCase().startsWith(newVal); 
      })
      this.setState({ filteredList: newList, filterValue: newVal })
    }
  }

  onSelectFromList = (value) => {
    const { emitChange } = this.props; 
    const { selectedValues } = this.state; 
    let newList = [...selectedValues, value];
    emitChange(newList); 
    this.setState({ filterValue: "", showList: false, selectedValues: newList })
  }

  onDeleteFromSelected = (index) => {
    const { selectedValues } = this.state; 
    const { emitChange } = this.props;
    let newList = [...selectedValues];
    newList.splice(index, 1);
    emitChange(newList); 
    this.setState({selectedValues: newList});
  }

  render() {
    const { showList, filteredList, filterValue, selectedValues } = this.state; 
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
        <div>
          {selectedValues && selectedValues.map((value, index) => {
            return (
              <p key={index}>{value[displayField]}<button onClick={() => this.onDeleteFromSelected(index)}>Delete</button></p>
            )
          })}
        </div>
      </div>
    )
  }

}