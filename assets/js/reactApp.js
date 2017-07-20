// const React =  require("react");
// const ReactDOM =  require("react-dom");
import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class FilteredList extends React.Component {

  constructor() {
    super();
    this.state = {
      kits : []
    }
  }

  async componentWillMount(){
    let res = await axios.get('/api')
    this.setState(
       {kits : res.data,
        allKits : res.data}
    )
  }

  filterList(event){
    let kits = this.state.allKits;
    let updatedList = kits.filter(function(kit){
      // console.log(typeof event.target.value)
      // console.log(typeof kit.keywords)
      if (kit.keywords.search(event.target.value.toLowerCase()) !== -1){
        return kit
      }
    });
    this.setState({kits: updatedList});
  }

  render(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList.bind(this)}/>
        </fieldset>
        </form>
      <List kits={this.state.kits}/>
      </div>
    );
  }

}

class List extends React.Component {
  render(){
    return (
      <ul className="list-group">
      {
        this.props.kits.map(function(kit) {
          return <li className="list-group-item" data-category={kit.title} key={kit.link}>{kit.title}</li>
        })
       }
      </ul>
    )
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<FilteredList/>, document.getElementById('app'));
}
